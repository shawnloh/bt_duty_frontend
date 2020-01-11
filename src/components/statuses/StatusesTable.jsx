import React from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const StatusesTable = ({ statuses, toggle, modes }) => {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th className="text-right">Name</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map(status => {
            return (
              <tr key={status._id}>
                <td style={{ width: '50%' }} className="text-right">
                  {status.name}
                </td>
                <td className="text-center">
                  <Button
                    color="primary"
                    onClick={() => toggle(modes.UPDATE, status._id)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    onClick={() => toggle(modes.DELETE, status._id)}
                    color="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

StatusesTable.propTypes = {
  statuses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,
  toggle: PropTypes.func.isRequired,
  modes: PropTypes.shape({
    UPDATE: PropTypes.string.isRequired,
    DELETE: PropTypes.string.isRequired,
    ADD: PropTypes.string.isRequired
  }).isRequired
};

export default StatusesTable;
