import {
  LOAD_STATUSES,
  LOAD_STATUSES_FAILURE,
  LOAD_STATUSES_SUCCESS
} from './constants';

export const loadStatuses = () => ({
  type: LOAD_STATUSES
});

export const loadStatusesSuccess = payload => ({
  type: LOAD_STATUSES_SUCCESS,
  payload
});

export const loadStatusesFailure = errors => ({
  type: LOAD_STATUSES_FAILURE,
  payload: errors
});
