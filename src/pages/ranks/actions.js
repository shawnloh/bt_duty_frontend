import {
  ADD_RANK,
  ADD_RANK_FAILURE,
  ADD_RANK_SUCCESS,
  DELETE_RANK,
  DELETE_RANK_FAILURE,
  DELETE_RANK_SUCCESS,
  UPDATE_RANK,
  UPDATE_RANK_FAILURE,
  UPDATE_RANK_SUCCESS
} from './constants';

export const addRank = name => ({
  type: ADD_RANK,
  payload: name
});

export const addRankSuccess = ({ ids, ranks }) => ({
  type: ADD_RANK_SUCCESS,
  payload: {
    ids,
    ranks
  }
});

export const addRankFailure = errors => ({
  type: ADD_RANK_FAILURE,
  payload: errors
});

export const deleteRank = id => ({
  type: DELETE_RANK,
  payload: id
});

export const deleteRankSuccess = id => ({
  type: DELETE_RANK_SUCCESS,
  payload: id
});

export const deleteRankFailure = errors => ({
  type: DELETE_RANK_FAILURE,
  payload: errors
});

export const updateRank = (id, name) => ({
  type: UPDATE_RANK,
  payload: {
    id,
    name
  }
});

export const updateRankSuccess = ranks => ({
  type: UPDATE_RANK_SUCCESS,
  payload: ranks
});

export const updateRankFailure = errors => ({
  type: UPDATE_RANK_FAILURE,
  payload: errors
});
