import React, { PureComponent } from 'react';
import { Spinner, Row, Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppLayout from '../../pages/shared/AppLayout';

class Loading extends PureComponent {
  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return (
        <AppLayout>
          <Container className="d-flex h-100 justify-content-center align-items-center flex-column">
            <Row>
              <Spinner type="grow" color="primary" />
              <Spinner type="grow" color="secondary" />
              <Spinner type="grow" color="success" />
              <Spinner type="grow" color="danger" />
              <Spinner type="grow" color="warning" />
              <Spinner type="grow" color="info" />
              <Spinner type="grow" color="dark" />
            </Row>
            <Row>Loading Page...</Row>
          </Container>
        </AppLayout>
      );
    }
    return (
      <Container className="d-flex h-100 justify-content-center align-items-center flex-column">
        <Row>
          <Spinner type="grow" color="primary" />
          <Spinner type="grow" color="secondary" />
          <Spinner type="grow" color="success" />
          <Spinner type="grow" color="danger" />
          <Spinner type="grow" color="warning" />
          <Spinner type="grow" color="info" />
          <Spinner type="grow" color="dark" />
        </Row>
        <Row>Loading Page...</Row>
      </Container>
    );
  }
}

Loading.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.get('isAuthenticated')
});

export default connect(mapStateToProps)(Loading);
