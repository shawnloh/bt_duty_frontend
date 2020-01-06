import { Map } from 'immutable';
import {
  LOAD_EVENTS_FAILURE,
  LOAD_EVENTS_SUCCESS
} from '../actions/constants';

const initialState = Map({
  ids: [],
  events: {},
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_EVENTS_SUCCESS:
      return state.merge({
        ids: payload.ids,
        events: payload.events
      });
    case LOAD_EVENTS_FAILURE:
      return state.merge({
        errors: payload
      });
    default:
      return state;
  }
};
