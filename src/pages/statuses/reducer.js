import { fromJS, List } from 'immutable';
import {
  ADD_STATUS_FAILURE,
  ADD_STATUS,
  ADD_STATUS_SUCCESS,
  DELETE_STATUS,
  DELETE_STATUS_SUCCESS,
  DELETE_STATUS_FAILURE,
  UPDATE_STATUS,
  UPDATE_STATUS_FAILURE,
  UPDATE_STATUS_SUCCESS,
  CLEAR_ERROR
} from './constants';

const initialState = fromJS({
  errors: [],
  actionInProgress: 0
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_STATUS:
    case DELETE_STATUS:
    case UPDATE_STATUS:
      return state.merge({
        actionInProgress: state.get('actionInProgress') + 1,
        errors: List()
      });
    case ADD_STATUS_SUCCESS:
    case DELETE_STATUS_SUCCESS:
    case UPDATE_STATUS_SUCCESS:
      return state.merge({
        actionInProgress: state.get('actionInProgress') - 1
      });
    case ADD_STATUS_FAILURE:
    case DELETE_STATUS_FAILURE:
    case UPDATE_STATUS_FAILURE:
      return state.merge({
        errors: List(payload),
        actionInProgress: state.get('actionInProgress') - 1
      });
    case CLEAR_ERROR:
      return state.set('errors', List());
    default:
      return state;
  }
};
