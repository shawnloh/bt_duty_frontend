import { LOAD_APP, LOAD_APP_FAILURE, LOAD_APP_SUCCESS } from './constants';

export const loadApp = () => ({
  type: LOAD_APP
});

export const loadAppSuccess = () => ({
  type: LOAD_APP_SUCCESS
});

export const loadAppFailed = () => ({
  type: LOAD_APP_FAILURE
});
