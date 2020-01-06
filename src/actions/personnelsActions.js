import {
  LOAD_PERSONNELS,
  LOAD_PERSONNELS_FAILURE,
  LOAD_PERSONNELS_SUCCESS
} from './constants';

export const loadPersonnels = () => ({
  type: LOAD_PERSONNELS
});

export const loadPersonnelsSuccess = payload => ({
  type: LOAD_PERSONNELS_SUCCESS,
  payload
});

export const loadPersonnelsFailure = payload => ({
  type: LOAD_PERSONNELS_FAILURE,
  payload
});
