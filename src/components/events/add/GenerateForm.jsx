import React, { useState, useCallback } from 'react';
import {
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Spinner,
  FormFeedback
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { List } from 'immutable';

import EventsService from '../../../services/events';

const checkDateValid = date => {
  return moment(date, 'DDMMYY', true).isValid();
};

const validate = values => {
  const errors = {};
  if (values.pioneers === 0 && values.wspecs === 0) {
    errors.pioneers = 'Must contained at least 1 in pioneers or specs';
    errors.wspecs = 'Must contained at least 1 in pioneers or specs';
  }

  return errors;
};

const GenerationFormSchema = Yup.object().shape({
  ranks: Yup.array()
    .min(1, 'Require at least 1 rank select')
    .required('required'),
  platoons: Yup.array()
    .min(1, 'Require at least 1 platoon select')
    .required('required'),
  pioneers: Yup.number(),
  wspecs: Yup.number()
});

const GenerateForm = ({
  ranks,
  platoons,
  statuses,
  pointSystem,
  date,
  setSelectedPersonnels
}) => {
  const [modal, setModal] = useState(false);
  const toggle = useCallback(() => {
    if (date === '') {
      return Swal.fire({
        title: 'Assign Date First',
        text: 'Please assign a date first before using generate personnels',
        confirmButtonText: 'Okay!'
      });
    }

    if (!checkDateValid(date)) {
      return Swal.fire({
        title: 'Invalid Date Format',
        text: 'Please make sure that your date is DDMMYY format',
        confirmButtonText: 'Okay!'
      });
    }

    return setModal(!modal);
  }, [date, modal]);

  const [prevExcludeStatuses, setPrevExcludeStatuses] = useState([]);

  const [errors, setErrors] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormSubmission = useCallback(
    async values => {
      setIsGenerating(true);
      const {
        ranks: selectedRanks,
        platoons: selectedPlatoons,
        onlyStatus,
        statusNotAllowed,
        pioneers,
        wspecs
      } = values;

      const data = {
        pointSystemId: pointSystem,
        date: moment(date, 'DDMMYY', true).format('DD-MM-YYYY'),
        ranks: selectedRanks,
        platoons: selectedPlatoons
      };

      if (onlyStatus && statusNotAllowed.length === 0) {
        data.onlyStatus = true;
      } else if (statusNotAllowed.length > 0 && !onlyStatus) {
        data.statusNotAllowed = statusNotAllowed;
      }

      if (pioneers > 0) {
        data.pioneers = pioneers;
      }
      if (wspecs > 0) {
        data.wspecs = wspecs;
      }

      try {
        const response = await EventsService.generateName(data);
        if (response.ok) {
          const personnels = response.data.map(person => person._id);
          setSelectedPersonnels(personnels);
          toggle();
        } else if (response.status === 401) {
          setErrors(['Unauthenticated, please refresh the page or logout']);
        } else {
          let responseErrors = [];
          if (response.data.message) {
            responseErrors.push(response.data.message);
          }

          if (response.data.errors) {
            responseErrors = errors.concat(response.data.errors);
          }
          setErrors(responseErrors);
        }
      } catch (error) {
        setErrors([error.message || 'Unable to generate names']);
      }
      setIsGenerating(false);
    },
    [date, errors, pointSystem, setSelectedPersonnels, toggle]
  );

  const formik = useFormik({
    initialValues: {
      ranks: [],
      platoons: [],
      onlyStatus: false,
      statusNotAllowed: [],
      pioneers: 1,
      wspecs: 0
    },
    validationSchema: GenerationFormSchema,
    validate,
    onSubmit: handleFormSubmission
  });

  const handleExcludeStatus = e => {
    if (e.target.checked) {
      // setPrevExcludeStatuses(excludeStatus);
      setPrevExcludeStatuses(formik.values.statusNotAllowed);
      formik.setFieldValue(
        'statusNotAllowed',
        statuses.map(status => status.get('_id')).toArray()
      );
      if (formik.values.onlyStatus) formik.setFieldValue('onlyStatus', false);
    } else {
      formik.setFieldValue('statusNotAllowed', prevExcludeStatuses);
      setPrevExcludeStatuses([]);
    }
  };

  const handleStatusesOnly = e => {
    if (e.target.checked) {
      setPrevExcludeStatuses(formik.values.statusNotAllowed);
      formik.setFieldValue('statusNotAllowed', []);
      formik.setFieldValue('onlyStatus', true);
    } else {
      formik.setFieldValue('statusNotAllowed', prevExcludeStatuses);
      formik.setFieldValue('onlyStatus', false);
      setPrevExcludeStatuses([]);
    }
  };

  const handleSelectAllRanks = e => {
    if (e.target.checked) {
      formik.setFieldValue(
        'ranks',
        ranks.map(rank => rank.get('_id')).toArray()
      );
    } else {
      formik.setFieldValue('ranks', []);
    }
  };

  const handleSelectAllPlatoons = e => {
    if (e.target.checked) {
      formik.setFieldValue(
        'platoons',
        platoons.map(platoon => platoon.get('_id')).toArray()
      );
    } else {
      formik.setFieldValue('platoons', []);
    }
  };

  let footer = null;
  if (isGenerating) {
    footer = <Spinner color="primary" />;
  } else {
    footer = (
      <>
        <Button
          color="success"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          Generate
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </>
    );
  }
  return (
    <Row className="my-2">
      <Col>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Generate</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="PioneersQty">Pioneers Qty</Label>
                  <Input
                    type="number"
                    name="pioneers"
                    id="PioneersQty"
                    value={formik.values.pioneers}
                    onChange={formik.handleChange}
                    invalid={
                      formik.touched.pioneers &&
                      formik.errors.pioneers &&
                      formik.errors.pioneers !== ''
                    }
                    disabled={formik.isSubmitting}
                  />
                  {formik.touched.pioneers && formik.errors.pioneers ? (
                    <FormFeedback>{formik.errors.pioneers}</FormFeedback>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Label for="WSQty">WSpec Qty</Label>
                  <Input
                    type="number"
                    name="wspecs"
                    id="WSQty"
                    value={formik.values.wspecs}
                    onChange={formik.handleChange}
                    invalid={
                      formik.touched.wspecs &&
                      formik.errors.wspecs &&
                      formik.errors.wspecs !== ''
                    }
                    disabled={formik.isSubmitting}
                  />
                  {formik.touched.wspecs && formik.errors.wspecs ? (
                    <FormFeedback>{formik.errors.wspecs}</FormFeedback>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Label for="selectPlatoons">Platoons</Label>
                  <Input
                    type="select"
                    name="platoons"
                    id="selectPlatoons"
                    multiple
                    value={formik.values.platoons}
                    onChange={formik.handleChange}
                    invalid={
                      formik.touched.platoons &&
                      formik.errors.platoons &&
                      formik.errors.platoons !== ''
                    }
                    disabled={formik.isSubmitting}
                  >
                    {platoons.map(platoon => {
                      return (
                        <option
                          value={platoon.get('_id')}
                          key={platoon.get('_id')}
                        >
                          {platoon.get('name')}
                        </option>
                      );
                    })}
                  </Input>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={handleSelectAllPlatoons}
                        disabled={formik.isSubmitting}
                        checked={
                          formik.values.platoons.length === platoons.size
                        }
                      />{' '}
                      All Platoons
                    </Label>
                  </FormGroup>
                  {formik.touched.platoons && formik.errors.platoons ? (
                    <FormFeedback>{formik.errors.platoons}</FormFeedback>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Label for="selectRanks">Ranks</Label>
                  <Input
                    type="select"
                    name="ranks"
                    id="selectRanks"
                    multiple
                    value={formik.values.ranks}
                    onChange={formik.handleChange}
                    invalid={
                      formik.touched.ranks &&
                      formik.errors.ranks &&
                      formik.errors.ranks !== ''
                    }
                    disabled={formik.isSubmitting}
                  >
                    {ranks.map(rank => {
                      return (
                        <option value={rank.get('_id')} key={rank.get('_id')}>
                          {rank.get('name')}
                        </option>
                      );
                    })}
                  </Input>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={handleSelectAllRanks}
                        disabled={formik.isSubmitting}
                        checked={formik.values.ranks.length === ranks.size}
                      />{' '}
                      All Ranks
                    </Label>
                  </FormGroup>
                  {formik.touched.ranks && formik.errors.ranks ? (
                    <FormFeedback>{formik.errors.ranks}</FormFeedback>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <Label for="selectStatuses">Statuses not allowed</Label>
                  <Input
                    type="select"
                    name="statusNotAllowed"
                    id="selectStatuses"
                    multiple
                    value={formik.values.statusNotAllowed}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                  >
                    {statuses.map(status => {
                      return (
                        <option
                          value={status.get('_id')}
                          key={status.get('_id')}
                        >
                          {status.get('name')}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={handleExcludeStatus}
                      disabled={formik.isSubmitting}
                      checked={
                        formik.values.statusNotAllowed.length === statuses.size
                      }
                    />{' '}
                    Exclude All Status
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="onlyStatus"
                      disabled={formik.isSubmitting}
                      onChange={handleStatusesOnly}
                      checked={formik.values.onlyStatus}
                    />{' '}
                    Statuses Only
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            {errors.length > 0 && (
              <Row>
                <Col>
                  {errors.map(error => {
                    return (
                      <p className="text-danger" key={error}>
                        {error}
                      </p>
                    );
                  })}
                </Col>
              </Row>
            )}
          </ModalBody>
          <ModalFooter>{footer}</ModalFooter>
        </Modal>
        <Button color="primary" onClick={toggle}>
          Generate Personnels
        </Button>
      </Col>
    </Row>
  );
};

GenerateForm.propTypes = {
  ranks: PropTypes.oneOfType([PropTypes.instanceOf(List)]).isRequired,
  platoons: PropTypes.oneOfType([PropTypes.instanceOf(List)]).isRequired,
  statuses: PropTypes.oneOfType([PropTypes.instanceOf(List)]).isRequired,
  setSelectedPersonnels: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  pointSystem: PropTypes.string.isRequired
};

export default GenerateForm;
