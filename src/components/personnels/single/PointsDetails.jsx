import React, { useMemo, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import Swal from 'sweetalert2';
import { List } from 'immutable';
import SinglePoint from './points/SinglePoint';

function useSortPoints(points) {
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
  return sortedPoints;
}

function useUpdatePointModal(editFunc) {
  const handler = useCallback(
    point => {
      Swal.fire({
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
      }).then(({ value }) => {
        if (value) {
          editFunc(point.get('_id'), value);
        }
      });
    },
    [editFunc]
  );
  return handler;
}

const PointsDetails = ({ handleEdit, points }) => {
  const sortedPoints = useSortPoints(points);
  const edit = useUpdatePointModal(handleEdit);

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
            <SinglePoint
              key={point.get('_id')}
              handleUpdate={edit}
              point={point}
            />
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
