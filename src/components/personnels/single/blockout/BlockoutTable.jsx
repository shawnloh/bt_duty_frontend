import React from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { List } from 'immutable';

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
            <tr key={date}>
              <td className="text-center">{date}</td>
              <td className="text-center">
                <Button
                  color="danger"
                  onClick={() => handleDelete({ startDate: date })}
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

BlockoutTable.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  blockoutDates: PropTypes.oneOfType([PropTypes.instanceOf(List)]).isRequired
};

export default BlockoutTable;
