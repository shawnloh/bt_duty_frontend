import { all } from 'redux-saga/effects';

import deleteSaga from './delete/saga';
import addSaga from './add/saga';

function* eventsWatcher() {
  yield all([deleteSaga(), addSaga()]);
}

export default eventsWatcher;
