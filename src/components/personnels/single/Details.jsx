import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

const Details = ({ name, rank, platoon, lastEventDate }) => {
  return (
    <Table striped>
      <tbody>
        <tr>
          <th className="text-center">Name:</th>
          <td className="text-center">{name}</td>
        </tr>
        <tr>
          <th className="text-center">Rank:</th>
          <td className="text-center">{rank.name}</td>
        </tr>
        <tr>
          <th className="text-center">Platoon:</th>
          <td className="text-center">{platoon.name}</td>
        </tr>
        <tr>
          <th className="text-center">Last Event Date:</th>
          <td className="text-center">{lastEventDate}</td>
        </tr>
      </tbody>
    </Table>
  );
};

Details.defaultProps = {
  lastEventDate: 'None'
};

Details.propTypes = {
  name: PropTypes.string.isRequired,
  lastEventDate: PropTypes.string,
  rank: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  platoon: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default Details;
