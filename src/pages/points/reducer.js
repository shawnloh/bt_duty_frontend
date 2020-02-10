import { fromJS, List } from 'immutable';
import {
  ADD_POINT_FAILURE,
  ADD_POINT,
  ADD_POINT_SUCCESS,
  DELETE_POINT,
  DELETE_POINT_SUCCESS,
  DELETE_POINT_FAILURE,
  UPDATE_POINT,
  UPDATE_POINT_FAILURE,
  UPDATE_POINT_SUCCESS,
  CLEAR_ERROR
} from './constants';

const initialState = fromJS({
  errors: [],
  actionInProgress: 0
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_POINT:
    case DELETE_POINT:
    case UPDATE_POINT:
      return state.merge({
        errors: List(),
        actionInProgress: state.get('actionInProgress') + 1
      });
    case ADD_POINT_SUCCESS:
    case DELETE_POINT_SUCCESS:
    case UPDATE_POINT_SUCCESS:
      return state.merge({
        actionInProgress: state.get('actionInProgress') - 1
      });
    case ADD_POINT_FAILURE:
    case DELETE_POINT_FAILURE:
    case UPDATE_POINT_FAILURE:
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
