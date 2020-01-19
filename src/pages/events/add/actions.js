import {
  CREATE_EVENT,
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_SUCCESS
} from './constants';

export const createEvent = payload => ({
  type: CREATE_EVENT,
  payload
});

export const createEventSuccess = ({ ids, events }) => ({
  type: CREATE_EVENT_SUCCESS,
  payload: { ids, events }
});

export const createEventFailure = errors => ({
  type: CREATE_EVENT_FAILURE,
  payload: errors
});
