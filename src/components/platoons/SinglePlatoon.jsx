import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Map } from 'immutable';

function SinglePlatoon({ platoon, handleUpdate, handleDelete }) {
  const name = platoon.get('name');
  const id = platoon.get('_id');

  const updatePlatoon = useCallback(() => {
    handleUpdate(id, name);
  }, [handleUpdate, id, name]);

  const deletePlatoon = useCallback(() => {
    handleDelete(id, name);
  }, [handleDelete, id, name]);

  return (
    <tr>
      <td className="text-center">{name}</td>
      <td className="text-center">
        <Button color="primary" onClick={updatePlatoon}>
          Edit
        </Button>{' '}
        <Button onClick={deletePlatoon} color="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
}

SinglePlatoon.propTypes = {
  platoon: PropTypes.instanceOf(Map).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default memo(SinglePlatoon);
