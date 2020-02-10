import { takeLatest, put, call, delay } from 'redux-saga/effects';
import { ADD_PERSONNEL } from './constants';
import {
  addPersonnelFailure,
  addPersonnelSuccess,
  clearPersonnelError
} from './actions';
import { logout } from '../../../actions/authActions';
import PersonnelsService from '../../../services/personnels';

function* clearMessage() {
  yield delay(4000);
  yield put(clearPersonnelError([]));
}

function* addPersonnel(action) {
  try {
    const { name, rank, platoon } = action.payload;
    const response = yield call(
      PersonnelsService.createPersonnel,
      name,
      rank,
      platoon
    );
    if (response.ok) {
      const person = response.data;
      yield put(addPersonnelSuccess(person));
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
      yield put(addPersonnelFailure(errors));
    }
  } catch (error) {
    yield put(addPersonnelFailure([error.message]));
  }
  yield call(clearMessage);
}

function* addWatcher() {
  yield takeLatest(ADD_PERSONNEL, addPersonnel);
}

export default addWatcher;
