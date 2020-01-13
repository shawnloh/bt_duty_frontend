import {
  DELETE_PERSONNEL,
  DELETE_PERSONNEL_FAILURE,
  DELETE_PERSONNEL_SUCCESS
} from './constants';

export const deletePersonnel = id => ({
  type: DELETE_PERSONNEL,
  payload: id
});

export const deletePersonnelSuccess = ({ ids, personnels }) => ({
  type: DELETE_PERSONNEL_SUCCESS,
  payload: {
    ids,
    personnels
  }
});

export const deletePersonnelFailure = errors => ({
  type: DELETE_PERSONNEL_FAILURE,
  payload: errors
});
