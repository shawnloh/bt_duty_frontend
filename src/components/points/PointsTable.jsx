import React, { memo } from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { List } from 'immutable';

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
          const name = point.get('name');
          const id = point.get('_id');
          return (
            <tr key={id}>
              <td className="text-center">{name}</td>
              <td className="text-center">
                <Button color="primary" onClick={() => handleUpdate(id, name)}>
                  Edit
                </Button>{' '}
                <Button onClick={() => handleDelete(id, name)} color="danger">
                  Delete
                </Button>
              </td>
            </tr>
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
