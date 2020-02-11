import { fromJS, List } from 'immutable';
import { LOGIN, LOGIN_FAIL } from './constants';
import {
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE,
  LOG_OUT_SUCCESS
} from '../../actions/constants';

const initialState = fromJS({
  isAuthenticating: false,
  errors: [],
  loggedOut: false
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return state.merge({
        isAuthenticating: true,
        errors: List(),
        loggedOut: false
      });
    case LOGIN_FAIL:
      return state.merge({
        isAuthenticating: false,
        errors: List(payload),
        loggedOut: false
      });
    case LOG_OUT_SUCCESS:
      return state.set('loggedOut', true);
    case CHECK_AUTH_SUCCESS:
    case CHECK_AUTH_FAILURE:
      return state.merge({
        isAuthenticating: false
      });
    default:
      return state;
  }
};
