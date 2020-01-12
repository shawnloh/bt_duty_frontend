import { call, takeLatest, select, put } from 'redux-saga/effects';
import { DELETE_PERSONNEL } from './constants';
import { deletePersonnelFailure, deletePersonnelSuccess } from './actions';
import { logout } from '../../../actions/authActions';
import PersonnelsService from '../../../services/personnels';

function* deletePersonnel(action) {
  try {
    const deleteId = action.payload;
    const response = yield call(PersonnelsService.deletePersonnel, deleteId);
    if (response.ok) {
      let ids = yield select(state => state.personnels.get('ids'));
      const { ...personnels } = yield select(state =>
        state.personnels.get('personnels')
      );

      ids = ids.filter(id => id !== deleteId);
      delete personnels[deleteId];
      yield put(deletePersonnelSuccess({ ids, personnels }));
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
    }
  } catch (error) {
    yield put(deletePersonnelFailure([error.message]));
  }
}

function* viewAllWatcher() {
  yield takeLatest(DELETE_PERSONNEL, deletePersonnel);
}

export default viewAllWatcher;
