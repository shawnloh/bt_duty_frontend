import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Map } from 'immutable';

function SingleStatus({ status, handleDelete }) {
  const name = status.getIn(['statusId', 'name']);
  const startDate = status.get('startDate');
  const endDate = status.get('endDate');

  const deleteStatus = useCallback(() => {
    handleDelete(status);
  }, [handleDelete, status]);

  return (
    <tr>
      <th>{name}</th>
      <td>{startDate}</td>
      <td>{endDate}</td>
      <td>
        <Button color="danger" onClick={deleteStatus}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

SingleStatus.propTypes = {
  status: PropTypes.instanceOf(Map).isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default memo(SingleStatus);
