import { call, put, all, delay, takeEvery } from 'redux-saga/effects';
import { ADD_POINT, DELETE_POINT, UPDATE_POINT } from './constants';
import {
  addPointSuccess,
  addPointFailure,
  deletePointSuccess,
  deletePointFailure,
  updatePointSuccess,
  updatePointFailure,
  clearErrors
} from './actions';
import { logout } from '../../actions/authActions';
import PointsService from '../../services/points';

function* clearError() {
  yield delay(4000);
  yield put(clearErrors());
}

function* addPoint(action) {
  try {
    const name = action.payload;
    if (!name) {
      yield put(
        addPointFailure(['Cannot give an empty name for new point system'])
      );
      yield call(clearError);
    } else {
      const response = yield call(PointsService.createPoint, name);
      if (response.ok) {
        const newPoint = {
          _id: response.data._id,
          name: response.data.name
        };
        yield put(addPointSuccess(newPoint));
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
        yield call(clearError);
      }
    }
  } catch (error) {
    yield put(addPointFailure([error.message || 'Please try again later']));
    yield call(clearError, addPointFailure);
  }
}

function* deletePoint(action) {
  try {
    const deleteId = action.payload;
    const response = yield call(PointsService.deletePoint, deleteId);
    if (response.ok) {
      yield put(deletePointSuccess(deleteId));
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
      yield call(clearError);
    }
  } catch (error) {
    yield put(deletePointFailure([error.message || 'Please try again later']));
    yield call(clearError);
  }
}

function* updatePoint(action) {
  try {
    const { id, name } = action.payload;
    if (!name) {
      yield put(
        updatePointFailure(['Cannot update a point system with empty name'])
      );
      yield call(clearError);
    } else {
      const response = yield call(PointsService.updatePoint, id, name);
      if (response.ok) {
        const updatedPoint = {
          _id: response.data._id,
          name: response.data.name
        };

        yield put(updatePointSuccess(updatedPoint));
      } else if (response.status === 401) {
        yield put(logout());
      } else if (response.status === 304) {
        yield put(
          updatePointFailure(['Updating point must not be the same as before'])
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
        yield put(updatePointFailure(errors));
        yield call(clearError);
      }
    }
  } catch (error) {
    yield put(updatePointFailure([error.message || 'Please try again later']));
    yield call(clearError);
  }
}

function* pointsWatcher() {
  yield all([
    takeEvery(ADD_POINT, addPoint),
    takeEvery(DELETE_POINT, deletePoint),
    takeEvery(UPDATE_POINT, updatePoint)
  ]);
}

export default pointsWatcher;
