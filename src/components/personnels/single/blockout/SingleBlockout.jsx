import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

function SingleBlockout({ date, handleDelete }) {
  const deleteBlockout = useCallback(() => {
    handleDelete({ startDate: date });
  }, [date, handleDelete]);

  return (
    <tr>
      <td className="text-center">{date}</td>
      <td className="text-center">
        <Button color="danger" onClick={deleteBlockout}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

SingleBlockout.propTypes = {
  date: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default memo(SingleBlockout);
