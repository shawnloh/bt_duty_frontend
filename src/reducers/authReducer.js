import { Map } from 'immutable';
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from '../pages/login/constants';

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
    case LOGIN_SUCCESS:
      return state.merge({
        isAuthenticated: payload
      });
    case LOGIN_FAIL:
      return state.merge({
        isAuthenticated: false
      });
    default:
      return state;
  }
};

export default authReducer;
