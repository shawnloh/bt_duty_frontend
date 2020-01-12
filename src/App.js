import React, { PureComponent, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkAuth } from './actions/authActions';

import AuthRoute from './AuthRoute';

import Loading from './components/commons/Loading';

const LoginPage = lazy(() => import('./pages/login'));
const LoadingPage = lazy(() => import('./pages/loading'));
const DashboardPage = lazy(() => import('./pages/dashboard'));
const RanksPage = lazy(() => import('./pages/ranks'));
const PlatoonsPage = lazy(() => import('./pages/platoons'));
const PointsPage = lazy(() => import('./pages/points'));
const StatusesPage = lazy(() => import('./pages/statuses'));
const PersonnelsPage = lazy(() => import('./pages/personnels'));

class App extends PureComponent {
  componentDidMount() {
    const { isAuthenticated } = this.props;
    isAuthenticated();
  }

  render() {
    return (
      <Router>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Redirect from="/" to="/login" exact />
            <Route path="/login" component={LoginPage} />
            <AuthRoute path="/app" component={LoadingPage} />
            <AuthRoute path="/dashboard" component={DashboardPage} />
            <AuthRoute path="/ranks" component={RanksPage} />
            <AuthRoute path="/platoons" component={PlatoonsPage} />
            <AuthRoute path="/points" component={PointsPage} />
            <AuthRoute path="/statuses" component={StatusesPage} />
            <AuthRoute path="/personnels" component={PersonnelsPage} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  isAuthenticated: checkAuth
};

export default connect(null, mapDispatchToProps)(App);
