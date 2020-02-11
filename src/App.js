import React, { memo, Suspense, lazy, useCallback, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from './actions/authActions';
import { loadApp } from './pages/loading/actions';

import AuthRoute from './AuthRoute';

import LoadingFallback from './components/commons/Loading';
import NotFoundPage from './pages/NotFoundPage';
import LogoutPage from './pages/logout/LogoutPage';

const LoginPage = lazy(() => import('./pages/login'));
const LoadingPage = lazy(() => import('./pages/loading'));
const DashboardPage = lazy(() => import('./pages/dashboard'));
const RanksPage = lazy(() => import('./pages/ranks'));
const PlatoonsPage = lazy(() => import('./pages/platoons'));
const PointsPage = lazy(() => import('./pages/points'));
const StatusesPage = lazy(() => import('./pages/statuses'));
const PersonnelsPage = lazy(() => import('./pages/personnels'));
const EventsPage = lazy(() => import('./pages/events'));

function App() {
  const isAuthenticated = useSelector(state =>
    state.auth.get('isAuthenticated')
  );
  const appLoaded = useSelector(state => state.pages.loading.get('appLoaded'));
  const dispatch = useDispatch();

  const checkAuthenticated = useCallback(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  const reloadApp = useCallback(() => {
    dispatch(loadApp());
  }, [dispatch]);

  useEffect(() => {
    checkAuthenticated();
  }, [checkAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && !appLoaded) {
      reloadApp();
    }
  }, [appLoaded, isAuthenticated, reloadApp]);

  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <Redirect from="/" to="/login" exact />
          <Route path="/login" component={LoginPage} />
          <AuthRoute path="/app" component={LoadingPage} />
          <AuthRoute path="/dashboard" component={DashboardPage} />
          <AuthRoute path="/events" component={EventsPage} />
          <AuthRoute path="/ranks" component={RanksPage} />
          <AuthRoute path="/platoons" component={PlatoonsPage} />
          <AuthRoute path="/points" component={PointsPage} />
          <AuthRoute path="/statuses" component={StatusesPage} />
          <AuthRoute path="/personnels" component={PersonnelsPage} />
          <AuthRoute path="/logout" component={LogoutPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default memo(App);
