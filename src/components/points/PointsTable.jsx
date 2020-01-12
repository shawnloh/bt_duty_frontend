import React from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const PointTable = ({ points, toggle, modes }) => {
  return (
    <div>
      <Table striped>
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
              <tr key={point._id}>
                <td className="text-center">{point.name}</td>
                <td className="text-center">
                  <Button
                    color="primary"
                    onClick={() => toggle(modes.UPDATE, point._id)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    onClick={() => toggle(modes.DELETE, point._id)}
                    color="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

PointTable.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,
  toggle: PropTypes.func.isRequired,
  modes: PropTypes.shape({
    UPDATE: PropTypes.string.isRequired,
    DELETE: PropTypes.string.isRequired,
    ADD: PropTypes.string.isRequired
  }).isRequired
};

export default PointTable;
