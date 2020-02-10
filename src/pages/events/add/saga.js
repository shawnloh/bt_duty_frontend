import { put, takeLatest, call } from 'redux-saga/effects';
import { CREATE_EVENT } from './constants';
import { createEventFailure, createEventSuccess } from './actions';
import EventsService from '../../../services/events';
import { logout } from '../../../actions/authActions';

function* createEvent(action) {
  try {
    const response = yield call(EventsService.createEvent, action.payload);
    if (response.ok) {
      const event = response.data;

      yield put(createEventSuccess(event));
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
    }
  } catch (error) {
    yield put(createEventFailure([error.message || 'Please try again later']));
  }
}

function* addWatcher() {
  yield takeLatest(CREATE_EVENT, createEvent);
}

export default addWatcher;
