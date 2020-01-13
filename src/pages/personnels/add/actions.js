import {
  ADD_PERSONNEL,
  ADD_PERSONNEL_FAILURE,
  ADD_PERSONNEL_SUCCESS,
  TOGGLE_ADD_PERSONNEL_SUCCESS_MESSAGE
} from './constants';

export const addPersonnel = (name, platoon, rank) => ({
  type: ADD_PERSONNEL,
  payload: {
    name,
    platoon,
    rank
  }
});

export const addPersonnelSuccess = ({ ids, personnels }) => ({
  type: ADD_PERSONNEL_SUCCESS,
  payload: {
    ids,
    personnels
  }
});

export const addPersonnelFailure = errors => ({
  type: ADD_PERSONNEL_FAILURE,
  payload: errors
});

export const toggleAddPersonnelSuccessMessage = () => {
  return {
    type: TOGGLE_ADD_PERSONNEL_SUCCESS_MESSAGE
  };
};
