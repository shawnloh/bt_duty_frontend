import { combineReducers } from 'redux';
import allReducer from './all/reducer';
import addReducer from './add/reducer';
import singleReducer from './single/reducer';

const personnelsPageReducers = combineReducers({
  all: allReducer,
  add: addReducer,
  single: singleReducer
});

export default personnelsPageReducers;
