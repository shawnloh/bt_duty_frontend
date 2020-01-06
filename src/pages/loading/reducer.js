import { Map } from 'immutable';
import { LOAD_APP, LOAD_APP_FAILURE, LOAD_APP_SUCCESS } from './constants';

const initialState = Map({
  isLoading: false,
  appLoaded: false
});

export default (state = initialState, { type }) => {
  switch (type) {
    case LOAD_APP:
      return state.merge({
        isLoading: true
      });
    case LOAD_APP_FAILURE:
    case LOAD_APP_SUCCESS:
      return state.merge({
        isLoading: false,
        appLoaded: true
      });
    default:
      return state;
  }
};
