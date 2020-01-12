import { all } from 'redux-saga/effects';
import viewAllSaga from './ViewAll/saga';

function* personnelsSaga() {
  yield all([viewAllSaga()]);
}

export default personnelsSaga;
