import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

const EventsTable = ({ events, path }) => {
  if (events.length === 0) {
    return <Row className="my-2 mx-2">No events available</Row>;
  }
  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th className="text-center">Name</th>
          <th className="text-center">Date</th>
          <th className="text-center">Point System</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => {
          return (
            <tr key={event._id}>
              <td className="text-center">{event.name}</td>
              <td className="text-center">{event.date}</td>
              <td className="text-center">{event.pointSystem.name}</td>
              <td className="text-center">
                <Row>
                  <Button
                    tag={Link}
                    to={`${path}/${event._id}`}
                    color="primary"
                  >
                    View
                  </Button>
                </Row>
                <Row className="my-2">
                  <Button
                    color="danger"
                    tag={Link}
                    to={`${path}/${event._id}/delete`}
                  >
                    Delete
                  </Button>
                </Row>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

EventsTable.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      personnels: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      ).isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      pointSystem: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired,
      pointsAllocation: PropTypes.number.isRequired
    })
  ).isRequired,
  path: PropTypes.string.isRequired
};

export default EventsTable;
