import {
  DELETE_PERSONNEL,
  DELETE_PERSONNEL_FAILURE,
  DELETE_PERSONNEL_SUCCESS,
  CLEAR_ERROR_MESSAGE
} from './constants';

export const deletePersonnel = id => ({
  type: DELETE_PERSONNEL,
  payload: id
});

export const deletePersonnelSuccess = id => ({
  type: DELETE_PERSONNEL_SUCCESS,
  payload: id
});

export const deletePersonnelFailure = errors => ({
  type: DELETE_PERSONNEL_FAILURE,
  payload: errors
});
export const clearErrorMessage = () => ({
  type: CLEAR_ERROR_MESSAGE
});
