import {
  LOAD_EVENTS,
  LOAD_EVENTS_FAILURE,
  LOAD_EVENTS_SUCCESS
} from './constants';

export const loadEvents = () => ({
  type: LOAD_EVENTS
});

export const loadEventsSuccess = payload => ({
  type: LOAD_EVENTS_SUCCESS,
  payload
});

export const loadEventsFailure = payload => ({
  type: LOAD_EVENTS_FAILURE,
  payload
});
