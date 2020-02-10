import React, { useState, useEffect, useCallback, memo } from 'react';
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Alert
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import Layout from '../../shared/AppLayout';
import EventForm from '../../../components/events/add/EventForm';
import { getPlatoons, getPoints, getRanks, getStatuses } from './selectors';
import { createEvent } from './actions';

export function Add() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [submit, setSubmit] = useState(false);
  const platoons = useSelector(getPlatoons);
  const points = useSelector(getPoints);
  const ranks = useSelector(getRanks);
  const statuses = useSelector(getStatuses);
  const isAdding = useSelector(state => state.pages.events.add.get('isAdding'));
  const errors = useSelector(state => state.pages.events.add.get('errors'));
  const personnels = useSelector(state => state.personnels.get('personnels'));

  const handleSubmit = useCallback(
    ({ name, date, pointSystem, pointAllocation, selectedPersonnels }) => {
      const data = {
        name,
        date: moment(date, 'DDMMYY', true).format('DD-MM-YYYY'),
        pointSystemId: pointSystem,
        pointAllocation,
        personnels: selectedPersonnels
      };
      dispatch(createEvent(data));
      setSubmit(true);
    },
    [dispatch]
  );

  useEffect(() => {
    let mounted = true;
    if (submit && !isAdding && errors.size === 0) {
      if (mounted) history.replace('/events');
    }
    return () => {
      mounted = false;
    };
  }, [errors.size, history, isAdding, submit]);

  return (
    <Layout>
      <Container className="mb-2">
        <Row className="mt-2">
          <Col>
            <Breadcrumb tag="nav">
              <BreadcrumbItem tag={Link} to="/events">
                Events
              </BreadcrumbItem>
              <BreadcrumbItem active tag="span">
                Add
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>

        {errors.size > 0 && (
          <Row className="my-2">
            <Col>
              <Alert color="danger">
                {errors.map(error => {
                  return <p key={error}>{error}</p>;
                })}
              </Alert>
            </Col>
          </Row>
        )}
        <Row className="my-2">
          <Col>
            <h1>Add new event</h1>
          </Col>
        </Row>
        <EventForm
          points={points}
          platoons={platoons}
          ranks={ranks}
          statuses={statuses}
          personnels={personnels}
          isAdding={isAdding}
          handleSubmit={handleSubmit}
        />
      </Container>
    </Layout>
  );
}

export default memo(Add);
