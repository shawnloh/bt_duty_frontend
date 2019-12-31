import { combineReducers } from 'redux';
import { LOG_OUT } from '../actions/constants';
import userReducer from './userReducer';

const appReducer = combineReducers({
  user: userReducer
});

const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === LOG_OUT) {
    newState = undefined;
  }
  return appReducer(newState, action);
};

export default rootReducer;
