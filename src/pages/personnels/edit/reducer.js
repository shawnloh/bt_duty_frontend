import { fromJS, List } from 'immutable';
import {
  UPDATE_PERSON,
  UPDATE_PERSON_FAILURE,
  UPDATE_PERSON_SUCCESS,
  UPDATE_PERSON_NO_CHANGE
} from './constants';

const initialState = fromJS({
  isUpdating: false,
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PERSON:
      return state.merge({
        isUpdating: true,
        errors: List()
      });

    case UPDATE_PERSON_SUCCESS:
    case UPDATE_PERSON_NO_CHANGE:
      return state.merge({
        isUpdating: false
      });
    case UPDATE_PERSON_FAILURE:
      return state.merge({
        isUpdating: false,
        errors: List(payload)
      });
    default:
      return state;
  }
};
