import React, { memo } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import SinglePersonnel from './SinglePersonnel';

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
        {personnels.map(person => (
          <SinglePersonnel
            key={person.get('_id')}
            handleDelete={onDelete}
            person={person}
          />
        ))}
      </tbody>
    </Table>
  );
};

PersonnelsTable.propTypes = {
  personnels: PropTypes.oneOfType([PropTypes.instanceOf(List)]).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default memo(PersonnelsTable);
