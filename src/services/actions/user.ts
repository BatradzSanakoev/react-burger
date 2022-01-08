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
import { MAIN_API, setCookies, getCookie, retriableFetch, deleteCookies } from '../../utils/constants';
import { AppThunk, AppDispatch } from '../reducers';
import { TRes, TUser, TRefresh } from '../../utils/types';

type TRegisterActionRequest = { readonly type: typeof REGISTER_REQUEST };
type TRegisterActionSuccess = { readonly type: typeof REGISTER_SUCCESS };
type TRegisterActionFailed = { readonly type: typeof REGISTER_FAILED };

type TLoginActionRequest = { readonly type: typeof AUTH_REQUEST };
type TLoginActionSuccess = { readonly type: typeof AUTH_SUCCESS; readonly payload: TUser };
type TLoginActionFailed = { readonly type: typeof AUTH_FAILED };

type TLogoutActionRequest = { readonly type: typeof LOGOUT_REQUEST };
type TLogoutActionSuccess = { readonly type: typeof LOGOUT_SUCCESS };
type TLogoutActionFailed = { readonly type: typeof LOGOUT_FAILED };

type TGetUserActionRequest = { readonly type: typeof GET_USER_REQUEST };
type TGetUserActionSuccess = { readonly type: typeof GET_USER_SUCCESS; payload: TUser };
type TGetUserActionFailed = { readonly type: typeof GET_USER_FAILED };

type TUpdateUserActionRequest = { readonly type: typeof USER_UPDATE_REQUEST };
type TUpdateUserActionSuccess = { readonly type: typeof USER_UPDATE_SUCCESS; payload: TUser };
type TUpdateUserActionFailed = { readonly type: typeof USER_UPDATE_FAILED };

export type TUserActions =
  | TRegisterActionRequest
  | TRegisterActionSuccess
  | TRegisterActionFailed
  | TLoginActionRequest
  | TLoginActionSuccess
  | TLoginActionFailed
  | TLogoutActionRequest
  | TLogoutActionSuccess
  | TLogoutActionFailed
  | TGetUserActionRequest
  | TGetUserActionSuccess
  | TGetUserActionFailed
  | TUpdateUserActionRequest
  | TUpdateUserActionSuccess
  | TUpdateUserActionFailed;

const registerRequest = (): TRegisterActionRequest => {
  return { type: REGISTER_REQUEST };
};

const registerSuccess = (): TRegisterActionSuccess => {
  return { type: REGISTER_SUCCESS };
};

const registerFailed = (): TRegisterActionFailed => {
  return { type: REGISTER_FAILED };
};

const loginRequest = (): TLoginActionRequest => {
  return { type: AUTH_REQUEST };
};

const loginSuccess = (user: TUser): TLoginActionSuccess => {
  return { type: AUTH_SUCCESS, payload: user };
};

const loginFailed = (): TLoginActionFailed => {
  return { type: AUTH_FAILED };
};

const logoutRequest = (): TLogoutActionRequest => {
  return { type: LOGOUT_REQUEST };
};

const logoutSuccess = (): TLogoutActionSuccess => {
  return { type: LOGOUT_SUCCESS };
};

const logoutFailed = (): TLogoutActionFailed => {
  return { type: LOGOUT_FAILED };
};

const getUserRequest = (): TGetUserActionRequest => {
  return { type: GET_USER_REQUEST };
};

const getUserSuccess = (user: TUser): TGetUserActionSuccess => {
  return { type: GET_USER_SUCCESS, payload: user };
};

const getUserFailed = (): TGetUserActionFailed => {
  return { type: GET_USER_FAILED };
};

const updateUserRequest = (): TUpdateUserActionRequest => {
  return { type: USER_UPDATE_REQUEST };
};

const updateUserSuccess = (user: TUser): TUpdateUserActionSuccess => {
  return { type: USER_UPDATE_SUCCESS, payload: user };
};

const updateUserFailed = (): TUpdateUserActionFailed => {
  return { type: USER_UPDATE_FAILED };
};

export const register: AppThunk =
  ({ email, password, name, history }) =>
  (dispatch: AppDispatch) => {
    dispatch(registerRequest());
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
          dispatch(registerSuccess());
          history.push('/login');
        } else Promise.reject(res);
      })
      .catch(() => dispatch(registerFailed()));
  };

export const login: AppThunk =
  ({ email, password, history }) =>
  (dispatch: AppDispatch) => {
    dispatch(loginRequest());
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
          const accessToken = res.accessToken.split('Bearer ')[1];
          setCookies('accessToken', accessToken);
          setCookies('refreshToken', res.refreshToken);
          dispatch(loginSuccess(res.user));
          history.push('/');
        } else Promise.reject(res);
      })
      .catch(() => dispatch(loginFailed()));
  };

export const refresh = (): Promise<TRefresh> => {
  console.log('refresh');
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
  dispatch(logoutRequest());
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
      if (res.success) {
        deleteCookies('accessToken');
        deleteCookies('refreshToken');
        dispatch(logoutSuccess());
      } else Promise.reject(res);
    })
    .catch(() => dispatch(logoutFailed()));
};

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
  const accessToken = getCookie('accessToken');
  dispatch(getUserRequest());
  retriableFetch<TRes>(`${MAIN_API}/auth/user`, {
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${accessToken}`
    }
  })
    .then(res => {
      if (res.success) dispatch(getUserSuccess(res.user!));
      else Promise.reject(res);
    })
    .catch(() => dispatch(getUserFailed()));
};

export const updateUser: AppThunk =
  ({ email, password, name }) =>
  (dispatch: AppDispatch) => {
    const accessToken = getCookie('accessToken');
    dispatch(updateUserRequest());
    retriableFetch<TRes>(`${MAIN_API}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
      .then(res => {
        if (res.success) dispatch(updateUserSuccess(res.user!));
        else Promise.reject(res);
      })
      .catch(() => dispatch(updateUserFailed()));
  };
