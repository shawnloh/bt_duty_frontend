import { Map } from 'immutable';
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from '../actions/constants';

const initialState = Map({
  username: '',
  token: '',
  errors: [],
  isLoading: false
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return state.merge({
        errors: [],
        token: '',
        username: payload.username,
        isLoading: true
      });
    case LOGIN_SUCCESS:
      return state.merge({
        token: payload,
        isLoading: false
      });
    case LOGIN_FAIL:
      return state.merge({
        errors: payload,
        isLoading: false
      });
    default:
      return state;
  }
};
