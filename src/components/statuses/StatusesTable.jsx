import React from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { List } from 'immutable';

const StatusesTable = ({ statuses, handleUpdate, handleDelete }) => {
  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th style={{ width: '50%' }} className="text-center">
            Name
          </th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {statuses.map(status => {
          return (
            <tr key={status.get('_id')}>
              <td className="text-center">{status.get('name')}</td>
              <td className="text-center">
                <Button
                  color="primary"
                  onClick={() => handleUpdate(status.get('_id'))}
                >
                  Edit
                </Button>{' '}
                <Button
                  onClick={() => handleDelete(status.get('_id'))}
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
  );
};

StatusesTable.propTypes = {
  statuses: PropTypes.instanceOf(List).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default StatusesTable;
