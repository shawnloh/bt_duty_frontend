import React, { useState } from 'react';
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
  FormText
} from 'reactstrap';
import moment from 'moment-timezone';

const checkDateValid = date => {
  return moment(date, 'DDMMYY', true).isValid();
};

const AddBlockout = ({ handleAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState('');

  const toggle = () => {
    setIsOpen(!isOpen);
    setDate('');
  };
  const changeDate = e => setDate(e.target.value);

  const submit = e => {
    if (e) e.preventDefault();
    handleAdd(date);
    toggle();
  };

  const checkDisabled = () => {
    return !checkDateValid(date);
  };

  return (
    <>
      <Row className="flex-column justify-content-end align-items-end my-2 mx-2">
        <Button className="my-2" color="primary" onClick={toggle}>
          Add Blockout
        </Button>
        <Collapse isOpen={isOpen} className="w-100">
          <Card>
            <CardBody>
              <Form onSubmit={submit}>
                <FormGroup>
                  <Label for="dateInput">Date</Label>
                  <Input
                    type="text"
                    value={date}
                    name="date"
                    id="dateInput"
                    invalid={!checkDateValid(date)}
                    onChange={changeDate}
                  />
                  <FormText color="muted">
                    Dates must be in DDMMYY format, it will be automatically be
                    converted to DD-MM-YYYY
                  </FormText>
                </FormGroup>
                <Button
                  color="success"
                  className="w-100"
                  onClick={submit}
                  disabled={checkDisabled()}
                >
                  Add
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
  handleAdd: PropTypes.func.isRequired
};

export default AddBlockout;
