import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthRoute from './AuthRoute';

import LoginPage from './pages/login';
import LoadingPage from './pages/loading';
import DashboardPage from './pages/dashboard';
import RanksPage from './pages/ranks';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <AuthRoute path="/app" component={LoadingPage} />
        <AuthRoute path="/dashboard" component={DashboardPage} />
        <AuthRoute path="/ranks" component={RanksPage} />
      </Switch>
    </Router>
  );
};

export default App;
