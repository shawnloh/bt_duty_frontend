import { fromJS, List } from 'immutable';
import {
  UPDATE_EVENT,
  UPDATE_EVENT_FAILURE,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_NO_CHANGE
} from './constants';

const initialState = fromJS({
  isUpdating: false,
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_EVENT:
      return state.merge({
        isUpdating: true,
        errors: List()
      });

    case UPDATE_EVENT_SUCCESS:
    case UPDATE_EVENT_NO_CHANGE:
      return state.merge({
        isUpdating: false
      });
    case UPDATE_EVENT_FAILURE:
      return state.merge({
        isUpdating: false,
        errors: List(payload)
      });
    default:
      return state;
  }
};
