import {
  UPDATE_EVENT,
  UPDATE_EVENT_FAILURE,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_NO_CHANGE
} from './constants';

export const updateEvent = (eventId, personnels) => ({
  type: UPDATE_EVENT,
  payload: {
    eventId,
    personnels
  }
});

export const updateEventSuccess = payload => ({
  type: UPDATE_EVENT_SUCCESS,
  payload
});

export const updateEventFailure = errors => ({
  type: UPDATE_EVENT_FAILURE,
  payload: errors
});

export const updateEventNoChange = () => ({
  type: UPDATE_EVENT_NO_CHANGE
});
