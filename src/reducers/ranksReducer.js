import { Map } from 'immutable';
import { LOAD_RANKS_FAILURE, LOAD_RANKS_SUCCESS } from '../actions/constants';

const initialState = Map({
  ids: [],
  ranks: {},
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_RANKS_SUCCESS:
      return state.merge({
        ids: payload.ids,
        ranks: payload.ranks
      });
    case LOAD_RANKS_FAILURE:
      return state.merge({
        errors: payload
      });
    default:
      return state;
  }
};
