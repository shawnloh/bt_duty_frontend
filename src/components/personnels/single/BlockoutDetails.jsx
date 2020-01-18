import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'reactstrap';

function BlockoutDetails({ blockoutDates, handleDelete }) {
  if (blockoutDates.length === 0) {
    return <h3 className="my-2">No blockout date for this personnel</h3>;
  }

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
                <Button color="danger" onClick={() => handleDelete(date)}>
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

BlockoutDetails.defaultProps = {
  blockoutDates: []
};

BlockoutDetails.propTypes = {
  blockoutDates: PropTypes.arrayOf(PropTypes.string),
  handleDelete: PropTypes.func.isRequired
};

export default BlockoutDetails;
