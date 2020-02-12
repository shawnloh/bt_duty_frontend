import React, { memo } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import SingleStatus from './SingleStatus';

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
        {statuses.map(status => (
          <SingleStatus
            key={status.get('_id')}
            status={status}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))}
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
