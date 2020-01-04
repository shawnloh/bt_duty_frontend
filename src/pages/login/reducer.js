import { Map } from 'immutable';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from './constants';

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
    case LOGIN_SUCCESS:
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
