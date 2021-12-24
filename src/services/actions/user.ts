import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED
} from '../types';
import { MAIN_API, setCookies, getCookie, retriableFetch } from '../../utils/constants';
import { AppThunk, AppDispatch } from '../reducers';
import { TRes, TUser, TRefresh } from '../../utils/types';

type TRegisterActions = { readonly type: typeof REGISTER_REQUEST | typeof REGISTER_SUCCESS | typeof REGISTER_FAILED };
type TLoginActions = {
  readonly type: typeof AUTH_REQUEST | typeof AUTH_SUCCESS | typeof AUTH_FAILED;
  payload?: TUser | null | undefined;
};
type TLogoutActions = { readonly type: typeof LOGOUT_REQUEST | typeof LOGOUT_SUCCESS | typeof LOGOUT_FAILED };
type TGetUserActions = {
  readonly type: typeof GET_USER_REQUEST | typeof GET_USER_SUCCESS | typeof GET_USER_FAILED;
  payload?: TUser;
};
type TUpdateUser = Omit<TGetUserActions, 'type'> & {
  readonly type: typeof USER_UPDATE_REQUEST | typeof USER_UPDATE_SUCCESS | typeof USER_UPDATE_FAILED;
};

export type TUserActions = TRegisterActions | TLoginActions | TLogoutActions | TGetUserActions | TUpdateUser;

export const register: AppThunk =
  ({ email, password, name, history }) =>
  (dispatch: AppDispatch) => {
    dispatch<TRegisterActions>({
      type: REGISTER_REQUEST
    });
    fetch(`${MAIN_API}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
      .then(res => {
        if (res.ok) return res.json();
        else return res.json().then(err => Promise.reject(err));
      })
      .then(res => {
        if (res.success) {
          dispatch<TRegisterActions>({ type: REGISTER_SUCCESS });
          history.push('/login');
        } else Promise.reject(res);
      })
      .catch(() => dispatch<TRegisterActions>({ type: REGISTER_FAILED }));
  };

export const login: AppThunk =
  ({ email, password, history }) =>
  (dispatch: AppDispatch) => {
    dispatch<TLoginActions>({ type: AUTH_REQUEST });
    fetch(`${MAIN_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => {
        if (res.ok) return res.json();
        else return res.json().then(err => Promise.reject(err));
      })
      .then(res => {
        if (res.success) {
          setCookies(res);
          dispatch<TLoginActions>({
            type: AUTH_SUCCESS,
            payload: res.user
          });
          history.push('/');
        } else Promise.reject(res);
      })
      .catch(() => dispatch<TLoginActions>({ type: AUTH_FAILED }));
  };

export const refresh = (): Promise<TRefresh> => {
  const refreshToken = getCookie('refreshToken');
  return fetch(`${MAIN_API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      token: `${refreshToken}`
    })
  }).then(res => {
    if (res.ok) return res.json();
    else return res.json().then(err => Promise.reject(err));
  });
};

export const logout: AppThunk = () => (dispatch: AppDispatch) => {
  const refreshToken = getCookie('refreshToken');
  dispatch<TLogoutActions>({ type: LOGOUT_REQUEST });
  fetch(`${MAIN_API}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      token: `${refreshToken}`
    })
  })
    .then(res => {
      if (res.ok) return res.json();
      else return res.json().then(err => Promise.reject(err));
    })
    .then(res => {
      if (res.success) dispatch<TLogoutActions>({ type: LOGOUT_SUCCESS });
      else Promise.reject(res);
    })
    .catch(() => dispatch<TLogoutActions>({ type: LOGOUT_FAILED }));
};

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
  const accessToken = getCookie('accessToken');
  dispatch<TGetUserActions>({ type: GET_USER_REQUEST });
  retriableFetch<TRes>(`${MAIN_API}/auth/user`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(res => {
      if (res.success)
        dispatch<TGetUserActions>({
          type: GET_USER_SUCCESS,
          payload: res.user
        });
      else Promise.reject(res);
    })
    .catch(() => dispatch<TGetUserActions>({ type: GET_USER_FAILED }));
};

export const updateUser: AppThunk =
  ({ email, password, name }) =>
  (dispatch: AppDispatch) => {
    const accessToken = getCookie('accessToken');
    dispatch<TUpdateUser>({ type: USER_UPDATE_REQUEST });
    retriableFetch<TRes>(`${MAIN_API}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
      .then(res => {
        if (res.success)
          dispatch<TUpdateUser>({
            type: USER_UPDATE_SUCCESS,
            payload: res.user
          });
        else Promise.reject(res);
      })
      .catch(() => dispatch<TUpdateUser>({ type: USER_UPDATE_FAILED }));
  };
