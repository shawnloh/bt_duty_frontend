import { fromJS, List } from 'immutable';
import {
  DELETE_PERSONNEL,
  DELETE_PERSONNEL_FAILURE,
  DELETE_PERSONNEL_SUCCESS,
  CLEAR_ERROR_MESSAGE
} from './constants';

const initialState = fromJS({
  errors: [],
  actionInProgress: 0
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DELETE_PERSONNEL:
      return state.merge({
        actionInProgress: state.get('actionInProgress') + 1,
        errors: List()
      });
    case DELETE_PERSONNEL_SUCCESS:
      return state.merge({
        actionInProgress: state.get('actionInProgress') - 1
      });
    case DELETE_PERSONNEL_FAILURE:
      return state.merge({
        errors: List(payload),
        actionInProgress: state.get('actionInProgress') - 1
      });
    case CLEAR_ERROR_MESSAGE:
      return state.merge({
        errors: List()
      });
    default:
      return state;
  }
};
