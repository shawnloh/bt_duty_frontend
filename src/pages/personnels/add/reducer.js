import { Map } from 'immutable';
import {
  ADD_PERSONNEL,
  ADD_PERSONNEL_FAILURE,
  ADD_PERSONNEL_SUCCESS,
  TOGGLE_ADD_PERSONNEL_SUCCESS_MESSAGE
} from './constants';

const initialState = Map({
  actionInProgress: false,
  errors: [],
  success: false
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PERSONNEL:
    case ADD_PERSONNEL_SUCCESS:
      return state.merge({
        actionInProgress: false,
        errors: [],
        success: true
      });
    case TOGGLE_ADD_PERSONNEL_SUCCESS_MESSAGE:
      return state.merge({
        success: !state.get('success')
      });
    case ADD_PERSONNEL_FAILURE:
      return state.merge({
        actionInProgress: false,
        errors: payload
      });

    default:
      return state;
  }
};
