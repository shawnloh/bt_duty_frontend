import { call, takeEvery, put, delay } from 'redux-saga/effects';
import { DELETE_PERSONNEL } from './constants';
import {
  deletePersonnelFailure,
  deletePersonnelSuccess,
  clearErrorMessage
} from './actions';
import { logout } from '../../../actions/authActions';
import PersonnelsService from '../../../services/personnels';

function* clearError() {
  yield delay(4000);
  yield put(clearErrorMessage());
}

function* deletePersonnel(action) {
  try {
    const deleteId = action.payload;
    const response = yield call(PersonnelsService.deletePersonnel, deleteId);
    if (response.ok) {
      yield put(deletePersonnelSuccess(deleteId));
    } else if (response.status === 401) {
      yield put(logout());
    } else {
      let errors = [];
      if (response.data.message) {
        errors.push(response.data.message);
      }

      if (response.data.errors) {
        errors = errors.concat(response.data.errors);
      }
      yield put(deletePersonnelFailure(errors));
      yield call(clearError);
    }
  } catch (error) {
    yield put(deletePersonnelFailure([error.message]));
    yield call(clearError);
  }
}

function* allWatcher() {
  yield takeEvery(DELETE_PERSONNEL, deletePersonnel);
}

export default allWatcher;
