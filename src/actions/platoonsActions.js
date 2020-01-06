import {
  LOAD_PLATOONS,
  LOAD_PLATOONS_FAILURE,
  LOAD_PLATOONS_SUCCESS
} from './constants';

export const loadPlatoons = () => ({
  type: LOAD_PLATOONS
});

export const loadPlatoonsSuccess = payload => ({
  type: LOAD_PLATOONS_SUCCESS,
  payload
});

export const loadPlatoonsFailure = payload => ({
  type: LOAD_PLATOONS_FAILURE,
  payload
});
