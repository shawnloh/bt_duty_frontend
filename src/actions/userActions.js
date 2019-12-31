import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, LOG_OUT } from './constants';

export const login = (username, password) => {
  return {
    type: LOGIN,
    payload: {
      username,
      password
    }
  };
};

export const loginSuccess = token => {
  return {
    type: LOGIN_SUCCESS,
    payload: token
  };
};

export const loginFailure = errors => {
  return {
    type: LOGIN_FAIL,
    payload: errors
  };
};

export const logout = () => {
  return {
    type: LOG_OUT
  };
};
