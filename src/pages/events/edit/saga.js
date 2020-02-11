import { takeLatest, call, put, all } from 'redux-saga/effects';
import { UPDATE_EVENT } from './constants';
import {
  updateEventFailure,
  updateEventSuccess,
  updateEventNoChange
} from './actions';
import { logout } from '../../../actions/authActions';
import EventsService from '../../../services/events';

function* updateEvent(action) {
  try {
    const { eventId, personnels } = action.payload;
    const response = yield call(EventsService.updateEvent, eventId, personnels);
    if (response.ok) {
      const event = response.data;
      yield put(updateEventSuccess(event));
    } else if (response.status === 304) {
      yield put(updateEventNoChange());
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
      yield put(updateEventFailure(errors));
    }
  } catch (error) {
    yield put(updateEventFailure([error.message || 'Please try again later']));
  }
}

function* editEventnelWatcher() {
  yield all([takeLatest(UPDATE_EVENT, updateEvent)]);
}

export default editEventnelWatcher;
