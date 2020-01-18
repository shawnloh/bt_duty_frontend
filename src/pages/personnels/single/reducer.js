import { Map } from 'immutable';
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
  DELETE_BLOCKOUT_SUCCESS
} from './constants';

const initialState = Map({
  actionInProgress: false,
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_STATUS:
    case DELETE_STATUS:
    case ADD_BLOCKOUT:
    case DELETE_BLOCKOUT:
      return state.merge({
        actionInProgress: true,
        errors: []
      });
    case ADD_STATUS_SUCCESS:
    case DELETE_STATUS_SUCCESS:
    case ADD_BLOCKOUT_SUCCESS:
    case DELETE_BLOCKOUT_SUCCESS:
      return state.merge({
        actionInProgress: false,
        errors: []
      });

    case ADD_STATUS_FAILURE:
    case DELETE_STATUS_FAILURE:
    case ADD_BLOCKOUT_FAILURE:
    case DELETE_BLOCKOUT_FAILURE:
      return state.merge({
        actionInProgress: false,
        errors: payload
      });
    default:
      return state;
  }
};
