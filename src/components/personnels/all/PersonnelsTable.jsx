import React from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const PersonnelsTable = ({ personnels, onDelete }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th className="text-center" style={{ width: '50%' }}>
            Name
          </th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {personnels.map(person => {
          const { name: rank } = person.rank;
          const { name: platoon } = person.platoon;
          const { name, _id } = person;
          return (
            <tr key={person._id}>
              <td className="text-center">{`${platoon} ${rank} ${name}`}</td>
              <td className="text-center">
                <Button color="primary">Edit</Button>{' '}
                <Button color="danger" onClick={() => onDelete(_id)}>
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

PersonnelsTable.propTypes = {
  personnels: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      rank: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }),
      platoon: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default PersonnelsTable;
