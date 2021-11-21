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
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED
} from '../types';
import { MAIN_API } from '../../utils/constants';

export const register = ({ email, password, name, history }) => {
  return dispatch => {
    dispatch({
      type: REGISTER_REQUEST
    });
    fetch(`${MAIN_API}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password, name: name })
    })
      .then(res => {
        if (res.ok) return res.json();
        else dispatch({ type: REGISTER_FAILED });
      })
      .then(res => {
        if (res.success) {
          dispatch({ type: REGISTER_SUCCESS });
          history.push('/login');
        } else dispatch({ type: REGISTER_FAILED });
      })
      .catch(() => dispatch({ type: REGISTER_FAILED }));
  };
};

export const login = ({ email, password, history }) => {
  return dispatch => {
    dispatch({ type: AUTH_REQUEST });
    fetch(`${MAIN_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(res => {
        if (res.ok) return res.json();
        else dispatch({ type: AUTH_FAILED });
      })
      .then(res => {
        if (res.success) {
          document.cookie = `accessToken=${res.accessToken.slice(7)}`;
          document.cookie = `refreshToken=${res.refreshToken}`;
          dispatch({ type: AUTH_SUCCESS });
          history.push('/');
        } else dispatch({ type: AUTH_FAILED });
      })
      .catch(() => dispatch({ type: AUTH_FAILED }));
  };
};

export const refresh = () => {
  const refreshToken = document.cookie.split('; ').map(item => {
    if (item.indexOf('refreshToken') !== -1) return item;
  });
  return dispatch => {
    dispatch({ type: TOKEN_REQUEST });
    fetch(`${MAIN_API}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ token: `{{${refreshToken}}}` })
    })
      .then(res => {
        if (res.ok) return res.json();
        else dispatch({ type: TOKEN_FAILED });
      })
      .then(res => {
        if (res.success) {
          document.cookie = `accessToken=${res.accessToken.slice(7)}`;
          document.cookie = `refreshToken=${res.refreshToken}`;
          dispatch({ type: TOKEN_SUCCESS });
        } else dispatch({ type: TOKEN_FAILED });
      })
      .catch(() => dispatch({ type: TOKEN_FAILED }));
  };
};

export const logout = () => {
  const refreshToken = document.cookie.split('; ').map(item => {
    if (item.indexOf('refreshToken') !== -1) return item;
  });
  return dispatch => {
    dispatch({ type: LOGOUT_REQUEST });
    fetch(`${MAIN_API}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ token: `{{${refreshToken}}}` })
    })
      .then(res => {
        if (res.ok) return res.json();
        else dispatch({ type: LOGOUT_FAILED });
      })
      .then(res => {
        if (res.success) dispatch({ type: LOGOUT_SUCCESS });
        else dispatch({ type: LOGOUT_FAILED });
      })
      .catch(() => dispatch({ type: LOGOUT_FAILED }));
  };
};

export const getUser = () => {
  const accessToken = document.cookie.split('; ').find(item => {
    if (item.indexOf('accessToken') !== -1) return item;
  });
  console.log(accessToken.slice(12))
  return dispatch => {
    dispatch({ type: GET_USER_REQUEST });
    fetch(`${MAIN_API}/auth/user`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken.slice(12)}`
      }
    })
      .then(res => {
        if (res.ok) return res.json();
        else dispatch({ type: GET_USER_FAILED });
      })
      .then(res => {
        if (res.success) dispatch({ type: GET_USER_SUCCESS, payload: res.user });
        else dispatch({ type: GET_USER_FAILED });
      })
      .catch(() => dispatch({ type: GET_USER_FAILED }));
  };
};
