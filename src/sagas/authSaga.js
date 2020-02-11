import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import { LOG_OUT, CHECK_AUTH } from '../actions/constants';
import {
  logoutSuccess,
  logoutFailure,
  checkAuthFailure,
  checkAuthSuccess,
  logout as logoutAction
} from '../actions/authActions';
import AccountService from '../services/accounts';

function* logout() {
  try {
    const isAuthenticated = yield select(state =>
      state.auth.get('isAuthenticated')
    );
    if (isAuthenticated) {
      yield call(AccountService.logout);
      yield put(logoutSuccess());
    }
  } catch (error) {
    yield put(logoutFailure());
  }
}

function* checkAuth() {
  try {
    const response = yield call(AccountService.checkAuthenticated);
    if (!response.ok) {
      yield put(checkAuthFailure());
    } else {
      const isAuth = response.data.isAuthenticated;
      yield put(checkAuthSuccess(isAuth));
      if (!isAuth) {
        yield put(logoutAction());
      }
    }
  } catch (error) {
    yield put(checkAuthFailure(error.message || ['Unable to login']));
  }
}

function* authSagaWatcher() {
  yield all([takeLatest(CHECK_AUTH, checkAuth), takeLatest(LOG_OUT, logout)]);
}

export default authSagaWatcher;
