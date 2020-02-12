import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Map } from 'immutable';

function SingleRank({ rank, handleUpdate, handleDelete }) {
  const name = rank.get('name');
  const id = rank.get('_id');

  const updateRank = useCallback(() => {
    handleUpdate(id, name);
  }, [handleUpdate, id, name]);

  const deleteRank = useCallback(() => {
    handleDelete(id, name);
  }, [handleDelete, id, name]);

  return (
    <tr>
      <td className="text-center">{name}</td>
      <td className="text-center">
        <Button color="primary" onClick={updateRank}>
          Edit
        </Button>{' '}
        <Button onClick={deleteRank} color="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
}

SingleRank.propTypes = {
  rank: PropTypes.instanceOf(Map).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default memo(SingleRank);
