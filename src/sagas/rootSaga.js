import { all } from 'redux-saga/effects';

// GLOBAL SAGAS
import authSaga from './authSaga';

// PAGES SAGAS
import loginPageSaga from '../pages/login/saga';
import loadingPageSaga from '../pages/loading/saga';
import ranksPageSaga from '../pages/ranks/saga';
import platoonsPageSaga from '../pages/platoons/saga';

const pageSagas = [
  loginPageSaga(),
  loadingPageSaga(),
  ranksPageSaga(),
  platoonsPageSaga()
];
const globalSagas = [authSaga()];

function* rootSagas() {
  yield all([...globalSagas, ...pageSagas]);
}

export default rootSagas;
