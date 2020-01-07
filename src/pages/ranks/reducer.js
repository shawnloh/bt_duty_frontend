import { Map } from 'immutable';
import {
  ADD_RANK_FAILURE,
  ADD_RANK,
  ADD_RANK_SUCCESS,
  DELETE_RANK,
  DELETE_RANK_SUCCESS,
  DELETE_RANK_FAILURE,
  UPDATE_RANK,
  UPDATE_RANK_FAILURE,
  UPDATE_RANK_SUCCESS
} from './constants';

const initialState = Map({
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_RANK:
    case ADD_RANK_SUCCESS:
    case DELETE_RANK:
    case DELETE_RANK_SUCCESS:
    case UPDATE_RANK:
    case UPDATE_RANK_SUCCESS:
      return state.merge({
        errors: []
      });
    case ADD_RANK_FAILURE:
    case DELETE_RANK_FAILURE:
    case UPDATE_RANK_FAILURE:
      return state.merge({
        errors: payload
      });

    default:
      return state;
  }
};
