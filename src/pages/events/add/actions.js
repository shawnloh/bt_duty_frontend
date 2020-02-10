import {
  CREATE_EVENT,
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_SUCCESS
} from './constants';

export const createEvent = payload => ({
  type: CREATE_EVENT,
  payload
});

export const createEventSuccess = payload => ({
  type: CREATE_EVENT_SUCCESS,
  payload
});

export const createEventFailure = errors => ({
  type: CREATE_EVENT_FAILURE,
  payload: errors
});
