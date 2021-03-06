import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { isAuthenticated } from './auth';


const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    exact
    {...rest}
    render={props =>
      !isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{ pathname: ROUTES.MAIN, state: { from: props.location } }}
          />
        )
    }
  />
)

export default LoginRoute;
