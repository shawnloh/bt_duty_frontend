import { fromJS, List } from 'immutable';
import { LOAD_RANKS_FAILURE, LOAD_RANKS_SUCCESS } from '../actions/constants';
import {
  ADD_RANK_SUCCESS,
  DELETE_RANK_SUCCESS,
  UPDATE_RANK_SUCCESS
} from '../pages/ranks/constants';

const initialState = fromJS({
  ids: [],
  ranks: {},
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_RANKS_SUCCESS:
      return state.merge({
        ids: List(payload.ids),
        ranks: fromJS(payload.ranks),
        errors: List()
      });
    case ADD_RANK_SUCCESS:
      return state.merge({
        ids: state.get('ids').push(payload._id),
        ranks: state.get('ranks').set(payload._id, fromJS(payload))
      });
    case DELETE_RANK_SUCCESS:
      return state.merge({
        ids: state.get('ids').delete(state.get('ids').indexOf(payload)),
        ranks: state.get('ranks').delete(payload)
      });
    case UPDATE_RANK_SUCCESS:
      return state.setIn(['ranks', payload._id], fromJS(payload));
    case LOAD_RANKS_FAILURE:
      return state.merge({
        errors: List(payload)
      });
    default:
      return state;
  }
};
