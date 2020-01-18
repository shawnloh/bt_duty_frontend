import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// SUB-PAGES
import All from './all';
import Add from './add';
import Single from './single';
import Delete from './delete';

export class Events extends PureComponent {
  render() {
    const {
      match: { path }
    } = this.props;

    return (
      <Switch>
        <Route exact path={path} component={All} />
        <Route exact path={`${path}/add`} component={Add} />
        <Route exact path={`${path}/:eventId/delete`} component={Delete} />
        <Route exact path={`${path}/:eventId`} component={Single} />
      </Switch>
    );
  }
}

Events.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};

export default Events;
