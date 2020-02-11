import React, { useState, useCallback, memo, useMemo } from 'react';
import {
  Container,
  Row,
  Col,
  Alert,
  Label,
  Input,
  FormGroup,
  Card,
  CardTitle,
  CardText
} from 'reactstrap';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import useReduxPageSelector from '../../../hooks/useReduxPageSelector';
import ActionsButton from '../../../components/events/delete/ActionsButtons';
import { deleteEvent } from './actions';
import Layout from '../../shared/AppLayout';

export function Delete() {
  const history = useHistory();
  const params = useParams();

  const [revert, setRevert] = useState(false);
  const events = useSelector(state => state.events.get('events'));
  const pages = useMemo(() => ['events', 'delete'], []);
  const isDeleting = useReduxPageSelector(pages, 'isDeleting');
  const errors = useReduxPageSelector(pages, 'errors');

  const dispatch = useDispatch();
  const handleRevert = useCallback(({ target: { checked } }) => {
    setRevert(checked);
  }, []);

  const handleDelete = useCallback(() => {
    dispatch(deleteEvent({ eventId: params.eventId, revert }));
  }, [dispatch, params.eventId, revert]);

  const event = events.get(params.eventId);
  if (!event || event.size === 0) {
    return <Redirect to="/events" />;
  }

  return (
    <Layout>
      <Helmet>Delete Event</Helmet>
      <Container className="py-2">
        {errors.size !== 0 ? (
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
        ) : null}
        <Row>
          <Col>
            <h3 className="text-danger">Deleting event is irreversible!</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            {revert ? (
              <Alert color="danger">
                Removing this event will deduct points and remove event date
                from personnels
              </Alert>
            ) : (
              <Alert color="success">
                Removing this event will not affect points and event date in
                personnels
              </Alert>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Card body>
              <CardTitle>
                <p className="font-weight-bold mb-0">Deleting</p>
              </CardTitle>
              <CardText>
                Name: {event.get('name')} <br />
                Point System: {event.getIn(['pointSystem', 'name'])}
                <br />
                Points: {event.get('pointsAllocation')}
              </CardText>
            </Card>
          </Col>
        </Row>
        <Row className="my-2">
          <Col sm={12} md={8} className="my-2 align-self-end">
            <FormGroup check>
              <Input
                type="checkbox"
                id="revertCheckBox"
                checked={revert}
                onChange={handleRevert}
                disabled={isDeleting}
              />
              <Label for="revertCheckBox">Revert Points and Event Date</Label>
            </FormGroup>
          </Col>
          <Col sm={12} md={4} className="my-2">
            {revert && (
              <p className="font-weight-bold m-0 p-0">
                Total Affected Personnels: {event.get('personnels').size}
              </p>
            )}
          </Col>
        </Row>
        <ActionsButton
          handleCancel={history.goBack}
          handleConfirm={handleDelete}
          isDeleting={isDeleting}
        />
      </Container>
    </Layout>
  );
}

export default memo(Delete);
