import { all } from 'redux-saga/effects';

// GLOBAL SAGAS
import authSaga from './authSaga';

// PAGES SAGAS
import loginPageSaga from '../pages/login/saga';
import loadingPageSaga from '../pages/loading/saga';
import ranksPageSaga from '../pages/ranks/saga';

const pageSagas = [loginPageSaga(), loadingPageSaga(), ranksPageSaga()];
const globalSagas = [authSaga()];

function* rootSagas() {
  yield all([...globalSagas, ...pageSagas]);
}

export default rootSagas;
