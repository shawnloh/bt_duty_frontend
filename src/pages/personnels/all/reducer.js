import { Map } from 'immutable';
import {
  DELETE_PERSONNEL,
  DELETE_PERSONNEL_FAILURE,
  DELETE_PERSONNEL_SUCCESS
} from './constants';

const initialState = Map({
  errors: [],
  actionInProgress: false
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DELETE_PERSONNEL:
      return state.merge({ actionInProgress: true });
    case DELETE_PERSONNEL_SUCCESS:
      return state.merge({ actionInProgress: false });
    case DELETE_PERSONNEL_FAILURE:
      return state.merge({
        errors: payload,
        actionInProgress: false
      });

    default:
      return state;
  }
};
