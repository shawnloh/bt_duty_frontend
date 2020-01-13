import {
  ADD_STATUS,
  ADD_STATUS_FAILURE,
  ADD_STATUS_SUCCESS,
  DELETE_STATUS,
  DELETE_STATUS_FAILURE,
  DELETE_STATUS_SUCCESS
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
