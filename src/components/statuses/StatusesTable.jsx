import React, { memo } from 'react';
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
          const id = status.get('_id');
          const name = status.get('name');
          return (
            <tr key={id}>
              <td className="text-center">{name}</td>
              <td className="text-center">
                <Button color="primary" onClick={() => handleUpdate(id, name)}>
                  Edit
                </Button>{' '}
                <Button onClick={() => handleDelete(id, name)} color="danger">
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

export default memo(StatusesTable);
