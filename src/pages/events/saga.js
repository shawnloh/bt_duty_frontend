import { all } from 'redux-saga/effects';

import deleteSaga from './delete/saga';
import addSaga from './add/saga';
import editSaga from './edit/saga';

function* eventsWatcher() {
  yield all([deleteSaga(), addSaga(), editSaga()]);
}

export default eventsWatcher;
