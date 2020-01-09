import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';
import { LOG_OUT_SUCCESS } from '../actions/constants';

// GLOBAL REDUCERS
import authReducer from './authReducer';
import ranksReducer from './ranksReducer';
import platoonsReducer from './platoonsReducer';
import eventsReducer from './eventsReducer';
import personnelsReducer from './personnelsReducer';
import pointsReducer from './pointsReducer';

// PAGE REDUCERS
import loginPageReducer from '../pages/login/reducer';
import loadingPageReducer from '../pages/loading/reducer';
import ranksPageReducer from '../pages/ranks/reducer';
import platoonsPageReducer from '../pages/platoons/reducer';

const pages = combineReducers({
  login: loginPageReducer,
  loading: loadingPageReducer,
  ranks: ranksPageReducer,
  platoons: platoonsPageReducer
});

const appReducer = combineReducers({
  auth: authReducer,
  ranks: ranksReducer,
  platoons: platoonsReducer,
  events: eventsReducer,
  personnels: personnelsReducer,
  points: pointsReducer,
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
