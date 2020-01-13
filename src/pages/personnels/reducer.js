import { combineReducers } from 'redux';
import allReducer from './all/reducer';
import addReducer from './add/reducer';

const personnelsPageReducers = combineReducers({
  all: allReducer,
  add: addReducer
});

export default personnelsPageReducers;
