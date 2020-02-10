import { fromJS, List } from 'immutable';
import {
  LOAD_STATUSES_FAILURE,
  LOAD_STATUSES_SUCCESS
} from '../actions/constants';
import {
  ADD_STATUS_SUCCESS,
  DELETE_STATUS_SUCCESS,
  UPDATE_STATUS_SUCCESS
} from '../pages/statuses/constants';

const initialState = fromJS({
  ids: [],
  statuses: {},
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_STATUSES_SUCCESS:
      return state.merge({
        ids: List(payload.ids),
        statuses: fromJS(payload.statuses),
        errors: List()
      });
    case ADD_STATUS_SUCCESS:
      return state.merge({
        ids: state.get('ids').push(payload._id),
        statuses: state.get('statuses').set(payload._id, fromJS(payload))
      });
    case DELETE_STATUS_SUCCESS:
      return state.merge({
        ids: state.get('ids').delete(state.get('ids').indexOf(payload)),
        statuses: state.get('statuses').delete(payload)
      });
    case UPDATE_STATUS_SUCCESS:
      return state.setIn(['statuses', payload._id], fromJS(payload));
    case LOAD_STATUSES_FAILURE:
      return state.merge({
        errors: List(payload)
      });
    default:
      return state;
  }
};
