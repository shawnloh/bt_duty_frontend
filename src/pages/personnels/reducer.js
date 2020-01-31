import { combineReducers } from 'redux';
import allReducer from './all/reducer';
import addReducer from './add/reducer';
import singleReducer from './single/reducer';
import editReducer from './edit/reducer';

const personnelsPageReducers = combineReducers({
  all: allReducer,
  add: addReducer,
  single: singleReducer,
  edit: editReducer
});

export default personnelsPageReducers;
