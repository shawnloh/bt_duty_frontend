import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
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
import { logout } from '../../../actions/authActions';
import useReduxPageSelector from '../../../hooks/useReduxPageSelector';

export function Add() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [submit, setSubmit] = useState(false);
  const platoons = useSelector(getPlatoons);
  const points = useSelector(getPoints);
  const ranks = useSelector(getRanks);
  const statuses = useSelector(getStatuses);
  const pages = useMemo(() => ['events', 'add'], []);
  const isAdding = useReduxPageSelector(pages, 'isAdding');
  const errors = useReduxPageSelector(pages, 'errors');
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

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

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
      <Container className="py-2">
        <Row>
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
          <Row>
            <Col>
              <Alert color="danger" className="w-100">
                {errors.map(error => {
                  return (
                    <p className="mb-0" key={error}>
                      {error}
                    </p>
                  );
                })}
              </Alert>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <h1>Add new event</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <EventForm
              points={points}
              platoons={platoons}
              ranks={ranks}
              statuses={statuses}
              personnels={personnels}
              isAdding={isAdding}
              handleSubmit={handleSubmit}
              handleLogout={handleLogout}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default memo(Add);
