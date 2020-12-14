import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth';

function PrivateRoute({ component: Component, ...rest }) {
  const { getAccessToken } = useAuth();

  const tokens = getAccessToken();

  return (
    <Route
      {...rest}
      render={(props) =>
        tokens ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              referer: {
                state: props.location
              }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
