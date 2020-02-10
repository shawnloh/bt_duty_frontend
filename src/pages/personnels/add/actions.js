import {
  ADD_PERSONNEL,
  ADD_PERSONNEL_FAILURE,
  ADD_PERSONNEL_SUCCESS,
  CLEAR_ADD_PERSONNEL_ERROR
} from './constants';

export const addPersonnel = (name, platoon, rank) => ({
  type: ADD_PERSONNEL,
  payload: {
    name,
    platoon,
    rank
  }
});

export const addPersonnelSuccess = person => ({
  type: ADD_PERSONNEL_SUCCESS,
  payload: person
});

export const addPersonnelFailure = errors => ({
  type: ADD_PERSONNEL_FAILURE,
  payload: errors
});

export const clearPersonnelError = () => ({
  type: CLEAR_ADD_PERSONNEL_ERROR
});
