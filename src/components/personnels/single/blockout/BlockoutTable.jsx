import React, { memo } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import SingleBlockout from './SingleBlockout';

const BlockoutTable = ({ handleDelete, blockoutDates }) => {
  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th className="text-center">Blockout Dates:</th>
          <th className="text-center">Action:</th>
        </tr>
      </thead>
      <tbody>
        {blockoutDates.map(date => {
          return (
            <SingleBlockout
              key={date}
              date={date}
              handleDelete={handleDelete}
            />
          );
        })}
      </tbody>
    </Table>
  );
};

BlockoutTable.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  blockoutDates: PropTypes.oneOfType([PropTypes.instanceOf(List)]).isRequired
};

export default memo(BlockoutTable);
