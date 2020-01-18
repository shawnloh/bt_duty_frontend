import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  Table,
  Button
} from 'reactstrap';
import { Helmet } from 'react-helmet';

import AppLayout from '../../shared/AppLayout';

export class Single extends PureComponent {
  render() {
    const {
      events,
      personnels,
      match: {
        params: { eventId }
      }
    } = this.props;
    const event = events[eventId];
    return (
      <AppLayout>
        <Container>
          <Helmet>
            <title>Event - Details</title>
          </Helmet>
          <Row className="my-2">
            <Col>
              <Breadcrumb tag="nav">
                <BreadcrumbItem tag={Link} to="/events">
                  Events
                </BreadcrumbItem>
                <BreadcrumbItem active tag="span">
                  Details
                </BreadcrumbItem>
                <BreadcrumbItem active tag="span">
                  {event.name}
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row className="my-2 justify-content-center align-items-center">
            <Col xs="9">
              <h1>Details</h1>
            </Col>
            <Col xs="3" className="d-flex justify-content-end">
              <Button
                size="md"
                color="danger"
                tag={Link}
                to={`/events/${event._id}/delete`}
              >
                Delete
              </Button>
            </Col>
          </Row>
          <Row>
            <Table responsive striped>
              <tbody>
                <tr>
                  <th className="text-center">Name</th>
                  <td className="text-center">{event.name}</td>
                </tr>
                <tr>
                  <th className="text-center">Date</th>
                  <td className="text-center">{event.date}</td>
                </tr>
                <tr>
                  <th className="text-center">Point System</th>
                  <td className="text-center">{event.pointSystem.name}</td>
                </tr>
                <tr>
                  <th className="text-center">Points Allocation</th>
                  <td className="text-center">{event.pointsAllocation}</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row className="my-2">
            <Col>
              <h3>Personnels</h3>
            </Col>
          </Row>
          <Row>
            <Table responsive striped>
              <thead>
                <tr>
                  <th className="text-center">Platoon</th>
                  <th className="text-center">Rank</th>
                  <th className="text-center">Name</th>
                </tr>
              </thead>
              <tbody>
                {event.personnels.map(personnel => {
                  const person = personnels[personnel._id];
                  return (
                    <tr key={person._id}>
                      <td className="text-center">{person.platoon.name}</td>
                      <td className="text-center">{person.rank.name}</td>
                      <td className="text-center">{person.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </Container>
      </AppLayout>
    );
  }
}

Single.propTypes = {
  events: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      pointsAllocation: PropTypes.number.isRequired,
      personnels: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        }).isRequired
      ).isRequired,
      pointSystem: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        }).isRequired
      ).isRequired
    })
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      eventId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  personnels: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => ({
  events: state.events.get('events'),
  personnels: state.personnels.get('personnels')
});

export default connect(mapStateToProps)(Single);
