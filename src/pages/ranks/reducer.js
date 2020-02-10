import { fromJS, List } from 'immutable';
import {
  ADD_RANK_FAILURE,
  ADD_RANK,
  ADD_RANK_SUCCESS,
  DELETE_RANK,
  DELETE_RANK_SUCCESS,
  DELETE_RANK_FAILURE,
  UPDATE_RANK,
  UPDATE_RANK_FAILURE,
  UPDATE_RANK_SUCCESS,
  CLEAR_ERROR
} from './constants';

const initialState = fromJS({
  errors: [],
  actionInProgress: 0
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_RANK:
    case DELETE_RANK:
    case UPDATE_RANK:
      return state.merge({
        errors: List(),
        actionInProgress: state.get('actionInProgress') + 1
      });
    case ADD_RANK_SUCCESS:
    case DELETE_RANK_SUCCESS:
    case UPDATE_RANK_SUCCESS:
      return state.merge({
        errors: [],
        actionInProgress: state.get('actionInProgress') - 1
      });
    case ADD_RANK_FAILURE:
    case DELETE_RANK_FAILURE:
    case UPDATE_RANK_FAILURE:
      return state.merge({
        errors: List(payload),
        actionInProgress: state.get('actionInProgress') - 1
      });
    case CLEAR_ERROR:
      return state.merge({
        errors: List()
      });
    default:
      return state;
  }
};
