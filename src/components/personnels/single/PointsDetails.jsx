import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';

const PointsDetails = ({ handleEdit, points }) => {
  const handleEditButtonClick = async (
    personnelPointId,
    pointSystemName,
    point
  ) => {
    const { value: pointToEdit } = await Swal.fire({
      title: `Enter new number for ${pointSystemName}`,
      input: 'number',
      inputPlaceholder: point,
      showCancelButton: true,
      confirmButtonText: 'Change',
      inputValidator: value => {
        if (!value) {
          return `Please enter a new number for ${pointSystemName}`;
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
      handleEdit(personnelPointId, pointToEdit);
    }
  };
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
        {points.map(point => {
          return (
            <tr key={point._id}>
              <td className="text-center">{point.pointSystem.name}</td>
              <td className="text-center">{point.points}</td>
              <td className="text-center">
                <Button
                  color="primary"
                  onClick={() =>
                    handleEditButtonClick(
                      point._id,
                      point.pointSystem.name,
                      point.points
                    )
                  }
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
  points: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
      pointSystem: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
};

export default PointsDetails;
