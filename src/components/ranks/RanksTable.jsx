import React from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { List } from 'immutable';

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
            <tr key={rank.get('_id')}>
              <td className="text-center">{rank.get('name')}</td>
              <td className="text-center">
                <Button
                  color="primary"
                  onClick={() => handleUpdate(rank.get('_id'))}
                >
                  Edit
                </Button>{' '}
                <Button
                  onClick={() => handleDelete(rank.get('_id'))}
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

RankTable.propTypes = {
  ranks: PropTypes.instanceOf(List).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default RankTable;
