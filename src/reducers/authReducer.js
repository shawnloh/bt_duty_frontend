import { Map } from 'immutable';
import { LOGIN } from '../pages/login/constants';
import { CHECK_AUTH_SUCCESS, CHECK_AUTH_FAILURE } from '../actions/constants';

const initialState = Map({
  username: '',
  isAuthenticated: false
});

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return state.merge({
        username: payload.username
      });
    case CHECK_AUTH_SUCCESS:
      return state.merge({
        isAuthenticated: payload
      });
    case CHECK_AUTH_FAILURE:
      return state.merge({
        isAuthenticated: false
      });
    default:
      return state;
  }
};

export default authReducer;
