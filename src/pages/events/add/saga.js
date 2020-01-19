import { put, takeLatest, call, delay, select } from 'redux-saga/effects';
import { CREATE_EVENT } from './constants';
import { createEventFailure, createEventSuccess } from './actions';
import EventsService from '../../../services/events';
import { logout } from '../../../actions/authActions';

function* clearError() {
  try {
    yield delay(4000);
    yield put(createEventFailure([]));
  } catch (error) {
    yield put(createEventFailure([]));
  }
}

function* createEvent(action) {
  try {
    const response = yield call(EventsService.createEvent, action.payload);
    if (response.ok) {
      const event = response.data;
      const ids = yield select(state => state.events.get('ids'));
      const { ...events } = yield select(state => state.events.get('events'));

      ids.push(event._id);
      events[event._id] = event;

      yield put(createEventSuccess({ ids, events }));
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
      yield put(createEventFailure(errors));
      yield call(clearError);
    }
  } catch (error) {
    yield put(createEventFailure([error.message]));
    yield call(clearError);
  }
}

function* addWatcher() {
  yield takeLatest(CREATE_EVENT, createEvent);
}

export default addWatcher;
