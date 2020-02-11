/* eslint-disable react/jsx-props-no-spreading */
import React, { memo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function AuthRoute({ component: Component, path }) {
  const isAuthenticated = useSelector(state =>
    state.auth.get('isAuthenticated')
  );

  return (
    <Route
      path={path}
      render={props => {
        if (isAuthenticated === undefined) {
          return null;
        }
        if (isAuthenticated) {
          return <Component {...props} />;
        }

        return <Redirect exact to="/" />;
      }}
    />
  );
}

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.object
  ]).isRequired,
  path: PropTypes.string.isRequired
};

export default memo(AuthRoute);
