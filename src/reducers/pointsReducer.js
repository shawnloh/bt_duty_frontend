import { Map } from 'immutable';
import { LOAD_POINTS_FAILURE, LOAD_POINTS_SUCCESS } from '../actions/constants';

const initialState = Map({
  ids: [],
  points: {},
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // case ADD_PLATOON_SUCCESS:
    // case DELETE_PLATOON_SUCCESS:
    case LOAD_POINTS_SUCCESS:
      return state.merge({
        ids: payload.ids,
        points: payload.points,
        errors: []
      });
    // case UPDATE_PLATOON_SUCCESS:
    //   return state.merge({
    //     platoons: payload
    //   });
    case LOAD_POINTS_FAILURE:
      return state.merge({
        errors: payload
      });
    default:
      return state;
  }
};
