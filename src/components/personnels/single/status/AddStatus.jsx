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
import { List } from 'immutable';

const checkDateValid = date => {
  return (
    moment(date, 'DDMMYY', true).isValid() || date.toLowerCase() === 'permanent'
  );
};
const today = moment()
  .tz('Asia/Singapore')
  .format('DDMMYY');

const AddStatus = ({ handleAdd, statuses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(
    statuses.has(0) ? statuses.getIn(['0', '_id']) : ''
  );
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const toggle = () => {
    setIsOpen(!isOpen);
    setStatus(statuses.has(0) ? statuses.getIn(['0', '_id']) : '');
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
                    {statuses.map(stat => {
                      return (
                        <option value={stat.get('_id')} key={stat.get('_id')}>
                          {stat.get('name')}
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
  statuses: PropTypes.oneOfType([PropTypes.instanceOf(List).isRequired])
    .isRequired
};

export default AddStatus;
