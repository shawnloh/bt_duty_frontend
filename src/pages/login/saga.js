import { takeLatest, put, call, delay } from 'redux-saga/effects';
import { LOGIN } from './constants';
import { loginFailure, loginSuccess } from './actions';
import { checkAuth } from '../../actions/authActions';
import AccountService from '../../services/accounts';

function* login(action) {
  try {
    const { username, password } = action.payload;
    const response = yield call(AccountService.login, username, password);
    yield delay(500);
    if (!response.ok) {
      if (response.status === 420) {
        yield put(
          loginFailure(['Too many login request, please login in 30mins time'])
        );
      }
      yield put(loginFailure([response.data]));
    } else {
      yield put(loginSuccess());
      yield put(checkAuth());
    }
  } catch (error) {
    yield put(loginFailure([error.message || 'Unable to login']));
  }
}

function* loginWatcher() {
  yield takeLatest(LOGIN, login);
}

export default loginWatcher;
