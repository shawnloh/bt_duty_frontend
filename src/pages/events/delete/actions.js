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

export const deleteEventSuccess = id => ({
  type: DELETE_EVENT_SUCCESS,
  payload: id
});

export const deleteEventFailure = errors => ({
  type: DELETE_EVENT_FAILURE,
  payload: errors
});
