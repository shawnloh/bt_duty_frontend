import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { addPersonnel } from './actions';
import AddForm from '../../../components/personnels/add/AddForm';
import ActionAlert from '../../../components/commons/ActionAlert';

export class AddPersonnel extends PureComponent {
  componentDidUpdate(prevProps) {
    const { actionInProgress, errors, history } = this.props;
    if (
      prevProps.actionInProgress &&
      !actionInProgress &&
      errors.length === 0
    ) {
      history.replace('/personnels');
    }
  }

  showErrors = () => {
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

  handleSubmit = ({ name, platoon, rank }) => {
    const { createPersonnel } = this.props;
    createPersonnel(name, platoon, rank);
  };

  render() {
    const {
      rankIds,
      ranks,
      platoonIds,
      platoons,
      actionInProgress,
      errors,
      success
    } = this.props;
    let emptyRankAndPlatoonError = null;
    if (rankIds.length === 0 || platoonIds.length === 0) {
      emptyRankAndPlatoonError = (
        <Alert color="danger">
          <Link to="/ranks">Rank</Link> / <Link to="/platoons">Platoon</Link> is
          needed to create personnels
        </Alert>
      );
    }
    return (
      <>
        <Helmet>
          <title>Add Personnel</title>
        </Helmet>
        <Container>
          <Row className="my-2 justify-content-center align-items-center">
            <Col>
              <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem tag={Link} to="/personnels">
                  Personnels
                </BreadcrumbItem>
                <BreadcrumbItem active tag="span">
                  Add
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          {emptyRankAndPlatoonError && (
            <Row className="my-2">
              <Col>{emptyRankAndPlatoonError}</Col>
            </Row>
          )}
          {errors.length > 0 && this.showErrors()}
          {actionInProgress && (
            <Row className="my-2">
              <Col>
                <ActionAlert name="Adding" />
              </Col>
            </Row>
          )}
          {success && (
            <Row className="my-2">
              <Col>
                <Alert color="success" className="w-100">
                  Successfully added personnel
                </Alert>
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <AddForm
                handleSubmit={this.handleSubmit}
                platoonIds={platoonIds}
                platoons={platoons}
                rankIds={rankIds}
                ranks={ranks}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

AddPersonnel.propTypes = {
  rankIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  platoonIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  ranks: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    })
  }).isRequired,
  platoons: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    })
  }).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  actionInProgress: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  createPersonnel: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  rankIds: state.ranks.get('ids'),
  ranks: state.ranks.get('ranks'),
  platoonIds: state.platoons.get('ids'),
  platoons: state.platoons.get('platoons'),
  errors: state.pages.personnels.add.get('errors'),
  actionInProgress: state.pages.personnels.add.get('actionInProgress'),
  success: state.pages.personnels.add.get('success')
});

const mapDispatchToProps = {
  createPersonnel: addPersonnel
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPersonnel);
