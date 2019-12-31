import React, { PureComponent } from 'react';
// import { connect } from 'react-redux'
import { Route } from 'react-router-dom';

import DashboardPage from './pages/dashboard';

class AppLayout extends PureComponent {
  render() {
    return (
      <div>
        hello
        <Route path="/app/dashboard" component={DashboardPage} />
      </div>
    );
  }
}

export default AppLayout;
