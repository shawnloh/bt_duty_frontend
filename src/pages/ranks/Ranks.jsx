import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import AppLayout from '../shared/AppLayout';
import RanksTable from '../../components/ranks/RanksTable';
import RankModalEdit from '../../components/ranks/RankModalEdit';
import RankModalDelete from '../../components/ranks/RankModalDelete';
import RankModalAdd from '../../components/ranks/RankModalAdd';

import { addRank, deleteRank, updateRank } from './actions';

const modes = {
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  ADD: 'ADD'
};

export class Ranks extends Component {
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
    const { updateRank: modifyRank } = this.props;
    const { selectedId, newName } = this.state;
    modifyRank(selectedId, newName);
    this.toggleModal();
  };

  handleDelete = () => {
    const { deleteRank: removeRank } = this.props;
    const { selectedId } = this.state;
    removeRank(selectedId);
    this.toggleModal();
  };

  handleAdd = () => {
    const { addRank: createRank } = this.props;
    const { newName } = this.state;
    createRank(newName);
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

  getModal = (mode, ranks, selectedId, showModal) => {
    let modal = null;
    if (mode === modes.UPDATE) {
      modal = (
        <RankModalEdit
          rank={ranks[selectedId].name}
          onCancel={this.toggleModal}
          onToggle={this.toggleModal}
          onChangeText={this.handleChange}
          showModal={showModal}
          onSave={this.handleUpdate}
        />
      );
    } else if (mode === modes.DELETE) {
      modal = (
        <RankModalDelete
          rank={ranks[selectedId]}
          onCancel={this.toggleModal}
          onToggle={this.toggleModal}
          onDelete={this.handleDelete}
          showModal={showModal}
        />
      );
    } else if (mode === modes.ADD) {
      modal = (
        <RankModalAdd
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
    const { ids, ranks, errors } = this.props;
    const { showModal, selectedId, mode } = this.state;

    const modal = this.getModal(mode, ranks, selectedId, showModal);

    const shownRanks = ids.map(id => {
      return ranks[id];
    });

    return (
      <AppLayout>
        <Helmet>
          <title>Ranks</title>
        </Helmet>
        <Container>
          {modal}
          {errors.length > 0 && this.showErrors()}
          <Row className="my-2 mx-2">
            <Col xs="9">
              <h1>Ranks</h1>
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
              <RanksTable
                modes={modes}
                ranks={shownRanks}
                toggle={this.toggleModal}
              />
            </Col>
          </Row>
        </Container>
      </AppLayout>
    );
  }
}

Ranks.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  ranks: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  addRank: PropTypes.func.isRequired,
  deleteRank: PropTypes.func.isRequired,
  updateRank: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ids: state.ranks.get('ids'),
  ranks: state.ranks.get('ranks'),
  errors: state.pages.ranks.get('errors')
});

const mapDispatchToProps = {
  addRank,
  deleteRank,
  updateRank
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranks);
