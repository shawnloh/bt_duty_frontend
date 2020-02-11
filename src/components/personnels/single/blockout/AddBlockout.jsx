import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Button,
  Collapse,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from 'reactstrap';
import moment from 'moment-timezone';
import { useFormik } from 'formik';

const validate = values => {
  const errors = {};
  if (!values.startDate) {
    errors.startDate = 'Date is required';
  } else if (!moment(values.startDate, 'DDMMYY', true).isValid()) {
    errors.startDate = 'Date is not in a valid format';
  }

  if (values.endDate) {
    const endDate = moment(values.endDate, 'DDMMYY', true);
    if (!endDate.isValid()) {
      errors.endDate = 'Until date is not valid format';
    } else if (
      endDate.isSameOrBefore(moment(values.startDate, 'DDMMYY', true))
    ) {
      errors.endDate = 'Until date must be after starting date';
    }
  }
  return errors;
};

const AddBlockout = ({ handleAdd, handleDelete }) => {
  const [isAddBlockoutOpen, setIsAddBlockoutOpen] = useState(false);
  const [isDeleteBlockoutOpen, setIsDeleteBlockoutOpen] = useState(false);
  const today = useMemo(
    () =>
      moment()
        .tz('Asia/Singapore')
        .format('DDMMYY'),
    []
  );

  const tomorrow = useMemo(
    () =>
      moment()
        .tz('Asia/Singapore')
        .add(1, 'd')
        .format('DDMMYY'),
    []
  );
  const toggleAdd = useCallback(() => {
    setIsAddBlockoutOpen(open => !open);
    if (isDeleteBlockoutOpen) setIsDeleteBlockoutOpen(false);
  }, [isDeleteBlockoutOpen]);

  const toggleDelete = useCallback(() => {
    setIsDeleteBlockoutOpen(open => !open);
    if (isAddBlockoutOpen) setIsAddBlockoutOpen(false);
  }, [isAddBlockoutOpen]);

  const addBlockoutFormik = useFormik({
    initialValues: {
      startDate: '',
      endDate: ''
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      handleAdd(values);
      toggleAdd();
      resetForm();
    }
  });
  const deleteBlockoutFormik = useFormik({
    initialValues: {
      startDate: '',
      endDate: ''
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      handleDelete(values);
      toggleDelete();
      resetForm();
    }
  });

  return (
    <>
      <Row className="justify-content-end align-items-end my-2 mx-2">
        <Button className="m-2" color="primary" onClick={toggleAdd}>
          Add Blockout
        </Button>
        <Button className="m-2" color="primary" onClick={toggleDelete}>
          Delete Blockout
        </Button>
      </Row>
      <Row>
        <Collapse isOpen={isAddBlockoutOpen} className="w-100">
          <Card>
            <CardBody>
              <Form onSubmit={addBlockoutFormik.handleSubmit}>
                <FormGroup>
                  <Label for="addDateInput">Date</Label>
                  <Input
                    type="text"
                    value={addBlockoutFormik.values.startDate}
                    name="startDate"
                    id="addDateInput"
                    placeholder={`e.g. ${today}`}
                    invalid={
                      addBlockoutFormik.touched.startDate &&
                      addBlockoutFormik.errors.startDate &&
                      addBlockoutFormik.errors.startDate !== ''
                    }
                    onChange={addBlockoutFormik.handleChange}
                  />
                  <FormText color="muted">
                    Date must be in DDMMYY format
                  </FormText>
                  {addBlockoutFormik.touched.startDate &&
                  addBlockoutFormik.errors.startDate ? (
                    <FormFeedback>
                      {addBlockoutFormik.errors.startDate}
                    </FormFeedback>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <Label for="addUntilDateInput">Until</Label>
                  <Input
                    type="text"
                    value={addBlockoutFormik.values.endDate}
                    name="endDate"
                    id="addUntilDateInput"
                    placeholder={`*OPTIONAL* e.g. ${tomorrow}`}
                    invalid={
                      addBlockoutFormik.touched.endDate &&
                      addBlockoutFormik.errors.endDate &&
                      addBlockoutFormik.errors.endDate !== ''
                    }
                    onChange={addBlockoutFormik.handleChange}
                  />
                  <FormText color="muted">
                    This is optional, you can leave this blank if you want to
                    add a single date
                  </FormText>
                  {addBlockoutFormik.touched.endDate &&
                  addBlockoutFormik.errors.endDate ? (
                    <FormFeedback>
                      {addBlockoutFormik.errors.endDate}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
                <Button color="success" className="w-100" type="submit">
                  Add
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Collapse>

        <Collapse isOpen={isDeleteBlockoutOpen} className="w-100">
          <Card>
            <CardBody>
              <Form onSubmit={deleteBlockoutFormik.handleSubmit}>
                <FormGroup>
                  <Label for="deleteDateInput">Date</Label>
                  <Input
                    type="text"
                    value={deleteBlockoutFormik.values.startDate}
                    name="startDate"
                    id="deleteDateInput"
                    placeholder={`e.g. ${today}`}
                    invalid={
                      deleteBlockoutFormik.touched.startDate &&
                      deleteBlockoutFormik.errors.startDate &&
                      deleteBlockoutFormik.errors.startDate !== ''
                    }
                    onChange={deleteBlockoutFormik.handleChange}
                  />
                  <FormText color="muted">
                    Date must be in DDMMYY format
                  </FormText>
                  {deleteBlockoutFormik.touched.startDate &&
                  deleteBlockoutFormik.errors.startDate ? (
                    <FormFeedback>
                      {deleteBlockoutFormik.errors.startDate}
                    </FormFeedback>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <Label for="deleteUntilDateInput">Until</Label>
                  <Input
                    type="text"
                    value={deleteBlockoutFormik.values.endDate}
                    name="endDate"
                    id="deleteUntilDateInput"
                    placeholder={`*OPTIONAL* e.g. ${tomorrow}`}
                    invalid={
                      deleteBlockoutFormik.touched.endDate &&
                      deleteBlockoutFormik.errors.endDate &&
                      deleteBlockoutFormik.errors.endDate !== ''
                    }
                    onChange={deleteBlockoutFormik.handleChange}
                  />
                  <FormText color="muted">
                    This is optional, you can leave this blank if you want to
                    remove a single date
                  </FormText>
                  {deleteBlockoutFormik.touched.endDate &&
                  deleteBlockoutFormik.errors.endDate ? (
                    <FormFeedback>
                      {deleteBlockoutFormik.errors.endDate}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
                <Button color="danger" className="w-100" type="submit">
                  Remove
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Collapse>
      </Row>
    </>
  );
};

AddBlockout.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default AddBlockout;
