import { combineReducers } from 'redux';
import viewAllReducer from './ViewAll/reducer';

const personnelsPageReducers = combineReducers({
  viewAll: viewAllReducer
});

export default personnelsPageReducers;
