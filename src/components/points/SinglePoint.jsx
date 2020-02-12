import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Map } from 'immutable';

function SinglePoint({ point, handleUpdate, handleDelete }) {
  const name = point.get('name');
  const id = point.get('_id');

  const updatePoint = useCallback(() => {
    handleUpdate(id, name);
  }, [handleUpdate, id, name]);

  const deletePoint = useCallback(() => {
    handleDelete(id, name);
  }, [handleDelete, id, name]);

  return (
    <tr>
      <td className="text-center">{name}</td>
      <td className="text-center">
        <Button color="primary" onClick={updatePoint}>
          Edit
        </Button>{' '}
        <Button onClick={deletePoint} color="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
}

SinglePoint.propTypes = {
  point: PropTypes.instanceOf(Map).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default memo(SinglePoint);
