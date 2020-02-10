import { fromJS, List } from 'immutable';
import {
  CREATE_EVENT,
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_SUCCESS
} from './constants';

const initialState = fromJS({
  errors: [],
  isAdding: false
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_EVENT:
      return state.merge({
        isAdding: true,
        errors: List()
      });
    case CREATE_EVENT_SUCCESS:
      return state.merge({
        isAdding: false,
        errors: List()
      });
    case CREATE_EVENT_FAILURE:
      return state.merge({
        isAdding: false,
        errors: List(payload)
      });
    default:
      return state;
  }
};
