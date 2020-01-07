/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function AuthRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.get('isAuthenticated')
});

export default connect(mapStateToProps)(AuthRoute);

// export default AuthRoute;
