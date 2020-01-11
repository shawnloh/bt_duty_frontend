import {
  LOG_OUT,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
  CHECK_AUTH,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE
} from './constants';

export const logout = () => {
  return {
    type: LOG_OUT
  };
};

export const logoutFailure = () => {
  return {
    type: LOG_OUT_FAILURE
  };
};
export const logoutSuccess = () => {
  return {
    type: LOG_OUT_SUCCESS
  };
};

export const checkAuth = () => ({
  type: CHECK_AUTH
});

export const checkAuthSuccess = payload => ({
  type: CHECK_AUTH_SUCCESS,
  payload
});

export const checkAuthFailure = errors => ({
  type: CHECK_AUTH_FAILURE,
  payload: errors
});
