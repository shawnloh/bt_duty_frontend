import { call, put, delay, takeEvery } from 'redux-saga/effects';
import { DELETE_EVENT } from './constants';
import { deleteEventFailure, deleteEventSuccess } from './actions';
import { logout } from '../../../actions/authActions';
import EventsService from '../../../services/events';

function* clearError() {
  try {
    yield delay(4000);
    yield put(deleteEventFailure([]));
  } catch (error) {
    yield put(deleteEventFailure([]));
  }
}

function* deleteEvent(action) {
  try {
    const { revert, eventId } = action.payload;
    const response = yield call(EventsService.deleteEvent, eventId, revert);
    if (response.ok) {
      const { event } = response.data;
      yield put(deleteEventSuccess(event));
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
      yield put(deleteEventFailure(errors));
      yield call(clearError);
    }
  } catch (error) {
    yield put(deleteEventFailure([error.message || 'Please try again later']));
    yield call(clearError);
  }
}

function* deleteWatcher() {
  yield takeEvery(DELETE_EVENT, deleteEvent);
}

export default deleteWatcher;
