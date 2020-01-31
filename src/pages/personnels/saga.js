import { all } from 'redux-saga/effects';
import allSaga from './all/saga';
import addSaga from './add/saga';
import singleSaga from './single/saga';
import editSaga from './edit/saga';

function* personnelsSaga() {
  yield all([allSaga(), addSaga(), singleSaga(), editSaga()]);
}

export default personnelsSaga;
