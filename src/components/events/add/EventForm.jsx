import React from 'react';
import { Form, Row, Col, FormGroup, Label, Input, FormText } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

const checkDateValid = date => {
  return moment(date, 'DDMMYY', true).isValid();
};

const EventForm = ({
  points = {},
  pointIds = [],
  pointSystem = '',
  date = '',
  name = '',
  pointAllocation = 1,
  handleChange,
  isAdding
}) => {
  return (
    <Form>
      <Row>
        <Col>
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input
              type="text"
              name="name"
              id="Name"
              placeholder="Name of the event"
              onChange={handleChange}
              invalid={name === ''}
              value={name}
              disabled={isAdding}
            />
          </FormGroup>
          <FormGroup>
            <Label for="PointSystem">Point System</Label>
            <Input
              type="select"
              name="pointSystem"
              id="PointSystem"
              value={pointSystem}
              onChange={handleChange}
              invalid={pointSystem === ''}
              disabled={isAdding}
            >
              {pointIds.map(id => (
                <option key={id} value={id}>
                  {points[id].name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="Date">Date</Label>
            <Input
              type="text"
              name="date"
              id="Date"
              placeholder="e.g. 291219"
              invalid={!checkDateValid(date)}
              onChange={handleChange}
              value={date}
              disabled={isAdding}
            />
            <FormText color="muted">
              Must be in DDMMYY format, it will automatically convert to
              DD-MM-YYYY during submission
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="PointAllocation">Point Allocation</Label>
            <Input
              type="number"
              name="pointAllocation"
              id="PointAllocation"
              onChange={handleChange}
              invalid={pointAllocation < 1}
              value={pointAllocation}
              disabled={isAdding}
            />
            <FormText color="muted">
              Min of 1 is needed to create event
            </FormText>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

EventForm.propTypes = {
  points: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  pointIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  pointSystem: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pointAllocation: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  handleChange: PropTypes.func.isRequired
};

export default EventForm;
