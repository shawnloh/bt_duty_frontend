import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';
import { LOG_OUT_SUCCESS } from '../actions/constants';

// GLOBAL REDUCERS
import authReducer from './authReducer';

// PAGE REDUCERS
import loginReducer from '../pages/login/reducer';

const pages = combineReducers({
  login: loginReducer
});

const appReducer = combineReducers({
  auth: authReducer,
  pages
});

const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === LOG_OUT_SUCCESS) {
    newState = undefined;
  }
  return appReducer(newState, action);
};

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  blacklist: ['pages']
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export default persistedRootReducer;
