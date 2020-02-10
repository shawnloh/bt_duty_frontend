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
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(open => !open);
  };

  const formik = useFormik({
    initialValues: {
      startDate: '',
      endDate: ''
    },
    validate
  });

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

  const handleAddBlockout = useCallback(() => {
    formik.validateForm().then(() => {
      handleAdd(formik.values);
      toggle();
    });
  }, [formik, handleAdd]);

  const handleRemoveBlockout = useCallback(() => {
    formik.validateForm().then(() => {
      handleDelete(formik.values);
      toggle();
    });
  }, [formik, handleDelete]);

  const handleOnSubmit = useCallback(e => {
    e.preventDefault();
  }, []);

  return (
    <>
      <Row className="flex-column justify-content-end align-items-end my-2 mx-2">
        <Button className="my-2" color="primary" onClick={toggle}>
          Actions
        </Button>
        <Collapse isOpen={isOpen} className="w-100">
          <Card>
            <CardBody>
              <Form onSubmit={handleOnSubmit}>
                <FormGroup>
                  <Label for="dateInput">Date</Label>
                  <Input
                    type="text"
                    value={formik.values.startDate}
                    name="startDate"
                    id="dateInput"
                    placeholder={`e.g. ${today}`}
                    invalid={
                      formik.touched.startDate &&
                      formik.errors.startDate &&
                      formik.errors.startDate !== ''
                    }
                    onChange={formik.handleChange}
                  />
                  <FormText color="muted">
                    Date must be in DDMMYY format
                  </FormText>
                  {formik.touched.startDate && formik.errors.startDate ? (
                    <FormFeedback>{formik.errors.startDate}</FormFeedback>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <Label for="untilDateInput">Until</Label>
                  <Input
                    type="text"
                    value={formik.values.endDate}
                    name="endDate"
                    id="untilDateInput"
                    placeholder={`*OPTIONAL* e.g. ${tomorrow}`}
                    invalid={
                      formik.touched.endDate &&
                      formik.errors.endDate &&
                      formik.errors.endDate !== ''
                    }
                    onChange={formik.handleChange}
                  />
                  <FormText color="muted">
                    This is optional, you can leave this blank if you want to
                    add/remove a single date
                  </FormText>
                  {formik.touched.endDate && formik.errors.endDate ? (
                    <FormFeedback>{formik.errors.endDate}</FormFeedback>
                  ) : null}
                </FormGroup>
                <Button
                  color="success"
                  className="w-100"
                  onClick={handleAddBlockout}
                >
                  Add
                </Button>
                <Button
                  color="danger"
                  className="mt-1 w-100"
                  onClick={handleRemoveBlockout}
                >
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
