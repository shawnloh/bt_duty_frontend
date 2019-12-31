import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import DashboardPage from './pages/dashboard';
import LoginPage from './pages/login';
import AuthRoute from './AuthRoute';
import AppLayout from './AppLayout';

const App = ({ token }) => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <AuthRoute path="/app" component={AppLayout} token={token} />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  token: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  token: state.user.get('token')
});
export default connect(mapStateToProps)(App);
