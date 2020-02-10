import { fromJS, List } from 'immutable';
import {
  LOAD_PLATOONS_FAILURE,
  LOAD_PLATOONS_SUCCESS
} from '../actions/constants';
import {
  ADD_PLATOON_SUCCESS,
  DELETE_PLATOON_SUCCESS,
  UPDATE_PLATOON_SUCCESS
} from '../pages/platoons/constants';

const initialState = fromJS({
  ids: [],
  platoons: {},
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PLATOONS_SUCCESS:
      return state.merge({
        ids: List(payload.ids),
        platoons: fromJS(payload.platoons),
        errors: List()
      });
    case ADD_PLATOON_SUCCESS:
      return state.merge({
        ids: state.get('ids').push(payload._id),
        platoons: state.get('platoons').set(payload._id, fromJS(payload))
      });
    case DELETE_PLATOON_SUCCESS:
      return state.merge({
        ids: state.get('ids').delete(state.get('ids').indexOf(payload)),
        platoons: state.get('platoons').delete(payload)
      });
    case UPDATE_PLATOON_SUCCESS:
      return state.setIn(['platoons', payload._id], fromJS(payload));
    case LOAD_PLATOONS_FAILURE:
      return state.merge({
        errors: List(payload)
      });
    default:
      return state;
  }
};
