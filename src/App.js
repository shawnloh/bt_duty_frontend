import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import DashboardPage from './pages/dashboard';
import LoginPage from './pages/login';
import AuthRoute from './AuthRoute';

const App = ({ isAuthenticated }) => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <AuthRoute
          path="/dashboard"
          component={DashboardPage}
          isAuthenticated={isAuthenticated}
        />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.get('isAuthenticated')
});
export default connect(mapStateToProps)(App);
