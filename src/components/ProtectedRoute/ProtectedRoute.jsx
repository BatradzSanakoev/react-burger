import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../services/actions/user';

export const ProtectedRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const { isAuth } = useSelector(state => state.user);

  const init = () => {
    dispatch(getUser());
    setUserLoaded(true);
  };

  useEffect(() => init(), []);

  if (!isUserLoaded) return null;

  return <Route {...rest} render={({ location }) => (isAuth ? children : <Redirect to={{ pathname: '/profile', state: { from: location } }} />)} />;
};