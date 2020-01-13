import { takeLatest, call, select, put, all, delay } from 'redux-saga/effects';
import { ADD_POINT, DELETE_POINT, UPDATE_POINT } from './constants';
import {
  addPointSuccess,
  addPointFailure,
  deletePointSuccess,
  deletePointFailure,
  updatePointSuccess,
  updatePointFailure
} from './actions';
import { logout } from '../../actions/authActions';
import PointsService from '../../services/points';

function* clearError(funcToClear) {
  try {
    yield delay(4000);
    yield put(funcToClear([]));
  } catch (error) {
    yield put(funcToClear([]));
  }
}

function* addPoint(action) {
  try {
    const name = action.payload;
    const ids = yield select(state => state.points.get('ids'));
    const points = yield select(state => state.points.get('points'));
    const response = yield call(PointsService.createPoint, name);

    if (response.ok) {
      const newPoint = response.data;
      ids.push(newPoint._id);
      points[newPoint._id] = {
        _id: newPoint._id,
        name: newPoint.name
      };
      yield put(addPointSuccess({ ids, points }));
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
      yield put(addPointFailure(errors));
      yield call(clearError, addPointFailure);
    }
  } catch (error) {
    yield put(addPointFailure([error.message]));
    yield call(clearError, addPointFailure);
  }
}

function* deletePoint(action) {
  try {
    const deleteId = action.payload;
    const response = yield call(PointsService.deletePoint, deleteId);
    if (response.ok) {
      let ids = yield select(state => state.points.get('ids'));
      const { ...points } = yield select(state => state.points.get('points'));
      ids = ids.filter(id => id !== deleteId);
      delete points[deleteId];
      yield put(deletePointSuccess({ ids, points }));
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
      yield put(deletePointFailure(errors));
      yield call(clearError, deletePointFailure);
    }
  } catch (error) {
    yield put(deletePointFailure([error.message]));
    yield call(clearError, deletePointFailure);
  }
}

function* updatePoint(action) {
  try {
    const { id, name } = action.payload;
    const response = yield call(PointsService.updatePoint, id, name);
    if (response.ok) {
      const { ...points } = yield select(state => state.points.get('points'));
      points[id] = {
        _id: response.data._id,
        name: response.data.name
      };

      yield put(updatePointSuccess(points));
    } else if (response.status === 401) {
      yield put(logout());
    } else if (response.status === 304) {
      yield put(
        updatePointFailure(['Updating point must not be the same as before'])
      );
      yield call(clearError, updatePointFailure);
    } else {
      let errors = [];
      if (response.data.message) {
        errors.push(response.data.message);
      }

      if (response.data.errors) {
        errors = errors.concat(response.data.errors);
      }
      yield put(updatePointFailure(errors));
      yield call(clearError, updatePointFailure);
    }
  } catch (error) {
    yield put(updatePointFailure([error.message]));
    yield call(clearError, updatePointFailure);
  }
}

function* pointsWatcher() {
  yield all([
    takeLatest(ADD_POINT, addPoint),
    takeLatest(DELETE_POINT, deletePoint),
    takeLatest(UPDATE_POINT, updatePoint)
  ]);
}

export default pointsWatcher;
