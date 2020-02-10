import { fromJS, List } from 'immutable';
import {
  ADD_STATUS,
  ADD_STATUS_FAILURE,
  ADD_STATUS_SUCCESS,
  DELETE_STATUS,
  DELETE_STATUS_FAILURE,
  DELETE_STATUS_SUCCESS,
  ADD_BLOCKOUT,
  ADD_BLOCKOUT_FAILURE,
  ADD_BLOCKOUT_SUCCESS,
  DELETE_BLOCKOUT,
  DELETE_BLOCKOUT_FAILURE,
  DELETE_BLOCKOUT_SUCCESS,
  CLEAR_ERRORS,
  EDIT_PERSONNEL_POINT,
  EDIT_PERSONNEL_POINT_FAILURE,
  EDIT_PERSONNEL_POINT_SUCCESS
} from './constants';

const initialState = fromJS({
  actionInProgress: 0,
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_STATUS:
    case DELETE_STATUS:
    case ADD_BLOCKOUT:
    case DELETE_BLOCKOUT:
    case EDIT_PERSONNEL_POINT:
      return state.merge({
        actionInProgress: state.get('actionInProgress') + 1
      });
    case ADD_STATUS_SUCCESS:
    case DELETE_STATUS_SUCCESS:
    case ADD_BLOCKOUT_SUCCESS:
    case DELETE_BLOCKOUT_SUCCESS:
    case EDIT_PERSONNEL_POINT_SUCCESS:
      return state.merge({
        actionInProgress: state.get('actionInProgress') - 1
      });

    case ADD_STATUS_FAILURE:
    case DELETE_STATUS_FAILURE:
    case ADD_BLOCKOUT_FAILURE:
    case DELETE_BLOCKOUT_FAILURE:
    case EDIT_PERSONNEL_POINT_FAILURE:
      return state.merge({
        actionInProgress: state.get('actionInProgress') - 1,
        errors: List(payload)
      });
    case CLEAR_ERRORS:
      return state.merge({
        errors: List()
      });
    default:
      return state;
  }
};
