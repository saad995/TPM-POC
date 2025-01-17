import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from 'Lib/Net/Auth';
import PropTypes from 'prop-types';

const PublicRoute = ({ component: Component, ...rest }) => {
  return (<Route
  {...rest}
    render={(props) =>
      Auth.CurrentUser().IsAuthenticated ? (
        <Redirect
          to={{
            pathname: '/Dashboard',
            state: { from: props.location }
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />)

  };

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  location: PropTypes.object
};

export default PublicRoute;
