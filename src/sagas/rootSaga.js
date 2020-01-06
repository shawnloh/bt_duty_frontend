import { all } from 'redux-saga/effects';

// GLOBAL SAGAS
import authSaga from './authSaga';

// PAGES SAGAS
import loginPageSaga from '../pages/login/saga';
import loadingPageSaga from '../pages/loading/saga';

const pageSagas = [loginPageSaga(), loadingPageSaga()];
const globalSagas = [authSaga()];

function* rootSagas() {
  yield all([...globalSagas, ...pageSagas]);
}

export default rootSagas;
