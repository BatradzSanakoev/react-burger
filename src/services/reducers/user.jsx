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

const initialState = {
  registerRequest: false,
  registerError: false,
  authRequest: false,
  authError: false,
  logoutRequest: false,
  logoutError: false,
  tokenRequest: false,
  tokenError: false,
  errorText: null,
  getUserRequest: false,
  getUserError: false,
  user: {}
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerError: false
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerError: true,
        errorText: 'Ошибка при регистрации'
      };
    }
    case AUTH_REQUEST: {
      return {
        ...state,
        authRequest: true
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authError: false
      };
    }
    case AUTH_FAILED: {
      return {
        ...state,
        authRequest: false,
        authError: true,
        errorText: 'Ошибка при авторизации'
      };
    }
    case TOKEN_REQUEST: {
      return {
        ...state,
        tokenRequest: true
      };
    }
    case TOKEN_SUCCESS: {
      return {
        ...state,
        tokenRequest: false,
        tokenError: false
      };
    }
    case TOKEN_FAILED: {
      return {
        ...state,
        tokenRequest: false,
        tokenError: true,
        errorText: 'Ошибка при обновлении токена'
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutError: false,
        user: {}
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutError: true,
        errorText: 'Ошибка при выходе пользователя'
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserError: false,
        user: action.payload
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserError: true,
        errorText: 'Ошибка при получении данных пользователя'
      };
    }
    default: {
      return state;
    }
  }
};
