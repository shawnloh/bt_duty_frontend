import React, { useState, useCallback, memo } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import ActionsButton from '../../../components/events/delete/ActionsButtons';
import { deleteEvent } from './actions';
import Layout from '../../shared/AppLayout';

export function Delete() {
  const history = useHistory();
  const params = useParams();

  const [revert, setRevert] = useState(false);
  const events = useSelector(state => state.events.get('events'));
  const isDeleting = useSelector(state =>
    state.pages.events.delete.get('isDeleting')
  );

  const errors = useSelector(state => state.pages.events.delete.get('errors'));

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
      <Container>
        {errors.size !== 0 ? (
          <Row className="my-2">
            <Col>
              <Alert color="danger">
                {errors.map(error => (
                  <p key={error}>{error}</p>
                ))}
              </Alert>
            </Col>
          </Row>
        ) : null}
        <Row className="mt-2">
          <Col>
            <h3 className="text-danger">Deleting event is irreversible!</h3>
          </Col>
        </Row>

        <Row className="my-2 mx-1">
          <Card body>
            <CardTitle className="text-center">
              <p className="font-weight-bold">Deleting</p>
            </CardTitle>
            <CardText>Name: {event.get('name')}</CardText>
            <CardText>
              Point System: {event.getIn(['pointSystem', 'name'])}
            </CardText>
            <CardText>Points: {event.get('pointsAllocation')}</CardText>
          </Card>
        </Row>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <FormGroup check>
              <Input
                type="checkbox"
                id="revertCheckBox"
                checked={revert}
                onChange={handleRevert}
                disabled={isDeleting}
              />
              <Label for="revertCheckBox">Revert Points</Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            {revert && (
              <p className="font-weight-bold">
                Total Affected Personnels: {event.get('personnels').length}
              </p>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {revert ? (
              <Alert color="danger">
                Removing this event will deduct points from personnels
              </Alert>
            ) : (
              <Alert color="success">
                Removing this event will not deduct points
              </Alert>
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
