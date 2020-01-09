import { Map } from 'immutable';
import {
  ADD_POINT_FAILURE,
  ADD_POINT,
  ADD_POINT_SUCCESS,
  DELETE_POINT,
  DELETE_POINT_SUCCESS,
  DELETE_POINT_FAILURE,
  UPDATE_POINT,
  UPDATE_POINT_FAILURE,
  UPDATE_POINT_SUCCESS
} from './constants';

const initialState = Map({
  errors: [],
  actionInProgress: false
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_POINT:
    case DELETE_POINT:
    case UPDATE_POINT:
      return state.merge({
        errors: [],
        actionInProgress: true
      });
    case ADD_POINT_SUCCESS:
    case DELETE_POINT_SUCCESS:
    case UPDATE_POINT_SUCCESS:
      return state.merge({
        errors: [],
        actionInProgress: false
      });
    case ADD_POINT_FAILURE:
    case DELETE_POINT_FAILURE:
    case UPDATE_POINT_FAILURE:
      return state.merge({
        errors: payload,
        actionInProgress: false
      });

    default:
      return state;
  }
};
