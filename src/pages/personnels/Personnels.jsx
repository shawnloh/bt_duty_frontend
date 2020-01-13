import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppLayout from '../shared/AppLayout';
// SUB-PAGES
import All from './all';
import Add from './add';

export class Personnels extends PureComponent {
  render() {
    const {
      match: { path }
    } = this.props;
    return (
      <AppLayout>
        <Switch>
          <Route exact path={path} component={All} />
          <Route path={`${path}/add`} component={Add} />
        </Switch>
      </AppLayout>
    );
  }
}

Personnels.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};

export default Personnels;
