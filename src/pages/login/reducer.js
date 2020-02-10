import { fromJS, List } from 'immutable';
import { LOGIN, LOGIN_FAIL } from './constants';
import {
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE
} from '../../actions/constants';

const initialState = fromJS({
  isAuthenticating: false,
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return state.merge({
        isAuthenticating: true,
        errors: List()
      });
    case CHECK_AUTH_SUCCESS:
    case CHECK_AUTH_FAILURE:
      return state.merge({
        isAuthenticating: false
      });
    case LOGIN_FAIL:
      return state.merge({
        isAuthenticating: false,
        errors: List(payload)
      });
    default:
      return state;
  }
};
