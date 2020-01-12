import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Spinner } from 'reactstrap';
import { loadApp as loadAppAction } from './actions';

class LoadingPage extends PureComponent {
  componentDidMount() {
    const { loadApp, appLoaded, isAuthenticated } = this.props;
    if (!appLoaded && isAuthenticated) {
      loadApp();
    }
  }

  render() {
    const { isLoading, appLoaded } = this.props;
    if (!isLoading && appLoaded) {
      return <Redirect to="/dashboard" exact />;
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
        <Row>Loading Application</Row>
      </Container>
    );
  }
}

LoadingPage.propTypes = {
  loadApp: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  appLoaded: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.pages.loading.get('isLoading'),
  appLoaded: state.pages.loading.get('appLoaded'),
  isAuthenticated: state.auth.get('isAuthenticated')
});

const mapDispatchToProps = {
  loadApp: loadAppAction
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);
