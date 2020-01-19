import { Map } from 'immutable';
import {
  CREATE_EVENT,
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_SUCCESS
} from './constants';

const initialState = Map({
  errors: [],
  isAdding: false
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_EVENT:
      return state.merge({
        isAdding: true,
        errors: []
      });
    case CREATE_EVENT_SUCCESS:
      return state.merge({
        isAdding: false,
        errors: []
      });
    case CREATE_EVENT_FAILURE:
      return state.merge({
        isAdding: false,
        errors: payload
      });
    default:
      return state;
  }
};
