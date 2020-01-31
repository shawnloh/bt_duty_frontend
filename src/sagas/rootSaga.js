import { all } from 'redux-saga/effects';

// GLOBAL SAGAS
import authSaga from './authSaga';
import personnelsSaga from './personnelsSaga';
import pageSagas from './pageSagas';

const globalSagas = [authSaga(), personnelsSaga()];

function* rootSagas() {
  yield all([...globalSagas, ...pageSagas]);
}

export default rootSagas;
