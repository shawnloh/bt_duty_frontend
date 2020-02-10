import { fromJS, List } from 'immutable';
import {
  ADD_PLATOON_FAILURE,
  ADD_PLATOON,
  ADD_PLATOON_SUCCESS,
  DELETE_PLATOON,
  DELETE_PLATOON_SUCCESS,
  DELETE_PLATOON_FAILURE,
  UPDATE_PLATOON,
  UPDATE_PLATOON_FAILURE,
  UPDATE_PLATOON_SUCCESS,
  CLEAR_ERROR
} from './constants';

const initialState = fromJS({
  errors: [],
  actionInProgress: 0
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PLATOON:
    case DELETE_PLATOON:
    case UPDATE_PLATOON:
      return state.merge({
        actionInProgress: state.get('actionInProgress') + 1,
        errors: List()
      });
    case ADD_PLATOON_SUCCESS:
    case DELETE_PLATOON_SUCCESS:
    case UPDATE_PLATOON_SUCCESS:
      return state.merge({
        actionInProgress: state.get('actionInProgress') - 1,
        errors: List()
      });
    case ADD_PLATOON_FAILURE:
    case DELETE_PLATOON_FAILURE:
    case UPDATE_PLATOON_FAILURE:
      return state.merge({
        errors: List(payload),
        actionInProgress: state.get('actionInProgress') - 1
      });
    case CLEAR_ERROR:
      return state.merge({
        errors: []
      });
    default:
      return state;
  }
};
