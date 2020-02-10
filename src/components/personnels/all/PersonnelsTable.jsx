import React from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List } from 'immutable';

const PersonnelsTable = ({ personnels, onDelete }) => {
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
        {personnels.map(person => {
          const rank = person.getIn(['rank', 'name']);
          const platoon = person.getIn(['platoon', 'name']);
          const id = person.get('_id');
          const name = person.get('name');
          return (
            <tr key={id}>
              <td className="text-center">{`${platoon} ${rank} ${name}`}</td>
              <td className="text-center">
                <Button color="primary" tag={Link} to={`/personnels/${id}`}>
                  Edit
                </Button>{' '}
                <Button color="danger" onClick={() => onDelete(person)}>
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
  personnels: PropTypes.oneOfType([PropTypes.instanceOf(List)]).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default PersonnelsTable;
