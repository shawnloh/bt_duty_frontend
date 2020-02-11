import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import { List } from 'immutable';

const handleEditButtonClick = async (point, handleEdit) => {
  const { value: pointToEdit } = await Swal.fire({
    title: `Enter new point for ${point.getIn(['pointSystem', 'name'])}`,
    input: 'number',
    inputPlaceholder: point.get('points'),
    showCancelButton: true,
    confirmButtonText: 'Change',
    inputValidator: value => {
      if (!value) {
        return `Please enter a new number for ${point.getIn([
          'pointSystem',
          'name'
        ])}`;
      }
      const newPoint = parseInt(value, 10);
      if (typeof newPoint !== 'number') {
        return `Only numbers are accepted`;
      }

      if (newPoint < 0) {
        return 'Only positive number is allowed inclusive of 0';
      }
      return null;
    }
  });
  if (pointToEdit) {
    handleEdit(point.get('_id'), pointToEdit);
  }
};

const PointsDetails = ({ handleEdit, points }) => {
  const sortedPoints = useMemo(() => {
    const sortingPoints = points.sort((a, b) => {
      const textA = String(a.getIn(['pointSystem', 'name'])).toUpperCase();
      const textB = String(b.getIn(['pointSystem', 'name'])).toUpperCase();
      if (textA < textB) {
        return -1;
      }
      if (textA > textB) {
        return 1;
      }
      return 0;
    });
    return sortingPoints;
  }, [points]);

  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th className="text-center">Point System:</th>
          <th className="text-center">Point:</th>
          <th className="text-center">Action:</th>
        </tr>
      </thead>
      <tbody>
        {sortedPoints.map(point => {
          return (
            <tr key={point.get('_id')}>
              <td className="text-center">
                {point.getIn(['pointSystem', 'name'])}
              </td>
              <td className="text-center">{point.get('points')}</td>
              <td className="text-center">
                <Button
                  color="primary"
                  onClick={() => handleEditButtonClick(point, handleEdit)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

PointsDetails.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  points: PropTypes.oneOfType([PropTypes.instanceOf(List)]).isRequired
};

export default memo(PointsDetails);
