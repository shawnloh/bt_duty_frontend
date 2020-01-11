import React from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const PlatoonTable = ({ platoons, toggle, modes }) => {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th className="text-right" style={{ width: '50%' }}>
              Name
            </th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {platoons.map(platoon => {
            return (
              <tr key={platoon._id}>
                <td className="text-right">{platoon.name}</td>
                <td className="text-center">
                  <Button
                    color="primary"
                    onClick={() => toggle(modes.UPDATE, platoon._id)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    onClick={() => toggle(modes.DELETE, platoon._id)}
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

PlatoonTable.propTypes = {
  platoons: PropTypes.arrayOf(
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

export default PlatoonTable;
