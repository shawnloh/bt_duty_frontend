import { all } from 'redux-saga/effects';

// GLOBAL SAGAS
import authSaga from './authSaga';
import pageSagas from './pageSagas';

const globalSagas = [authSaga()];

function* rootSagas() {
  yield all([...globalSagas, ...pageSagas]);
}

export default rootSagas;
