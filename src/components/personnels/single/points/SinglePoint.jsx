import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Map } from 'immutable';

function SinglePoint({ point, handleUpdate }) {
  const name = point.getIn(['pointSystem', 'name']);
  const points = point.get('points');

  return (
    <tr>
      <td className="text-center">{name}</td>
      <td className="text-center">{points}</td>
      <td className="text-center">
        <Button color="primary" onClick={() => handleUpdate(point)}>
          Edit
        </Button>
      </td>
    </tr>
  );
}

SinglePoint.propTypes = {
  point: PropTypes.instanceOf(Map).isRequired,
  handleUpdate: PropTypes.func.isRequired
};

export default memo(SinglePoint);
