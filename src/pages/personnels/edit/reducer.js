import { Map } from 'immutable';
import {
  UPDATE_PERSON,
  UPDATE_PERSON_FAILURE,
  UPDATE_PERSON_SUCCESS
} from './constants';

const initialState = Map({
  isUpdating: false,
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PERSON:
      return state.merge({
        isUpdating: true,
        errors: []
      });

    case UPDATE_PERSON_SUCCESS:
      return state.merge({
        isUpdating: false,
        errors: []
      });
    case UPDATE_PERSON_FAILURE:
      return state.merge({
        isUpdating: false,
        errors: payload
      });
    default:
      return state;
  }
};
