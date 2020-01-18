import {
  ADD_STATUS,
  ADD_STATUS_FAILURE,
  ADD_STATUS_SUCCESS,
  DELETE_STATUS,
  DELETE_STATUS_FAILURE,
  DELETE_STATUS_SUCCESS,
  ADD_BLOCKOUT,
  ADD_BLOCKOUT_FAILURE,
  ADD_BLOCKOUT_SUCCESS,
  DELETE_BLOCKOUT,
  DELETE_BLOCKOUT_FAILURE,
  DELETE_BLOCKOUT_SUCCESS,
  CLEAR_ERRORS
} from './constants';

export const addStatus = (personnelId, statusId, startDate, endDate) => ({
  type: ADD_STATUS,
  payload: {
    personnelId,
    statusId,
    startDate,
    endDate
  }
});

export const addStatusSuccess = payload => ({
  type: ADD_STATUS_SUCCESS,
  payload
});

export const addStatusFailure = errors => ({
  type: ADD_STATUS_FAILURE,
  payload: errors
});

export const deleteStatus = (personnelId, pStatusId) => ({
  type: DELETE_STATUS,
  payload: {
    personnelId,
    pStatusId
  }
});

export const deleteStatusSuccess = payload => ({
  type: DELETE_STATUS_SUCCESS,
  payload
});

export const deleteStatusFailure = errors => ({
  type: DELETE_STATUS_FAILURE,
  payload: errors
});

export const addBlockout = (personnelId, date) => ({
  type: ADD_BLOCKOUT,
  payload: {
    personnelId,
    date
  }
});

export const addBlockoutSuccess = payload => ({
  type: ADD_BLOCKOUT_SUCCESS,
  payload
});

export const addBlockoutFailure = errors => ({
  type: ADD_BLOCKOUT_FAILURE,
  payload: errors
});

export const deleteBlockout = (personnelId, date) => ({
  type: DELETE_BLOCKOUT,
  payload: {
    personnelId,
    date
  }
});

export const deleteBlockoutSuccess = payload => ({
  type: DELETE_BLOCKOUT_SUCCESS,
  payload
});

export const deleteBlockoutFailure = errors => ({
  type: DELETE_BLOCKOUT_FAILURE,
  payload: errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});
