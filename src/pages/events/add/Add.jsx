import React, { PureComponent } from 'react';
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Spinner,
  Button,
  Alert
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';

import AppLayout from '../../shared/AppLayout';
import EventForm from '../../../components/events/add/EventForm';
import GenerateForm from '../../../components/events/add/GenerateForm';
import { createEvent } from './actions';
import EventsService from '../../../services/events';

export class Add extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pointSystem: '',
      date: '',
      name: '',
      selectedPersonnels: [],
      pointAllocation: 1,
      authenticated: true,
      generationErrors: [],
      generatingNames: false,
      redirectToEvents: false
    };
  }

  componentDidMount() {
    const { pointIds, points } = this.props;
    if (pointIds.length > 0) {
      this.setState({
        pointSystem: points[pointIds[0]]._id
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { isAdding, errors } = this.props;
    if (prevProps.isAdding && !isAdding && errors.length <= 0) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        redirectToEvents: true
      });
    }
  }

  handleGenerateForm = async ({ pQty, wsQty, statuses, ranks, platoons }) => {
    this.setState({
      generatingNames: true,
      selectedPersonnels: [],
      generationErrors: []
    });

    const { date, pointSystem } = this.state;
    const data = {
      date: moment(date, 'DDMMYY', true).format('DD-MM-YYYY'),
      pointSystemId: pointSystem,
      ranks,
      platoons
    };
    if (pQty > 0) {
      data.pioneers = pQty;
    }
    if (wsQty > 0) {
      data.wspecs = wsQty;
    }
    if (statuses.length > 0) {
      data.statusesNotAllowed = statuses;
    }
    try {
      const response = await EventsService.generateName(data);
      if (response.ok) {
        const personnels = response.data.map(person => person._id);
        this.setState({
          selectedPersonnels: personnels,
          generatingNames: false
        });
      } else if (response.status === 401) {
        this.setState({
          authenticated: false,
          generatingNames: false
        });
      } else {
        let errors = [];
        if (response.data.message) {
          errors.push(response.data.message);
        }

        if (response.data.errors) {
          errors = errors.concat(response.data.errors);
        }
        this.setState({
          generationErrors: errors,
          generatingNames: false
        });
      }
    } catch (error) {
      this.setState({
        generationErrors: [error.message],
        generatingNames: false
      });
    }
  };

  handleSubmit = () => {
    const {
      name,
      date,
      pointSystem,
      pointAllocation,
      selectedPersonnels
    } = this.state;
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

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  renderGenerationErrors = () => {
    const { generationErrors } = this.state;
    if (generationErrors.length <= 0) return null;

    return (
      <Row className="my-2">
        <Col>
          <Alert color="danger">
            {generationErrors.map(error => {
              return <p key={error}>{error}</p>;
            })}
          </Alert>
        </Col>
      </Row>
    );
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

  checkValidForm = () => {
    const {
      name,
      pointSystem,
      date,
      selectedPersonnels,
      pointAllocation
    } = this.state;
    if (name === '' || pointSystem === '' || date === '') {
      return false;
    }

    if (selectedPersonnels.length <= 0) {
      return false;
    }
    if (pointAllocation <= 0) {
      return false;
    }

    if (!moment(date, 'DDMMYY', true).isValid()) {
      return false;
    }

    return true;
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

    const {
      pointSystem,
      date,
      name,
      selectedPersonnels,
      pointAllocation,
      authenticated,
      generatingNames,
      redirectToEvents
    } = this.state;

    if (!authenticated) {
      return <Redirect to="/login" />;
    }

    if (redirectToEvents) {
      return <Redirect to="/events" />;
    }

    const generationErrors = this.renderGenerationErrors();
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
          {generationErrors}
          {Errors}
          <Row className="my-2">
            <Col>
              <h1>Add new event</h1>
            </Col>
          </Row>
          <EventForm
            pointIds={pointIds}
            points={points}
            pointSystem={pointSystem}
            date={date}
            handleChange={this.handleChange}
            name={name}
            pointAllocation={pointAllocation}
            isAdding={isAdding}
          />
          <Row>
            <Col className="d-flex justify-content-start align-items-center">
              <p className="font-weight-bold">
                Total Selected: {selectedPersonnels.length}
              </p>
            </Col>
            <Col className="d-flex justify-content-end align-items-center">
              <GenerateForm
                platoonIds={platoonIds}
                platoons={platoons}
                rankIds={rankIds}
                ranks={ranks}
                statusIds={statusIds}
                statuses={statuses}
                handleSubmit={this.handleGenerateForm}
                date={date}
              />
            </Col>
          </Row>
          {generatingNames && (
            <Row>
              <Col className="d-flex justify-content-center align-items-center flex-column">
                <Spinner color="primary" />
                <p>Generating names...</p>
              </Col>
            </Row>
          )}
          <Row className="my-2">
            <Col className="overflow-auto" style={{ maxHeight: '150px' }}>
              {selectedPersonnels.map(id => {
                const person = personnels[id];
                return (
                  <Row key={id}>
                    <Col>
                      <p>
                        {person.platoon.name} {person.rank.name} {person.name}
                      </p>
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              {isAdding ? (
                <>
                  <Spinner color="primary" />
                  <p>Adding...</p>
                </>
              ) : (
                <Button
                  size="lg"
                  className="w-100"
                  color="success"
                  disabled={!this.checkValidForm()}
                  onClick={this.handleSubmit}
                >
                  Create
                </Button>
              )}
            </Col>
          </Row>
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
  addEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  points: state.points.get('points'),
  pointIds: state.points.get('ids'),
  personnelIds: state.personnels.get('ids'),
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
