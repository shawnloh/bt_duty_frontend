import React, { memo } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import SinglePoint from './SinglePoint';

const PointTable = ({ points, handleUpdate, handleDelete }) => {
  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th className="text-center" style={{ width: '50%' }}>
            Name
          </th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {points.map(point => {
          return (
            <SinglePoint
              key={point.get('_id')}
              point={point}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          );
        })}
      </tbody>
    </Table>
  );
};

PointTable.propTypes = {
  points: PropTypes.instanceOf(List).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired
};

export default memo(PointTable);
