import React from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const RankTable = ({ ranks, toggle, modes }) => {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th className="text-right">Name</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ranks.map(rank => {
            return (
              <tr key={rank._id}>
                <td className="text-right">{rank.name}</td>
                <td className="text-center">
                  <Button
                    color="primary"
                    onClick={() => toggle(modes.UPDATE, rank._id)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    onClick={() => toggle(modes.DELETE, rank._id)}
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

RankTable.propTypes = {
  ranks: PropTypes.arrayOf(
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

export default RankTable;
