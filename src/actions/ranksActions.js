import {
  LOAD_RANKS,
  LOAD_RANKS_FAILURE,
  LOAD_RANKS_SUCCESS
} from './constants';

export const loadRanks = () => ({
  type: LOAD_RANKS
});

export const loadRanksSuccess = payload => ({
  type: LOAD_RANKS_SUCCESS,
  payload
});

export const loadRanksFailure = payload => ({
  type: LOAD_RANKS_FAILURE,
  payload
});
