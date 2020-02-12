import React, { memo } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import SinglePlatoon from './SinglePlatoon';

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
            <SinglePlatoon
              key={platoon.get('_id')}
              platoon={platoon}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
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

export default memo(PlatoonTable);
