import {
  ADD_PLATOON,
  ADD_PLATOON_FAILURE,
  ADD_PLATOON_SUCCESS,
  DELETE_PLATOON,
  DELETE_PLATOON_FAILURE,
  DELETE_PLATOON_SUCCESS,
  UPDATE_PLATOON,
  UPDATE_PLATOON_FAILURE,
  UPDATE_PLATOON_SUCCESS,
  CLEAR_ERROR
} from './constants';

export const addPlatoon = name => ({
  type: ADD_PLATOON,
  payload: name
});

export const addPlatoonSuccess = platoon => ({
  type: ADD_PLATOON_SUCCESS,
  payload: platoon
});

export const addPlatoonFailure = errors => ({
  type: ADD_PLATOON_FAILURE,
  payload: errors
});

export const deletePlatoon = id => ({
  type: DELETE_PLATOON,
  payload: id
});

export const deletePlatoonSuccess = id => ({
  type: DELETE_PLATOON_SUCCESS,
  payload: id
});

export const deletePlatoonFailure = errors => ({
  type: DELETE_PLATOON_FAILURE,
  payload: errors
});

export const updatePlatoon = (id, name) => ({
  type: UPDATE_PLATOON,
  payload: {
    id,
    name
  }
});

export const updatePlatoonSuccess = updatedPlatoon => ({
  type: UPDATE_PLATOON_SUCCESS,
  payload: updatedPlatoon
});

export const updatePlatoonFailure = errors => ({
  type: UPDATE_PLATOON_FAILURE,
  payload: errors
});

export const clearErrors = () => ({
  type: CLEAR_ERROR
});
