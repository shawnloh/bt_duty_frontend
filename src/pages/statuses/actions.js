import {
  ADD_STATUS,
  ADD_STATUS_FAILURE,
  ADD_STATUS_SUCCESS,
  DELETE_STATUS,
  DELETE_STATUS_FAILURE,
  DELETE_STATUS_SUCCESS,
  UPDATE_STATUS,
  UPDATE_STATUS_FAILURE,
  UPDATE_STATUS_SUCCESS
} from './constants';

export const addStatus = name => ({
  type: ADD_STATUS,
  payload: name
});

export const addStatusSuccess = ({ ids, statuses }) => ({
  type: ADD_STATUS_SUCCESS,
  payload: {
    ids,
    statuses
  }
});

export const addStatusFailure = errors => ({
  type: ADD_STATUS_FAILURE,
  payload: errors
});

export const deleteStatus = id => ({
  type: DELETE_STATUS,
  payload: id
});

export const deleteStatusSuccess = id => ({
  type: DELETE_STATUS_SUCCESS,
  payload: id
});

export const deleteStatusFailure = errors => ({
  type: DELETE_STATUS_FAILURE,
  payload: errors
});

export const updateStatus = (id, name) => ({
  type: UPDATE_STATUS,
  payload: {
    id,
    name
  }
});

export const updateStatusSuccess = statuses => ({
  type: UPDATE_STATUS_SUCCESS,
  payload: statuses
});

export const updateStatusFailure = errors => ({
  type: UPDATE_STATUS_FAILURE,
  payload: errors
});
