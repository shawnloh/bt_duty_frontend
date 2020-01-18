import { combineReducers } from 'redux';

import deleteReducer from './delete/reducer';

export default combineReducers({
  delete: deleteReducer
});
