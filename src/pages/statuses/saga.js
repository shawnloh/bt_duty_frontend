import { takeLatest, call, select, put, all } from 'redux-saga/effects';
import { ADD_STATUS, DELETE_STATUS, UPDATE_STATUS } from './constants';
import {
  addStatusSuccess,
  addStatusFailure,
  deleteStatusSuccess,
  deleteStatusFailure,
  updateStatusSuccess,
  updateStatusFailure
} from './actions';
import { logout } from '../../actions/authActions';
import StatusesService from '../../services/statuses';

function* addStatus(action) {
  try {
    const name = action.payload;
    const ids = yield select(state => state.statuses.get('ids'));
    const statuses = yield select(state => state.statuses.get('statuses'));
    const response = yield call(StatusesService.createStatus, name);

    if (response.ok) {
      const newStatus = response.data;
      ids.push(newStatus._id);
      statuses[newStatus._id] = {
        _id: newStatus._id,
        name: newStatus.name
      };
      yield put(addStatusSuccess({ ids, statuses }));
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
    }
  } catch (error) {
    yield put(addStatusFailure([error.message]));
  }
}

function* deleteStatus(action) {
  try {
    const deleteId = action.payload;
    const response = yield call(StatusesService.deleteStatus, deleteId);
    if (response.ok) {
      let ids = yield select(state => state.statuses.get('ids'));
      const { ...statuses } = yield select(state =>
        state.statuses.get('statuses')
      );
      ids = ids.filter(id => id !== deleteId);
      delete statuses[deleteId];
      yield put(deleteStatusSuccess({ ids, statuses }));
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
    }
  } catch (error) {
    yield put(deleteStatusFailure([error.message]));
  }
}

function* updateStatus(action) {
  try {
    const { id, name } = action.payload;
    const response = yield call(StatusesService.updateStatus, id, name);
    if (response.ok) {
      const { ...statuses } = yield select(state =>
        state.statuses.get('statuses')
      );
      statuses[id] = {
        _id: response.data._id,
        name: response.data.name
      };

      yield put(updateStatusSuccess(statuses));
    } else if (response.status === 401) {
      yield put(logout());
    } else if (response.status === 304) {
      yield put(
        updateStatusFailure(['Updating status must not be the same as before'])
      );
    } else {
      let errors = [];
      if (response.data.message) {
        errors.push(response.data.message);
      }

      if (response.data.errors) {
        errors = errors.concat(response.data.errors);
      }
      yield put(updateStatusFailure(errors));
    }
  } catch (error) {
    yield put(updateStatusFailure([error.message]));
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
