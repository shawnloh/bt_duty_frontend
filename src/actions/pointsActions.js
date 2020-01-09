import {
  LOAD_POINTS,
  LOAD_POINTS_FAILURE,
  LOAD_POINTS_SUCCESS
} from './constants';

export const loadPoints = () => ({
  type: LOAD_POINTS
});

export const loadPointsSuccess = payload => ({
  type: LOAD_POINTS_SUCCESS,
  payload
});

export const loadPointsFailure = payload => ({
  type: LOAD_POINTS_FAILURE,
  payload
});
