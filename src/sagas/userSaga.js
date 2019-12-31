import { put, call, takeLatest } from 'redux-saga/effects';
import { LOGIN } from '../actions/constants';
import { loginFailure, loginSuccess, logout } from '../actions/userActions';
import api from '../utils/api';

function authenticateUser(userDetails) {
  return api
    .post('/accounts/login', userDetails)
    .then(response => response)
    .catch(error => error);
}

function getRanks() {
  return api
    .get('/ranks')
    .then(response => response)
    .catch(error => error);
}

function* login(action) {
  try {
    const response = yield call(authenticateUser, action.payload);
    if (!response.ok) {
      yield put(loginFailure(response.data.errors));
      if (response.status === 401) {
        yield put(logout());
      }
    } else {
      api.setHeader('Authorization', `Bearer ${response.data.token}`);
      yield put(loginSuccess(response.data.token));
      const data = yield call(getRanks);
      console.log(data.data);
    }
  } catch (error) {
    console.log(error);
    yield put(loginFailure([error.message]));
  }
}

function* userSagaWatcher() {
  yield takeLatest(LOGIN, login);
}

export default userSagaWatcher;
