import { Map } from 'immutable';
import {
  LOAD_STATUSES_FAILURE,
  LOAD_STATUSES_SUCCESS
} from '../actions/constants';
import {
  ADD_STATUS_SUCCESS,
  DELETE_STATUS_SUCCESS,
  UPDATE_STATUS_SUCCESS
} from '../pages/statuses/constants';

const initialState = Map({
  ids: [],
  statuses: {},
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_STATUS_SUCCESS:
    case LOAD_STATUSES_SUCCESS:
    case DELETE_STATUS_SUCCESS:
      return state.merge({
        ids: payload.ids,
        statuses: payload.statuses,
        errors: []
      });
    case UPDATE_STATUS_SUCCESS:
      return state.merge({
        statuses: payload
      });
    case LOAD_STATUSES_FAILURE:
      return state.merge({
        errors: payload
      });
    default:
      return state;
  }
};
