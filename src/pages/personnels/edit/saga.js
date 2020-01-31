import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { UPDATE_PERSON } from './constants';
import { updatePersonFailure, updatePersonSuccess } from './actions';
import { logout } from '../../../actions/authActions';
import PersonnelsService from '../../../services/personnels';

function* updatePerson(action) {
  try {
    const { personnelId, name, rank, platoon } = action.payload;
    const { ...personnels } = yield select(state =>
      state.personnels.get('personnels')
    );
    const response = yield call(PersonnelsService.editPersonnel, personnelId, {
      name,
      rank,
      platoon
    });
    if (response.ok) {
      const ranks = yield select(state => state.ranks.get('ranks'));
      const platoons = yield select(state => state.platoons.get('platoons'));
      const person = personnels[personnelId];
      person.name = name;
      person.rank = ranks[rank];
      person.platoon = platoons[platoon];
      yield put(updatePersonSuccess(personnels));
    } else if (response.status === 304) {
      yield put(updatePersonSuccess(personnels));
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
