import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Button, Alert, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import AppLayout from '../shared/AppLayout';
import StatusesTable from '../../components/statuses/StatusesTable';
import StatusModalEdit from '../../components/statuses/StatusModalEdit';
import StatusModalDelete from '../../components/statuses/StatusModalDelete';
import StatusModalAdd from '../../components/statuses/StatusModalAdd';

import { addStatus, deleteStatus, updateStatus } from './actions';

const modes = {
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  ADD: 'ADD'
};

export class Statuses extends PureComponent {
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
    const { updateStatus: modifyStatus } = this.props;
    const { selectedId, newName } = this.state;
    modifyStatus(selectedId, newName);
    this.toggleModal();
  };

  handleDelete = () => {
    const { deleteStatus: removeStatus } = this.props;
    const { selectedId } = this.state;
    removeStatus(selectedId);
    this.toggleModal();
  };

  handleAdd = () => {
    const { addStatus: createStatus } = this.props;
    const { newName } = this.state;
    createStatus(newName);
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
    const { statuses } = this.props;
    if (mode === modes.UPDATE) {
      modal = (
        <StatusModalEdit
          status={statuses[selectedId].name}
          onCancel={this.toggleModal}
          onToggle={this.toggleModal}
          onChangeText={this.handleChange}
          showModal={showModal}
          onSave={this.handleUpdate}
        />
      );
    } else if (mode === modes.DELETE) {
      modal = (
        <StatusModalDelete
          status={statuses[selectedId]}
          onCancel={this.toggleModal}
          onToggle={this.toggleModal}
          onDelete={this.handleDelete}
          showModal={showModal}
        />
      );
    } else if (mode === modes.ADD) {
      modal = (
        <StatusModalAdd
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
    const { ids, statuses, errors, actionInProgress } = this.props;
    const modal = this.getModal();

    const shownStatuses = ids.map(id => {
      return statuses[id];
    });

    return (
      <AppLayout>
        <Helmet>
          <title>Statuses</title>
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
              <h1>Statuses</h1>
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
              <StatusesTable
                modes={modes}
                statuses={shownStatuses}
                toggle={this.toggleModal}
              />
            </Col>
          </Row>
        </Container>
      </AppLayout>
    );
  }
}

Statuses.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  statuses: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  actionInProgress: PropTypes.bool.isRequired,
  addStatus: PropTypes.func.isRequired,
  deleteStatus: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ids: state.statuses.get('ids'),
  statuses: state.statuses.get('statuses'),
  errors: state.pages.statuses.get('errors'),
  actionInProgress: state.pages.statuses.get('actionInProgress')
});

const mapDispatchToProps = {
  addStatus,
  deleteStatus,
  updateStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(Statuses);
