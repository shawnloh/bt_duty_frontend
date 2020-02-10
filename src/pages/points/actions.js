import {
  ADD_POINT,
  ADD_POINT_FAILURE,
  ADD_POINT_SUCCESS,
  DELETE_POINT,
  DELETE_POINT_FAILURE,
  DELETE_POINT_SUCCESS,
  UPDATE_POINT,
  UPDATE_POINT_FAILURE,
  UPDATE_POINT_SUCCESS,
  CLEAR_ERROR
} from './constants';

export const addPoint = name => ({
  type: ADD_POINT,
  payload: name
});

export const addPointSuccess = newPoint => ({
  type: ADD_POINT_SUCCESS,
  payload: newPoint
});

export const addPointFailure = errors => ({
  type: ADD_POINT_FAILURE,
  payload: errors
});

export const deletePoint = id => ({
  type: DELETE_POINT,
  payload: id
});

export const deletePointSuccess = id => ({
  type: DELETE_POINT_SUCCESS,
  payload: id
});

export const deletePointFailure = errors => ({
  type: DELETE_POINT_FAILURE,
  payload: errors
});

export const updatePoint = (id, name) => ({
  type: UPDATE_POINT,
  payload: {
    id,
    name
  }
});

export const updatePointSuccess = updatedPoint => ({
  type: UPDATE_POINT_SUCCESS,
  payload: updatedPoint
});

export const updatePointFailure = errors => ({
  type: UPDATE_POINT_FAILURE,
  payload: errors
});

export const clearErrors = payload => ({
  type: CLEAR_ERROR,
  payload
});
