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
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_POINT:
    case ADD_POINT_SUCCESS:
    case DELETE_POINT:
    case DELETE_POINT_SUCCESS:
    case UPDATE_POINT:
    case UPDATE_POINT_SUCCESS:
      return state.merge({
        errors: []
      });
    case ADD_POINT_FAILURE:
    case DELETE_POINT_FAILURE:
    case UPDATE_POINT_FAILURE:
      return state.merge({
        errors: payload
      });

    default:
      return state;
  }
};
