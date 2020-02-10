import { fromJS, List } from 'immutable';
import {
  DELETE_EVENT,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_SUCCESS
} from './constants';

const initialState = fromJS({
  errors: [],
  isDeleting: false
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DELETE_EVENT:
      return state.merge({
        errors: List(),
        isDeleting: true
      });

    case DELETE_EVENT_SUCCESS:
      return state.merge({
        isDeleting: false,
        errors: List()
      });

    case DELETE_EVENT_FAILURE:
      return state.merge({
        isDeleting: false,
        errors: List(payload)
      });

    default:
      return state;
  }
};
