import React, { memo } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import SingleRank from './SingleRank';

const RankTable = ({ ranks, handleUpdate, handleDelete }) => {
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
        {ranks.map(rank => {
          return (
            <SingleRank
              key={rank.get('_id')}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              rank={rank}
            />
          );
        })}
      </tbody>
    </Table>
  );
};

RankTable.propTypes = {
  ranks: PropTypes.instanceOf(List).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default memo(RankTable);
