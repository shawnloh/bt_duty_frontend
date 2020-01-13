import { all } from 'redux-saga/effects';
import allSaga from './all/saga';
import addSaga from './add/saga';

function* personnelsSaga() {
  yield all([allSaga(), addSaga()]);
}

export default personnelsSaga;
