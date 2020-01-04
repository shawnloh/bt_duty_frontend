import { LOG_OUT, LOG_OUT_FAILURE, LOG_OUT_SUCCESS } from './constants';

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
