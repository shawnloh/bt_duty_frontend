import { combineReducers } from 'redux';

import deleteReducer from './delete/reducer';
import addReducer from './add/reducer';

export default combineReducers({
  delete: deleteReducer,
  add: addReducer
});
