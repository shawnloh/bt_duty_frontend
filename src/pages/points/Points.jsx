import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Button, Alert, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import AppLayout from '../shared/AppLayout';
import PointsTable from '../../components/points/PointsTable';
import PointModalEdit from '../../components/points/PointModalEdit';
import PointModalDelete from '../../components/points/PointModalDelete';
import PointModalAdd from '../../components/points/PointModalAdd';

import { addPoint, deletePoint, updatePoint } from './actions';

const modes = {
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  ADD: 'ADD'
};

export class Points extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      showModal: false,
      mode: null,
      newName: ''
    };
  }

  handleUpdate = () => {
    const { updatePoint: modifyPoint } = this.props;
    const { selectedId, newName } = this.state;
    modifyPoint(selectedId, newName);
    this.toggleModal();
  };

  handleDelete = () => {
    const { deletePoint: removePoint } = this.props;
    const { selectedId } = this.state;
    removePoint(selectedId);
    this.toggleModal();
  };

  handleAdd = () => {
    const { addPoint: createPoint } = this.props;
    const { newName } = this.state;
    createPoint(newName);
    this.toggleModal();
  };

  handleChange = e => {
    const name = e.target.value;
    this.setState({
      newName: name
    });
  };

  toggleModal = (mode = null, id = null) => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
        selectedId: id,
        mode,
        newName: ''
      };
    });
  };

  showErrors = () => {
    const { errors } = this.props;

    return (
      <Row>
        {errors.map(error => {
          return (
            <Alert key={error} color="danger" className="w-100">
              {error}
            </Alert>
          );
        })}
      </Row>
    );
  };

  getModal = () => {
    const { points } = this.props;
    const { showModal, selectedId, mode } = this.state;

    let modal = null;
    if (mode === modes.UPDATE) {
      modal = (
        <PointModalEdit
          point={points[selectedId].name}
          onCancel={this.toggleModal}
          onToggle={this.toggleModal}
          onChangeText={this.handleChange}
          showModal={showModal}
          onSave={this.handleUpdate}
        />
      );
    } else if (mode === modes.DELETE) {
      modal = (
        <PointModalDelete
          point={points[selectedId]}
          onCancel={this.toggleModal}
          onToggle={this.toggleModal}
          onDelete={this.handleDelete}
          showModal={showModal}
        />
      );
    } else if (mode === modes.ADD) {
      modal = (
        <PointModalAdd
          onCancel={this.toggleModal}
          onToggle={this.toggleModal}
          onSave={this.handleAdd}
          onChangeText={this.handleChange}
          showModal={showModal}
        />
      );
    }
    return modal;
  };

  render() {
    const { ids, points, errors, actionInProgress } = this.props;

    const modal = this.getModal();

    const shownPoints = ids.map(id => {
      return points[id];
    });

    return (
      <AppLayout>
        <Helmet>
          <title>Points</title>
        </Helmet>
        <Container>
          {modal}
          {errors.length > 0 && this.showErrors()}
          {actionInProgress && (
            <Row>
              <Alert color="primary" className="w-100">
                Action in progress <Spinner color="primary" size="sm" />
              </Alert>
            </Row>
          )}
          <Row className="my-2 mx-2">
            <Col xs="9">
              <h1>Points</h1>
            </Col>
            <Col xs="3">
              <Button
                color="success"
                size="md"
                onClick={() => this.toggleModal(modes.ADD)}
              >
                Add
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <PointsTable
                modes={modes}
                points={shownPoints}
                toggle={this.toggleModal}
              />
            </Col>
          </Row>
        </Container>
      </AppLayout>
    );
  }
}

Points.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  points: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  addPoint: PropTypes.func.isRequired,
  deletePoint: PropTypes.func.isRequired,
  updatePoint: PropTypes.func.isRequired,
  actionInProgress: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  ids: state.points.get('ids'),
  points: state.points.get('points'),
  errors: state.pages.points.get('errors'),
  actionInProgress: state.pages.points.get('actionInProgress')
});

const mapDispatchToProps = {
  addPoint,
  deletePoint,
  updatePoint
};

export default connect(mapStateToProps, mapDispatchToProps)(Points);
