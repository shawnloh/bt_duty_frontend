import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import { ADD_STATUS, DELETE_STATUS, UPDATE_STATUS } from './constants';
import {
  addStatusSuccess,
  addStatusFailure,
  deleteStatusSuccess,
  deleteStatusFailure,
  updateStatusSuccess,
  updateStatusFailure,
  clearErrors
} from './actions';
import { logout } from '../../actions/authActions';
import StatusesService from '../../services/statuses';

function* clearError() {
  yield delay(4000);
  yield put(clearErrors());
}
function* addStatus(action) {
  try {
    const name = action.payload;
    const response = yield call(StatusesService.createStatus, name);

    if (response.ok) {
      const newStatus = {
        _id: response.data._id,
        name: response.data.name
      };
      yield put(addStatusSuccess(newStatus));
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
      yield put(addStatusFailure(errors));
      yield call(clearError);
    }
  } catch (error) {
    yield put(addStatusFailure([error.message || 'Please try again later']));
    yield call(clearError);
  }
}

function* deleteStatus(action) {
  try {
    const deleteId = action.payload;
    const response = yield call(StatusesService.deleteStatus, deleteId);
    if (response.ok) {
      yield put(deleteStatusSuccess(deleteId));
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
      yield put(deleteStatusFailure(errors));
      yield call(clearError);
    }
  } catch (error) {
    yield put(deleteStatusFailure([error.message || 'Please try again later']));
    yield call(clearError);
  }
}

function* updateStatus(action) {
  try {
    const { id, name } = action.payload;
    const response = yield call(StatusesService.updateStatus, id, name);
    if (response.ok) {
      const updatedStatus = {
        _id: response.data._id,
        name: response.data.name
      };
      yield put(updateStatusSuccess(updatedStatus));
    } else if (response.status === 401) {
      yield put(logout());
    } else if (response.status === 304) {
      yield put(
        updateStatusFailure(['Updating status must not be the same as before'])
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
      yield put(updateStatusFailure(errors));
      yield call(clearError);
    }
  } catch (error) {
    yield put(updateStatusFailure([error.message || 'Please try again later']));
    yield call(clearError);
  }
}

function* statusesWatcher() {
  yield all([
    takeLatest(ADD_STATUS, addStatus),
    takeLatest(DELETE_STATUS, deleteStatus),
    takeLatest(UPDATE_STATUS, updateStatus)
  ]);
}

export default statusesWatcher;
