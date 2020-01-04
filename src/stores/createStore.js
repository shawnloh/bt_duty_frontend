import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import Reactotron from 'reactotron-react-js';
import ReactotronConfig from './reactotronConfig';

import rootReducer from '../reducers/rootReducer';
import rootSagas from '../sagas/rootSaga';

const configureStore = (state = {}) => {
  let sagaMiddleware = createSagaMiddleware();
  let store = createStore(rootReducer, state, applyMiddleware(sagaMiddleware));
  let persistor = persistStore(store);

  if (process.env.NODE_ENV === 'development') {
    const sagaMonitor = Reactotron.createSagaMonitor();
    sagaMiddleware = createSagaMiddleware({ sagaMonitor });
    store = createStore(
      rootReducer,
      state,
      compose(
        applyMiddleware(sagaMiddleware),
        ReactotronConfig.createEnhancer()
      )
    );
    persistor = persistStore(store);
  }

  sagaMiddleware.run(rootSagas);
  return { store, persistor };
};

export default configureStore;
