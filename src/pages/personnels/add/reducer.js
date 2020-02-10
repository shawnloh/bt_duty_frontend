import { List, fromJS } from 'immutable';
import {
  ADD_PERSONNEL,
  ADD_PERSONNEL_FAILURE,
  ADD_PERSONNEL_SUCCESS,
  CLEAR_ADD_PERSONNEL_ERROR
} from './constants';

const initialState = fromJS({
  actionInProgress: false,
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PERSONNEL:
      return state.merge({
        errors: List(),
        actionInProgress: true
      });
    case ADD_PERSONNEL_SUCCESS:
      return state.merge({
        actionInProgress: false,
        errors: List()
      });
    case ADD_PERSONNEL_FAILURE:
      return state.merge({
        actionInProgress: false,
        errors: List(payload)
      });
    case CLEAR_ADD_PERSONNEL_ERROR:
      return state.merge({
        errors: List()
      });
    default:
      return state;
  }
};
