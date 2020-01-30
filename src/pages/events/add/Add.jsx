import React, { PureComponent } from 'react';
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';

import AppLayout from '../../shared/AppLayout';
import EventForm from '../../../components/events/add/EventForm';
import { createEvent } from './actions';
// import EventsService from '../../../services/events';

export class Add extends PureComponent {
  componentDidUpdate(prevProps) {
    const { isAdding, errors, history } = this.props;
    if (prevProps.isAdding && !isAdding && errors.length === 0) {
      history.replace('/events');
    }
  }

  handleSubmit = ({
    name,
    date,
    pointSystem,
    pointAllocation,
    selectedPersonnels
  }) => {
    const { addEvent } = this.props;
    const data = {
      name,
      date: moment(date, 'DDMMYY', true).format('DD-MM-YYYY'),
      pointSystemId: pointSystem,
      pointAllocation,
      personnels: selectedPersonnels
    };
    addEvent(data);
  };

  renderErrors = () => {
    const { errors } = this.props;
    if (errors.length <= 0) return null;

    return (
      <Row className="my-2">
        <Col>
          <Alert color="danger">
            {errors.map(error => {
              return <p key={error}>{error}</p>;
            })}
          </Alert>
        </Col>
      </Row>
    );
  };

  render() {
    const {
      pointIds,
      points,
      personnels,
      rankIds,
      ranks,
      platoonIds,
      platoons,
      statusIds,
      statuses,
      isAdding
    } = this.props;

    const Errors = this.renderErrors();
    return (
      <AppLayout>
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

          {Errors}
          <Row className="my-2">
            <Col>
              <h1>Add new event</h1>
            </Col>
          </Row>
          <EventForm
            pointIds={pointIds}
            points={points}
            platoonIds={platoonIds}
            platoons={platoons}
            rankIds={rankIds}
            ranks={ranks}
            statusIds={statusIds}
            statuses={statuses}
            personnels={personnels}
            isAdding={isAdding}
            handleSubmit={this.handleSubmit}
          />
        </Container>
      </AppLayout>
    );
  }
}

Add.propTypes = {
  points: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  pointIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  ranks: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  rankIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  platoons: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  platoonIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  statuses: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  statusIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  personnels: PropTypes.shape({
    id: PropTypes.shape({
      name: PropTypes.string.isRequired,
      rank: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired,
      platoon: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    })
  }).isRequired,
  isAdding: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  addEvent: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  points: state.points.get('points'),
  pointIds: state.points.get('ids'),
  // personnelIds: state.personnels.get('ids'),
  personnels: state.personnels.get('personnels'),
  rankIds: state.ranks.get('ids'),
  ranks: state.ranks.get('ranks'),
  platoonIds: state.platoons.get('ids'),
  platoons: state.platoons.get('platoons'),
  statusIds: state.statuses.get('ids'),
  statuses: state.statuses.get('statuses'),
  errors: state.pages.events.add.get('errors'),
  isAdding: state.pages.events.add.get('isAdding')
});

const mapDispatchToProps = {
  addEvent: createEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
