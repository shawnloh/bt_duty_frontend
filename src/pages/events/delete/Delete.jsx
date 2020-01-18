import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
  CardText,
  Button,
  Spinner
} from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deleteEvent as deleteEventAction } from './actions';
import AppLayout from '../../shared/AppLayout';

export class Delete extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      revert: false
    };
  }

  handleRevert = e => {
    const { checked } = e.target;
    this.setState({
      revert: checked
    });
  };

  goBack = () => {
    const {
      history: { goBack }
    } = this.props;
    goBack();
  };

  handleDelete = () => {
    const {
      events,
      match: {
        params: { eventId }
      },
      deleteEvent
    } = this.props;
    const { revert } = this.state;
    const event = events[eventId];
    deleteEvent({ eventId: event._id, revert });
  };

  getActionButtons = () => {
    const { isDeleting } = this.props;
    if (!isDeleting) {
      return (
        <Row>
          <Col xs="6">
            <Button
              color="primary"
              size="lg"
              className="w-100"
              onClick={this.goBack}
            >
              Cancel
            </Button>
          </Col>
          <Col xs="6">
            <Button
              color="danger"
              size="lg"
              className="w-100"
              onClick={this.handleDelete}
            >
              Confirm Delete
            </Button>
          </Col>
        </Row>
      );
    }
    return (
      <Row>
        <Col className="text-center">
          <Spinner size="lg" color="primary" />
          <p>Deleting...</p>
        </Col>
      </Row>
    );
  };

  getAlertMessage = () => {
    const { revert } = this.state;
    if (!revert) {
      return (
        <Alert color="success">
          Removing this event will not deduct points
        </Alert>
      );
    }

    return (
      <Alert color="danger">
        Removing this event will deduct points from personnels
      </Alert>
    );
  };

  getErrors = () => {
    const { errors } = this.props;
    if (errors.length === 0) {
      return null;
    }

    return (
      <Row className="my-2">
        <Col>
          <Alert color="danger">
            {errors.map(error => (
              <p key={error}>{error}</p>
            ))}
          </Alert>
        </Col>
      </Row>
    );
  };

  render() {
    const {
      events,
      match: {
        params: { eventId }
      },
      isDeleting
    } = this.props;
    const { revert } = this.state;
    const event = events[eventId] || null;

    if (!event) {
      return <Redirect to="/events" />;
    }
    const errors = this.getErrors();
    const alert = this.getAlertMessage();
    const actionButtons = this.getActionButtons();

    return (
      <AppLayout>
        <Container>
          {errors}
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
              <CardText>Name: {event.name}</CardText>
              <CardText>Point System: {event.pointSystem.name}</CardText>
              <CardText>Points: {event.pointsAllocation}</CardText>
            </Card>
          </Row>
          <Row>
            <Col className="d-flex align-items-center justify-content-center">
              <FormGroup check>
                <Input
                  type="checkbox"
                  id="revertCheckBox"
                  checked={revert}
                  onChange={this.handleRevert}
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
                  Total Affected Personnels: {event.personnels.length}
                </p>
              )}
            </Col>
          </Row>
          <Row>
            <Col>{alert}</Col>
          </Row>
          {actionButtons}
        </Container>
      </AppLayout>
    );
  }
}

Delete.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      eventId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  events: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  isDeleting: PropTypes.bool.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  events: state.events.get('events'),
  isDeleting: state.pages.events.delete.get('isDeleting'),
  errors: state.pages.events.delete.get('errors')
});

const mapDispatchToProps = {
  deleteEvent: deleteEventAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
