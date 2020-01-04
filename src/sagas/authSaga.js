import { put, call, takeLatest } from 'redux-saga/effects';
import { LOG_OUT } from '../actions/constants';
import { logoutSuccess, logoutFailure } from '../actions/authActions';
import AccountService from '../services/accounts';

function* logout() {
  try {
    const response = yield call(AccountService.logout);
    if (response.ok) {
      yield put(logoutSuccess());
    } else {
      yield put(logoutFailure());
    }
  } catch (error) {
    yield put(logoutFailure());
  }
}

function* authSagaWatcher() {
  yield takeLatest(LOG_OUT, logout);
}

export default authSagaWatcher;
