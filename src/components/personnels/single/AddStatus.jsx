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
  return (
    moment(date, 'DDMMYY', true).isValid() ||
    date === 'PERMANENT' ||
    date === 'permanent'
  );
};

const AddStatus = ({ handleAdd, statuses, statusIds }) => {
  const today = moment()
    .tz('Asia/Singapore')
    .format('DDMMYY');

  const [isOpen, setIsOpen] = useState(false);

  const [status, setStatus] = useState(statusIds[0] || '');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const toggle = () => {
    setIsOpen(!isOpen);
    setStatus(statusIds[0] || '');
    setStartDate(today);
    setEndDate(today);
  };
  const changeStatus = e => setStatus(e.target.value);
  const changeStartDate = e => setStartDate(e.target.value);
  const changeEndDate = e => setEndDate(e.target.value);

  const submit = e => {
    if (e) e.preventDefault();
    handleAdd({
      statusId: status,
      startDate,
      endDate
    });
    toggle();
  };

  const checkDisabled = () => {
    return (
      !checkDateValid(startDate) || !checkDateValid(endDate) || status === ''
    );
  };

  return (
    <>
      <Row className="flex-column justify-content-end align-items-end my-2 mx-2">
        <Button className="my-2" color="primary" onClick={toggle}>
          Add Status
        </Button>
        <Collapse isOpen={isOpen} className="w-100">
          <Card>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="statusSelect">Status</Label>
                  <Input
                    type="select"
                    value={status}
                    name="select"
                    id="statusSelect"
                    onChange={changeStatus}
                  >
                    {statusIds.map(id => {
                      return (
                        <option value={id} key={id}>
                          {statuses[id].name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="startDateInput">Start date</Label>
                  <Input
                    type="text"
                    value={startDate}
                    name="startDate"
                    id="startDateInput"
                    invalid={!checkDateValid(startDate)}
                    onChange={changeStartDate}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="endDateInput">End date</Label>
                  <Input
                    type="text"
                    value={endDate}
                    name="endDate"
                    id="endDateInput"
                    invalid={!checkDateValid(endDate)}
                    onChange={changeEndDate}
                  />
                  <FormText color="muted">
                    Dates must be in DDMMYY format, it will be automatically be
                    converted to DD-MM-YYYY
                  </FormText>
                  <FormText color="muted">
                    If permanent, please indicate permanent in end date
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

AddStatus.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  statuses: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    })
  }).isRequired,
  statusIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AddStatus;
