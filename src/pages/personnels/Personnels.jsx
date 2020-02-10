import React, { memo } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Layout from '../shared/AppLayout';
// SUB-PAGES
import All from './all';
import Add from './add';
import Single from './single';
import Edit from './edit';

export function Personnels() {
  const { path } = useRouteMatch();

  return (
    <Layout>
      <Switch>
        <Route exact path={path} component={All} />
        <Route path={`${path}/add`} component={Add} />
        <Route path={`${path}/:personnelId`} exact component={Single} />
        <Route path={`${path}/:personnelId/edit`} component={Edit} />
      </Switch>
    </Layout>
  );
}

export default memo(Personnels);
