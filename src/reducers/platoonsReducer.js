import { Map } from 'immutable';
import {
  LOAD_PLATOONS_FAILURE,
  LOAD_PLATOONS_SUCCESS
} from '../actions/constants';

const initialState = Map({
  ids: [],
  platoons: {},
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PLATOONS_SUCCESS:
      return state.merge({
        ids: payload.ids,
        platoons: payload.platoons
      });
    case LOAD_PLATOONS_FAILURE:
      return state.merge({
        errors: payload
      });
    default:
      return state;
  }
};
