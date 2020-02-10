import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'reactstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import { List } from 'immutable';

const Details = ({ name, rank, platoon, eventsDate }) => {
  const { url } = useRouteMatch();
  return (
    <>
      <Table striped responsive>
        <tbody>
          <tr>
            <th className="text-center">Name:</th>
            <td className="text-center">{name}</td>
          </tr>
          <tr>
            <th className="text-center">Rank:</th>
            <td className="text-center">{rank}</td>
          </tr>
          <tr>
            <th className="text-center">Platoon:</th>
            <td className="text-center">{platoon}</td>
          </tr>
        </tbody>
      </Table>
      <Button
        tag={Link}
        to={`${url}/edit`}
        color="primary"
        className="w-100 my-2"
      >
        Edit Details
      </Button>
      <Table striped responsive>
        <thead>
          <tr>
            <th>Event Dates:</th>
          </tr>
        </thead>
        <tbody>
          {eventsDate.map(date => {
            return (
              <tr key={date}>
                <td className="text-center">{date}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

Details.defaultProps = {
  eventsDate: List()
};

Details.propTypes = {
  name: PropTypes.string.isRequired,
  rank: PropTypes.string.isRequired,
  platoon: PropTypes.string.isRequired,
  eventsDate: PropTypes.oneOfType([PropTypes.instanceOf(List)])
};

export default Details;
