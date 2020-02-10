import React, { memo } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// SUB-PAGES
import All from './all';
import Add from './add';
import Single from './single';
import Delete from './delete';

export function Events() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={All} />
      <Route exact path={`${path}/add`} component={Add} />
      <Route exact path={`${path}/:eventId/delete`} component={Delete} />
      <Route exact path={`${path}/:eventId`} component={Single} />
    </Switch>
  );
}

export default memo(Events);
