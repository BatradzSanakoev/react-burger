import React, { useEffect, useState, ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';

type TProtectedRouteProps = {
  children: ReactNode;
  path: string;
};

type TAuthType = {
  registerRequest: boolean;
  registerError: boolean;
  authRequest: boolean;
  authError: boolean;
  logoutRequest: boolean;
  logoutError: boolean;
  errorText: string | null;
  getUserRequest: boolean;
  getUserError: boolean;
  getUserLoaded: boolean;
  userUpdateRequest: boolean;
  userUpdateError: boolean;
  isAuth: boolean;
  user: any;
};

export const ProtectedRoute = ({ children, ...rest }: TProtectedRouteProps) => {
  const { isAuth, getUserRequest } = useSelector((state: Omit<RootState, 'user'> & { user: TAuthType }) => state.user);

  if (getUserRequest) return null;
  return <Route {...rest} render={({ location }) => (isAuth ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />)} />;
};
