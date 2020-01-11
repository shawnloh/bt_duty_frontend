import React, { PureComponent } from 'react';
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

import LoginPage from './pages/login';
import LoadingPage from './pages/loading';
import DashboardPage from './pages/dashboard';
import RanksPage from './pages/ranks';
import PlatoonsPage from './pages/platoons';
import PointsPage from './pages/points';

class App extends PureComponent {
  componentDidMount() {
    const { isAuthenticated } = this.props;
    isAuthenticated();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Redirect from="/" to="/login" exact />
          <Route path="/login" exact component={LoginPage} />
          <AuthRoute path="/app" exact component={LoadingPage} />
          <AuthRoute path="/dashboard" exact component={DashboardPage} />
          <AuthRoute path="/ranks" exact component={RanksPage} />
          <AuthRoute path="/platoons" exact component={PlatoonsPage} />
          <AuthRoute path="/points" exact component={PointsPage} />
        </Switch>
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
