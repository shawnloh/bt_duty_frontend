import { fromJS, Map, List } from 'immutable';
import { LOAD_EVENTS_FAILURE, LOAD_EVENTS_SUCCESS } from '../actions/constants';
import {
  DELETE_EVENT_SUCCESS,
  CREATE_EVENT_SUCCESS
} from '../pages/events/constants';

const initialState = fromJS({
  ids: [],
  events: {},
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_EVENTS_SUCCESS:
      return state.merge({
        ids: List(payload.ids),
        events: fromJS(payload.events),
        errors: List()
      });

    case LOAD_EVENTS_FAILURE:
      return state.merge({
        errors: List(payload)
      });
    case CREATE_EVENT_SUCCESS:
      return state.merge({
        ids: state.get('ids').push(payload._id),
        events: state.get('events').set(payload._id, Map(payload))
      });
    case DELETE_EVENT_SUCCESS:
      return state.merge({
        ids: state.get('ids').delete(state.get('ids').indexOf(payload._id)),
        events: state.get('events').delete(payload._id)
      });
    default:
      return state;
  }
};
