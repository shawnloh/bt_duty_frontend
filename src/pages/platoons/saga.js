import { takeLatest, call, select, put, all } from 'redux-saga/effects';
import { ADD_PLATOON, DELETE_PLATOON, UPDATE_PLATOON } from './constants';
import {
  addPlatoonSuccess,
  addPlatoonFailure,
  deletePlatoonSuccess,
  deletePlatoonFailure,
  updatePlatoonSuccess,
  updatePlatoonFailure
} from './actions';
import { logout } from '../../actions/authActions';
import PlatoonsService from '../../services/platoons';

function* addPlatoon(action) {
  try {
    const name = action.payload;
    const ids = yield select(state => state.platoons.get('ids'));
    const platoons = yield select(state => state.platoons.get('platoons'));
    const response = yield call(PlatoonsService.createPlatoon, name);

    if (response.ok) {
      const newPlatoon = response.data;
      ids.push(newPlatoon._id);
      platoons[newPlatoon._id] = {
        _id: newPlatoon._id,
        name: newPlatoon.name
      };
      yield put(addPlatoonSuccess({ ids, platoons }));
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
      yield put(addPlatoonFailure(errors));
    }
  } catch (error) {
    yield put(addPlatoonFailure([error.message]));
  }
}

function* deletePlatoon(action) {
  try {
    const deleteId = action.payload;
    const response = yield call(PlatoonsService.deletePlatoon, deleteId);
    if (response.ok) {
      let ids = yield select(state => state.platoons.get('ids'));
      const { ...platoons } = yield select(state =>
        state.platoons.get('platoons')
      );
      ids = ids.filter(id => id !== deleteId);
      delete platoons[deleteId];
      yield put(deletePlatoonSuccess({ ids, platoons }));
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
      yield put(deletePlatoonFailure(errors));
    }
  } catch (error) {
    yield put(deletePlatoonFailure([error.message]));
  }
}

function* updatePlatoon(action) {
  try {
    const { id, name } = action.payload;
    const response = yield call(PlatoonsService.updatePlatoon, id, name);
    if (response.ok) {
      const { ...platoons } = yield select(state =>
        state.platoons.get('platoons')
      );
      platoons[id] = {
        _id: response.data._id,
        name: response.data.name
      };

      yield put(updatePlatoonSuccess(platoons));
    } else if (response.status === 401) {
      yield put(logout());
    } else if (response.status === 304) {
      yield put(
        updatePlatoonFailure([
          'Updating platoon must not be the same as before'
        ])
      );
    } else {
      let errors = [];
      if (response.data.message) {
        errors.push(response.data.message);
      }

      if (response.data.errors) {
        errors = errors.concat(response.data.errors);
      }
      yield put(updatePlatoonFailure(errors));
    }
  } catch (error) {
    yield put(updatePlatoonFailure([error.message]));
  }
}

function* platoonsWatcher() {
  yield all([
    takeLatest(ADD_PLATOON, addPlatoon),
    takeLatest(DELETE_PLATOON, deletePlatoon),
    takeLatest(UPDATE_PLATOON, updatePlatoon)
  ]);
}

export default platoonsWatcher;
