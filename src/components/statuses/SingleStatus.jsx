import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Map } from 'immutable';

function SingleStatus({ status, handleUpdate, handleDelete }) {
  const id = status.get('_id');
  const name = status.get('name');

  const updateStatus = useCallback(() => {
    handleUpdate(id, name);
  }, [handleUpdate, id, name]);

  const deleteStatus = useCallback(() => {
    handleDelete(id, name);
  }, [handleDelete, id, name]);

  return (
    <tr>
      <td className="text-center">{name}</td>
      <td className="text-center">
        <Button color="primary" onClick={updateStatus}>
          Edit
        </Button>{' '}
        <Button onClick={deleteStatus} color="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
}

SingleStatus.propTypes = {
  status: PropTypes.instanceOf(Map).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default memo(SingleStatus);
