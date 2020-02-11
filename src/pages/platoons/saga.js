import { takeEvery, call, put, all, delay } from 'redux-saga/effects';
import { ADD_PLATOON, DELETE_PLATOON, UPDATE_PLATOON } from './constants';
import {
  addPlatoonSuccess,
  addPlatoonFailure,
  deletePlatoonSuccess,
  deletePlatoonFailure,
  updatePlatoonSuccess,
  updatePlatoonFailure,
  clearErrors
} from './actions';
import { logout } from '../../actions/authActions';
import PlatoonsService from '../../services/platoons';

function* clearError() {
  yield delay(4000);
  yield put(clearErrors());
}

function* addPlatoon(action) {
  try {
    const name = action.payload;
    if (!name) {
      yield put(
        addPlatoonFailure(['Cannot give an empty name for new platoon'])
      );
      yield call(clearError);
    } else {
      const response = yield call(PlatoonsService.createPlatoon, name);
      if (response.ok) {
        const newPlatoon = {
          _id: response.data._id,
          name: response.data.name
        };
        yield put(addPlatoonSuccess(newPlatoon));
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
        yield call(clearError);
      }
    }
  } catch (error) {
    yield put(addPlatoonFailure([error.message || 'Please try again later']));
    yield call(clearError);
  }
}

function* deletePlatoon(action) {
  try {
    const deleteId = action.payload;
    const response = yield call(PlatoonsService.deletePlatoon, deleteId);
    if (response.ok) {
      yield put(deletePlatoonSuccess(deleteId));
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
      yield call(clearError);
    }
  } catch (error) {
    yield put(
      deletePlatoonFailure([error.message || 'Please try again later'])
    );
    yield call(clearError);
  }
}

function* updatePlatoon(action) {
  try {
    const { id, name } = action.payload;
    if (!name) {
      yield put(updatePlatoonFailure([`Cannot give an empty name`]));
      yield call(clearError);
    } else {
      const response = yield call(PlatoonsService.updatePlatoon, id, name);
      if (response.ok) {
        const updatedPlatoon = {
          _id: response.data._id,
          name: response.data.name
        };
        yield put(updatePlatoonSuccess(updatedPlatoon));
      } else if (response.status === 401) {
        yield put(logout());
      } else if (response.status === 304) {
        yield put(
          updatePlatoonFailure([
            'Updating platoon must not be the same name as before'
          ])
        );
        yield call(clearError);
      } else {
        let errors = [];
        if (response.data.message) {
          errors.push(response.data.message);
        }

        if (response.data.errors) {
          errors = errors.concat(response.data.errors);
        }
        yield put(updatePlatoonFailure(errors));
        yield call(clearError);
      }
    }
  } catch (error) {
    yield put(
      updatePlatoonFailure([error.message || 'Please try again later'])
    );
    yield call(clearError);
  }
}

function* platoonsWatcher() {
  yield all([
    takeEvery(ADD_PLATOON, addPlatoon),
    takeEvery(DELETE_PLATOON, deletePlatoon),
    takeEvery(UPDATE_PLATOON, updatePlatoon)
  ]);
}

export default platoonsWatcher;
