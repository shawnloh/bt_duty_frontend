import {
  LOAD_PERSONNELS,
  LOAD_PERSONNELS_FAILURE,
  LOAD_PERSONNELS_SUCCESS,
  PERSONNELS_UPDATE_EVENT_POINTS,
  PERSONNELS_UPDATE_PLATOON_NAME,
  PERSONNELS_UPDATE_POINTS_SYSTEM,
  PERSONNELS_UPDATE_RANK_NAME
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

export const personnelsUpdateEventPoints = payload => ({
  type: PERSONNELS_UPDATE_EVENT_POINTS,
  payload
});
export const personnelsUpdatePointsSystem = payload => ({
  type: PERSONNELS_UPDATE_POINTS_SYSTEM,
  payload
});

export const personnelsUpdatePlatoon = payload => ({
  type: PERSONNELS_UPDATE_PLATOON_NAME,
  payload
});

export const personnelsUpdateRank = payload => ({
  type: PERSONNELS_UPDATE_RANK_NAME,
  payload
});
