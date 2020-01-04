import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from './constants';

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
