import { all } from 'redux-saga/effects';

import deleteSaga from './delete/saga';

function* eventsWatcher() {
  yield all([deleteSaga()]);
}

export default eventsWatcher;
