import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Button, Col, Label, Input } from 'reactstrap';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EventsTable from '../../../components/events/all/EventsTable';
import Pagination from '../../../components/commons/Pagination';
import AppLayout from '../../shared/AppLayout';

export class All extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rowsPerPage: 10,
      page: 1,
      filterBy: 'ALL'
    };
  }

  getEvents = () => {
    const { ids, events } = this.props;
    const { rowsPerPage, page, filterBy } = this.state;
    const lastIndex = page * rowsPerPage;
    const firstIndex = lastIndex - rowsPerPage;
    if (filterBy === 'ALL') {
      const shownIds = ids.slice(firstIndex, lastIndex);
      const shownEvents = shownIds.map(id => events[id]);
      return { shownEvents, ids };
    }

    const filteredIds = ids.filter(
      id => events[id].pointSystem.name === filterBy
    );
    const shownIds = filteredIds.slice(firstIndex, lastIndex);
    const shownEvents = shownIds.map(id => events[id]);
    return { shownEvents, ids: filteredIds };
  };

  setPage = page => {
    this.setState({
      page
    });
  };

  filter = e => {
    this.setState({
      filterBy: e.target.value
    });
  };

  render() {
    const {
      pointIds,
      points,
      match: { path }
    } = this.props;
    const { rowsPerPage } = this.state;
    const { shownEvents, ids } = this.getEvents();

    return (
      <AppLayout>
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
                Note: Past events that have expired will automatically be
                removed, points will be retained.
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
                onChange={this.filter}
              >
                <option value="ALL">ALL</option>
                {pointIds.map(id => (
                  <option key={id} value={points[id].name}>
                    {points[id].name}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
          <Row>
            <EventsTable events={shownEvents} path={path} />
          </Row>
          <Row className="justify-content-center align-items-center">
            <Pagination
              rowsPerPage={rowsPerPage}
              setPage={this.setPage}
              totalPosts={ids.length}
            />
          </Row>
        </Container>
      </AppLayout>
    );
  }
}

All.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  events: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  pointIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  points: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  ids: state.events.get('ids'),
  events: state.events.get('events'),
  pointIds: state.points.get('ids'),
  points: state.points.get('points')
});

export default connect(mapStateToProps)(All);
