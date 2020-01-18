import {
  DELETE_EVENT,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_SUCCESS
} from './constants';

export const deleteEvent = ({ eventId, revert = false }) => ({
  type: DELETE_EVENT,
  payload: {
    eventId,
    revert
  }
});

export const deleteEventSuccess = ({ ids, events }) => ({
  type: DELETE_EVENT_SUCCESS,
  payload: {
    ids,
    events
  }
});

export const deleteEventFailure = errors => ({
  type: DELETE_EVENT_FAILURE,
  payload: errors
});
