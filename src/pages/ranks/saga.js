import { call, put, all, delay, takeEvery } from 'redux-saga/effects';
import { ADD_RANK, DELETE_RANK, UPDATE_RANK } from './constants';
import {
  addRankSuccess,
  addRankFailure,
  deleteRankSuccess,
  deleteRankFailure,
  updateRankSuccess,
  updateRankFailure,
  clearErrors
} from './actions';
import { logout } from '../../actions/authActions';
import RanksService from '../../services/ranks';

function* clearError() {
  yield delay(4000);
  yield put(clearErrors());
}

function* addRank(action) {
  try {
    const name = action.payload;
    if (!name) {
      yield put(addRankFailure(['Cannot give an empty name for new rank']));
      yield call(clearError);
    } else {
      const response = yield call(RanksService.createRank, name);
      if (response.ok) {
        const newRank = response.data;
        yield put(addRankSuccess(newRank));
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
        yield put(addRankFailure(errors));
        yield call(clearError);
      }
    }
  } catch (error) {
    yield put(addRankFailure([error.message || 'Please try again later']));
    yield call(clearError);
  }
}

function* deleteRank(action) {
  try {
    const deleteId = action.payload;
    const response = yield call(RanksService.deleteRank, deleteId);
    if (response.ok) {
      yield put(deleteRankSuccess(deleteId));
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
      yield put(deleteRankFailure(errors));
      yield call(clearError);
    }
  } catch (error) {
    yield put(deleteRankFailure([error.message || 'Please try again later']));
    yield call(clearError);
  }
}

function* updateRank(action) {
  try {
    const { id, name } = action.payload;
    if (!name) {
      yield put(
        updateRankFailure(['Cannot update the rank with an empty name'])
      );
      yield call(clearError);
    } else {
      const response = yield call(RanksService.updateRank, id, name);
      if (response.ok) {
        const updatedRank = {
          _id: response.data._id,
          name: response.data.name
        };
        yield put(updateRankSuccess(updatedRank));
      } else if (response.status === 401) {
        yield put(logout());
      } else if (response.status === 304) {
        yield put(
          updateRankFailure([
            'Updating rank must not be the same name as before'
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
        yield put(updateRankFailure(errors));
        yield call(clearError);
      }
    }
  } catch (error) {
    yield put(updateRankFailure([error.message || 'Please try again later']));
    yield call(clearError);
  }
}

function* ranksWatcher() {
  yield all([
    takeEvery(ADD_RANK, addRank),
    takeEvery(DELETE_RANK, deleteRank),
    takeEvery(UPDATE_RANK, updateRank)
  ]);
}

export default ranksWatcher;
