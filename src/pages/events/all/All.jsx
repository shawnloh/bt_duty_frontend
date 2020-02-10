import React, { useState, useMemo, useCallback, memo } from 'react';
import { Container, Row, Button, Col, Label, Input } from 'reactstrap';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import EventsTable from '../../../components/events/all/EventsTable';
import Pagination from '../../../components/commons/Pagination';
import Layout from '../../shared/AppLayout';
import { getEvents, getPoints } from './selectors';

export function All() {
  const { path } = useRouteMatch();
  const [rowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState('ALL');
  const events = useSelector(getEvents);
  const points = useSelector(getPoints);

  // Slice events
  const shownEvents = useMemo(() => {
    const lastIndex = page * rowsPerPage;
    const firstIndex = lastIndex - rowsPerPage;
    if (filterBy === 'ALL') {
      return events.slice(firstIndex, lastIndex);
    }

    const filteredEvents = events.filter(event => {
      return event.getIn(['pointSystem', 'name']) === filterBy;
    });

    return filteredEvents.slice(firstIndex, lastIndex);
  }, [events, filterBy, page, rowsPerPage]);

  const filter = useCallback(({ target: { value } }) => setFilterBy(value), []);

  return (
    <Layout>
      <Helmet>
        <title>Events</title>
      </Helmet>
      <Container>
        <Row className="my-2 d-flex justify-content-center align-items-center">
          <Col xs="9">
            <h1>Events</h1>
          </Col>
          <Col xs="3" className="d-flex justify-content-end">
            <Button color="success" size="md" tag={Link} to={`${path}/add`}>
              Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <p className="text-danger">
              Note: Past events that have expired will automatically be removed,
              points will be retained.
            </p>
          </Col>
        </Row>

        <Row className="my-2">
          <Col xs="12">
            <Label for="filterSelect">Filter</Label>
            <Input
              type="select"
              name="filterSelect"
              id="filterSelect"
              onChange={filter}
            >
              <option value="ALL">ALL</option>
              {points.map(point => (
                <option key={point.get('_id')} value={point.get('name')}>
                  {point.get('name')}
                </option>
              ))}
            </Input>
          </Col>
        </Row>
        <Row className="my-2">
          <EventsTable events={shownEvents} path={path} />
        </Row>
        <Row className="justify-content-center align-items-center">
          <Pagination
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            totalPosts={events.size}
          />
        </Row>
      </Container>
    </Layout>
  );
}

export default memo(All);
