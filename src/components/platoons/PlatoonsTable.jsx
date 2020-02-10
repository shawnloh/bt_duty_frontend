import React from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { List } from 'immutable';

const PlatoonTable = ({ platoons, handleUpdate, handleDelete }) => {
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
        {platoons.map(platoon => {
          return (
            <tr key={platoon.get('_id')}>
              <td className="text-center">{platoon.get('name')}</td>
              <td className="text-center">
                <Button
                  color="primary"
                  onClick={() => handleUpdate(platoon.get('_id'))}
                >
                  Edit
                </Button>{' '}
                <Button
                  onClick={() => handleDelete(platoon.get('_id'))}
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
  );
};

PlatoonTable.propTypes = {
  platoons: PropTypes.instanceOf(List).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default PlatoonTable;
