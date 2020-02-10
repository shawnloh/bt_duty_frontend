import { fromJS, List } from 'immutable';
import { LOAD_POINTS_FAILURE, LOAD_POINTS_SUCCESS } from '../actions/constants';
import {
  ADD_POINT_SUCCESS,
  DELETE_POINT_SUCCESS,
  UPDATE_POINT_SUCCESS
} from '../pages/points/constants';

const initialState = fromJS({
  ids: [],
  points: {},
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_POINTS_SUCCESS:
      return state.merge({
        ids: List(payload.ids),
        points: fromJS(payload.points),
        errors: List()
      });
    case ADD_POINT_SUCCESS:
      return state.merge({
        ids: state.get('ids').push(payload._id),
        points: state.get('points').set(payload._id, fromJS(payload))
      });
    case DELETE_POINT_SUCCESS:
      return state.merge({
        ids: state.get('ids').delete(state.get('ids').indexOf(payload)),
        points: state.get('points').delete(payload)
      });
    case UPDATE_POINT_SUCCESS:
      return state.setIn(['points', payload._id], fromJS(payload));
    case LOAD_POINTS_FAILURE:
      return state.merge({
        errors: List(payload)
      });
    default:
      return state;
  }
};
