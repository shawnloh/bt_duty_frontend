/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute({ component: Component, token, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (token !== '') {
          return <Component {...props} />;
        }

        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
}

export default AuthRoute;
