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

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

export const loginFailure = errors => {
  return {
    type: LOGIN_FAIL,
    payload: errors
  };
};
