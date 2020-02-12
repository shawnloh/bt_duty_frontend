import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';

function SinglePersonnel({ person, handleDelete }) {
  const rank = person.getIn(['rank', 'name']);
  const platoon = person.getIn(['platoon', 'name']);
  const id = person.get('_id');
  const name = person.get('name');

  const deletePersonnel = useCallback(() => {
    handleDelete(id, name);
  }, [handleDelete, id, name]);

  return (
    <tr key={id}>
      <td className="text-center">{`${platoon} ${rank} ${name}`}</td>
      <td className="text-center">
        <Button color="primary" tag={Link} to={`/personnels/${id}`}>
          Edit
        </Button>{' '}
        <Button color="danger" onClick={deletePersonnel}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

SinglePersonnel.propTypes = {
  person: PropTypes.instanceOf(Map).isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default memo(SinglePersonnel);
