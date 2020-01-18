import { Map } from 'immutable';
import {
  DELETE_EVENT,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_SUCCESS
} from './constants';

const initialState = Map({
  errors: [],
  isDeleting: false
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DELETE_EVENT:
      return state.merge({
        errors: [],
        isDeleting: true
      });

    case DELETE_EVENT_SUCCESS:
      return state.merge({
        isDeleting: false
      });

    case DELETE_EVENT_FAILURE:
      return state.merge({
        isDeleting: false,
        errors: payload
      });

    default:
      return state;
  }
};
