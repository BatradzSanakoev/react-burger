import React, { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

type TProtectedRouteProps = {
  children: ReactNode;
  path: string;
};

export const ProtectedRoute = ({ children, ...rest }: TProtectedRouteProps) => {
  const { isAuth, getUserRequest } = useSelector(state => state.user);

  if (getUserRequest) return null;
  return (
    <Route {...rest} render={({ location }) => (isAuth ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />)} exact />
  );
};
