import { Map } from 'immutable';
import { LOAD_EVENTS_FAILURE, LOAD_EVENTS_SUCCESS } from '../actions/constants';
import { DELETE_EVENT_SUCCESS } from '../pages/events/constants';

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
    case DELETE_EVENT_SUCCESS:
      return state.merge({
        ids: payload.ids,
        events: payload.events
      });
    default:
      return state;
  }
};
