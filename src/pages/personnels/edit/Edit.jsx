import React, { PureComponent } from 'react';
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Alert
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import EditForm from '../../../components/personnels/edit/EditForm';
import { updatePerson } from './actions';
import ActionAlert from '../../../components/commons/ActionAlert';

export class Edit extends PureComponent {
  componentDidUpdate(prevProps) {
    const { isUpdating, errors } = this.props;
    if (prevProps.isUpdating && !isUpdating && errors.length === 0) {
      Swal.fire({
        title: 'Updated!',
        text: 'Successfully Updated!',
        icon: 'success',
        timer: 2000
      });
    }
  }

  handleEdit = values => {
    const {
      match: {
        params: { personnelId }
      },
      updateDetails
    } = this.props;

    const personToUpdate = {
      ...values,
      personnelId
    };
    updateDetails(personToUpdate);
  };

  renderErrors = () => {
    const { errors } = this.props;

    return (
      <Row className="my-2 flex-column">
        <Col>
          <Alert color="danger" className="w-100">
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
      match: {
        params: { personnelId }
      },
      personnels,
      platoons,
      platoonIds,
      ranks,
      rankIds,
      errors,
      isUpdating
    } = this.props;

    const person = personnels[personnelId];
    if (!person) {
      return <Redirect to="/personnels" />;
    }
    return (
      <Container>
        <Row className="my-2 justify-content-center align-items-center">
          <Col>
            <Breadcrumb tag="nav" listTag="div">
              <BreadcrumbItem tag={Link} to="/personnels">
                Personnels
              </BreadcrumbItem>
              <BreadcrumbItem tag="span">Details</BreadcrumbItem>
              <BreadcrumbItem tag={Link} to={`/personnels/${personnelId}`}>
                {person.name}
              </BreadcrumbItem>
              <BreadcrumbItem active tag="span">
                Edit Details
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        {errors.length > 0 && this.renderErrors()}
        {isUpdating && <ActionAlert name="Updating" />}
        <Row>
          <Col>
            <h1>Editing {person.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <EditForm
              handleSubmit={this.handleEdit}
              person={person}
              platoonIds={platoonIds}
              platoons={platoons}
              rankIds={rankIds}
              ranks={ranks}
              isUpdating={isUpdating}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

Edit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      personnelId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  personnels: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
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
  ranks: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  rankIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  platoons: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  platoonIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  isUpdating: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isUpdating: state.pages.personnels.edit.get('isUpdating'),
  errors: state.pages.personnels.edit.get('errors'),
  personnels: state.personnels.get('personnels'),
  rankIds: state.ranks.get('ids'),
  ranks: state.ranks.get('ranks'),
  platoonIds: state.platoons.get('ids'),
  platoons: state.platoons.get('platoons')
});

const mapDispatchToProps = {
  updateDetails: updatePerson
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
