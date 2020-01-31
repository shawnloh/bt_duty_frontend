import {
  UPDATE_PERSON,
  UPDATE_PERSON_FAILURE,
  UPDATE_PERSON_SUCCESS
} from './constants';

export const updatePerson = payload => ({
  type: UPDATE_PERSON,
  payload
});

export const updatePersonSuccess = payload => ({
  type: UPDATE_PERSON_SUCCESS,
  payload
});

export const updatePersonFailure = errors => ({
  type: UPDATE_PERSON_FAILURE,
  payload: errors
});
