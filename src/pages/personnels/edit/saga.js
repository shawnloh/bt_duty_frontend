import { takeLatest, call, put, all } from 'redux-saga/effects';
import { UPDATE_PERSON } from './constants';
import {
  updatePersonFailure,
  updatePersonSuccess,
  updatePersonNoChange
} from './actions';
import { logout } from '../../../actions/authActions';
import PersonnelsService from '../../../services/personnels';

function* updatePerson(action) {
  try {
    const { personnelId, name, rank, platoon } = action.payload;
    const response = yield call(PersonnelsService.editPersonnel, personnelId, {
      name,
      rank,
      platoon
    });
    if (response.ok) {
      const person = response.data;
      yield put(updatePersonSuccess(person));
    } else if (response.status === 304) {
      yield put(updatePersonNoChange());
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
      yield put(updatePersonFailure(errors));
    }
  } catch (error) {
    yield put(updatePersonFailure([error.message || 'Please try again later']));
  }
}

function* editPersonnelWatcher() {
  yield all([takeLatest(UPDATE_PERSON, updatePerson)]);
}

export default editPersonnelWatcher;
