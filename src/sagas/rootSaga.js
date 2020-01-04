import { all } from 'redux-saga/effects';

// GLOBAL SAGAS
import authSaga from './authSaga';

// PAGES SAGAS
import loginPageSaga from '../pages/login/saga';

const pageSagas = [loginPageSaga()];
const globalSagas = [authSaga()];

function* rootSagas() {
  yield all([...globalSagas, ...pageSagas]);
}

export default rootSagas;
