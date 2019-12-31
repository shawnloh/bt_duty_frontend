import { all } from 'redux-saga/effects';
import userSaga from './userSaga';

function* rootSagas() {
  yield all([userSaga()]);
}

export default rootSagas;
