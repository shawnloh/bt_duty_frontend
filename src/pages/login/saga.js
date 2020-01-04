import { takeLatest, put, call } from 'redux-saga/effects';
import { LOGIN } from './constants';
import { loginFailure, loginSuccess } from './actions';
import AccountService from '../../services/accounts';

function* login(action) {
  try {
    const { username, password } = action.payload;
    const response = yield call(AccountService.login, username, password);
    if (!response.ok) {
      yield put(loginFailure(response.data.errors));
    } else {
      const authResponse = yield call(AccountService.checkAuthenticated);
      if (authResponse.ok) {
        yield put(loginSuccess(authResponse.data.isAuthenticated));
      } else {
        yield put(loginFailure(['Unable to connect the server']));
      }
    }
  } catch (error) {
    yield put(loginFailure([error.message]));
  }
}

function* loginWatcher() {
  yield takeLatest(LOGIN, login);
}

export default loginWatcher;
