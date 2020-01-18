import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Button, Alert, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import AppLayout from '../shared/AppLayout';
import PlatoonsTable from '../../components/platoons/PlatoonsTable';
import PlatoonModalEdit from '../../components/platoons/PlatoonModalEdit';
import PlatoonModalDelete from '../../components/platoons/PlatoonModalDelete';
import PlatoonModalAdd from '../../components/platoons/PlatoonModalAdd';

import { addPlatoon, deletePlatoon, updatePlatoon } from './actions';

const modes = {
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  ADD: 'ADD'
};

export class Platoons extends PureComponent {
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
    const { updatePlatoon: modifyPlatoon } = this.props;
    const { selectedId, newName } = this.state;
    modifyPlatoon(selectedId, newName);
    this.toggleModal();
  };

  handleDelete = () => {
    const { deletePlatoon: removePlatoon } = this.props;
    const { selectedId } = this.state;
    removePlatoon(selectedId);
    this.toggleModal();
  };

  handleAdd = () => {
    const { addPlatoon: createPlatoon } = this.props;
    const { newName } = this.state;
    createPlatoon(newName);
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
    let modal = null;
    const { showModal, selectedId, mode } = this.state;
    const { platoons } = this.props;
    if (mode === modes.UPDATE) {
      modal = (
        <PlatoonModalEdit
          platoon={platoons[selectedId].name}
          onCancel={this.toggleModal}
          onToggle={this.toggleModal}
          onChangeText={this.handleChange}
          showModal={showModal}
          onSave={this.handleUpdate}
        />
      );
    } else if (mode === modes.DELETE) {
      modal = (
        <PlatoonModalDelete
          platoon={platoons[selectedId]}
          onCancel={this.toggleModal}
          onToggle={this.toggleModal}
          onDelete={this.handleDelete}
          showModal={showModal}
        />
      );
    } else if (mode === modes.ADD) {
      modal = (
        <PlatoonModalAdd
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
    const { ids, platoons, errors, actionInProgress } = this.props;
    const modal = this.getModal();

    const shownPlatoons = ids.map(id => {
      return platoons[id];
    });

    return (
      <AppLayout>
        <Helmet>
          <title>Platoons</title>
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
          <Row className="my-2 mx-2 d-flex justify-content-center align-items-center">
            <Col xs="9">
              <h1>Platoons</h1>
            </Col>
            <Col xs="3" className="d-flex justify-content-end">
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
              <PlatoonsTable
                modes={modes}
                platoons={shownPlatoons}
                toggle={this.toggleModal}
              />
            </Col>
          </Row>
        </Container>
      </AppLayout>
    );
  }
}

Platoons.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  platoons: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  actionInProgress: PropTypes.bool.isRequired,
  addPlatoon: PropTypes.func.isRequired,
  deletePlatoon: PropTypes.func.isRequired,
  updatePlatoon: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ids: state.platoons.get('ids'),
  platoons: state.platoons.get('platoons'),
  errors: state.pages.platoons.get('errors'),
  actionInProgress: state.pages.platoons.get('actionInProgress')
});

const mapDispatchToProps = {
  addPlatoon,
  deletePlatoon,
  updatePlatoon
};

export default connect(mapStateToProps, mapDispatchToProps)(Platoons);
