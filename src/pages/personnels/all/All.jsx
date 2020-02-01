import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Alert, Spinner } from 'reactstrap';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PersonnelsTable from '../../../components/personnels/all/PersonnelsTable';
import Pagination from '../../../components/commons/Pagination';
import Search from '../../../components/personnels/all/Search';
import PersonnelModalDelete from '../../../components/personnels/all/PersonnelModalDelete';

import { deletePersonnel } from './actions';

class All extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rowsPerPage: 10,
      page: 1,
      search: '',
      selectedId: null,
      showDeleteModal: false
    };
  }

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

  onChangeSearch = e => {
    this.setState({
      search: e.target.value,
      page: 1
    });
  };

  setPage = number => {
    this.setState({
      page: number
    });
  };

  clearSearch = () => {
    this.setState({
      search: ''
    });
  };

  getPersonnels = () => {
    const { ids, personnels } = this.props;
    const { rowsPerPage, page, search } = this.state;
    const lastIndex = page * rowsPerPage;
    const firstIndex = lastIndex - rowsPerPage;
    if (search === '') {
      const shownIds = ids.slice(firstIndex, lastIndex);
      const shownPersonnels = shownIds.map(id => personnels[id]);
      return { shownPersonnels, ids };
    }

    // Handle search
    const idsToReturn = ids.filter(id => {
      const name = personnels[id].name.toLowerCase();
      const platoon = personnels[id].platoon.name.toLowerCase();
      const rank = personnels[id].rank.name.toLowerCase();
      const searchInput = search.toLowerCase();
      return (
        name.indexOf(searchInput) > -1 ||
        platoon.indexOf(searchInput) > -1 ||
        rank.indexOf(searchInput) > -1
      );
    });

    const shownIds = idsToReturn.slice(firstIndex, lastIndex);
    const shownPersonnels = shownIds.map(id => personnels[id]);

    return { shownPersonnels, ids: idsToReturn };
  };

  toggleDeleteModal = (id = null) => {
    this.setState(prevState => {
      return {
        showDeleteModal: !prevState.showDeleteModal,
        selectedId: id
      };
    });
  };

  handleDelete = () => {
    const { selectedId } = this.state;
    const { removePersonnel } = this.props;
    removePersonnel(selectedId);
    this.toggleDeleteModal();
  };

  getDeleteModal = () => {
    const { selectedId, showDeleteModal } = this.state;
    const { personnels } = this.props;
    if (!selectedId) return null;

    return (
      <PersonnelModalDelete
        onCancel={this.toggleDeleteModal}
        onDelete={this.handleDelete}
        onToggle={this.toggleDeleteModal}
        showModal={showDeleteModal}
        person={personnels[selectedId]}
      />
    );
  };

  render() {
    const {
      errors,
      actionInProgress,
      match: { path }
    } = this.props;
    const { rowsPerPage, search } = this.state;

    const { shownPersonnels, ids } = this.getPersonnels();
    const modal = this.getDeleteModal();

    return (
      <>
        <Helmet>
          <title>Personnels</title>P
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
          <Row className="my-2 justify-content-center align-items-center">
            <Col xs="9">
              <h1>Personnels</h1>
            </Col>
            <Col xs="3" className="d-flex justify-content-end">
              <Button tag={Link} to={`${path}/add`} color="success" size="md">
                Add
              </Button>
            </Col>
          </Row>
          <Row className="my-2 mx-1">
            <Search
              onChange={this.onChangeSearch}
              onClear={this.clearSearch}
              search={search}
            />
          </Row>
          <Row>
            <PersonnelsTable
              personnels={shownPersonnels}
              onDelete={this.toggleDeleteModal}
            />
          </Row>
          <Row className="justify-content-center align-items-center">
            <Pagination
              rowsPerPage={rowsPerPage}
              setPage={this.setPage}
              totalPosts={ids.length}
            />
          </Row>
        </Container>
      </>
    );
  }
}

All.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  personnels: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  actionInProgress: PropTypes.bool.isRequired,
  removePersonnel: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  ids: state.personnels.get('ids'),
  personnels: state.personnels.get('personnels'),
  errors: state.pages.personnels.all.get('errors'),
  actionInProgress: state.pages.personnels.all.get('actionInProgress')
});

const mapDispatchToProps = {
  removePersonnel: deletePersonnel
};

export default connect(mapStateToProps, mapDispatchToProps)(All);
