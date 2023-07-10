import React , { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../store/UserContext';

function PrivateRoute({ component: Component, ...rest }) {
  const userCtx = useContext(UserContext);
    const isAuthenticated = userCtx.uuid ? true : false;
    console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;