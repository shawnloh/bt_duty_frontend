import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootReducer from '../reducers/rootReducer';
import rootSagas from '../sagas/rootSaga';

const configureStore = (state = {}) => {
  let composeEnhancers = compose;
  if (process.env.NODE_ENV === 'development') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    state,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSagas);
  return { store, persistor };
};

export default configureStore;
