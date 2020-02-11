import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { List } from 'immutable';

const EventsTable = ({ events, path }) => {
  if (events.size === 0) {
    return <p>No events available</p>;
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
            <tr key={event.get('_id')}>
              <td className="text-center">{event.get('name')}</td>
              <td className="text-center">{event.get('date')}</td>
              <td className="text-center">
                {event.getIn(['pointSystem', 'name'])}
              </td>
              <td className="text-center">
                <Row>
                  <Button
                    tag={Link}
                    to={`${path}/${event.get('_id')}`}
                    color="primary"
                  >
                    View
                  </Button>
                </Row>
                <Row className="my-2">
                  <Button
                    color="danger"
                    tag={Link}
                    to={`${path}/${event.get('_id')}/delete`}
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
  events: PropTypes.oneOfType([PropTypes.instanceOf(List).isRequired])
    .isRequired,
  path: PropTypes.string.isRequired
};

export default memo(EventsTable);
