import { Map } from 'immutable';
import { LOGIN, LOGIN_FAIL } from './constants';
import {
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE
} from '../../actions/constants';

const initialState = Map({
  isLoading: false,
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return state.merge({
        isLoading: true,
        errors: []
      });
    case CHECK_AUTH_SUCCESS:
    case CHECK_AUTH_FAILURE:
      return state.merge({
        isLoading: false
      });
    case LOGIN_FAIL:
      return state.merge({
        isLoading: false,
        errors: payload
      });
    default:
      return state;
  }
};
