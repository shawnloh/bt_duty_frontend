import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams, Redirect } from 'react-router-dom';
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

import Layout from '../../shared/AppLayout';

export function Single() {
  const params = useParams();
  const personnels = useSelector(state => state.personnels.get('personnels'));
  const event = useSelector(state =>
    state.events.get('events').get(params.eventId)
  );

  if (!event || event.size === 0) {
    return <Redirect to="/events" />;
  }

  return (
    <Layout>
      <Helmet>
        <title>Event - Details</title>
      </Helmet>
      <Container className="py-2">
        <Row>
          <Col>
            <Breadcrumb tag="nav">
              <BreadcrumbItem tag={Link} to="/events">
                Events
              </BreadcrumbItem>
              <BreadcrumbItem active tag="span">
                Details
              </BreadcrumbItem>
              <BreadcrumbItem active tag="span">
                {event.get('name')}
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col xs="9">
            <h1>Details</h1>
          </Col>
          <Col xs="3" className="d-flex justify-content-end">
            <Button
              size="md"
              color="danger"
              tag={Link}
              to={`/events/${event.get('_id')}/delete`}
            >
              Delete
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive striped>
              <tbody>
                <tr>
                  <th className="text-center">Name</th>
                  <td className="text-center">{event.get('name')}</td>
                </tr>
                <tr>
                  <th className="text-center">Date</th>
                  <td className="text-center">{event.get('date')}</td>
                </tr>
                <tr>
                  <th className="text-center">Point System</th>
                  <td className="text-center">
                    {event.getIn(['pointSystem', 'name'])}
                  </td>
                </tr>
                <tr>
                  <th className="text-center">Points Allocation</th>
                  <td className="text-center">
                    {event.get('pointsAllocation')}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Personnels</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive striped>
              <thead>
                <tr>
                  <th className="text-center">Platoon</th>
                  <th className="text-center">Rank</th>
                  <th className="text-center">Name</th>
                </tr>
              </thead>
              <tbody>
                {event.get('personnels').map(personnel => {
                  const person = personnels.get(personnel.get('_id'));
                  return (
                    <tr key={person.get('_id')}>
                      <td className="text-center">
                        {person.getIn(['platoon', 'name'])}
                      </td>
                      <td className="text-center">
                        {person.getIn(['rank', 'name'])}
                      </td>
                      <td className="text-center">{person.get('name')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default memo(Single);
