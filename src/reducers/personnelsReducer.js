import { Map } from 'immutable';
import {
  LOAD_PERSONNELS_FAILURE,
  LOAD_PERSONNELS_SUCCESS
} from '../actions/constants';
import {
  DELETE_PERSONNEL_SUCCESS,
  ADD_PERSONNEL_SUCCESS
} from '../pages/personnels/constants';

const initialState = Map({
  ids: [],
  personnels: {},
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PERSONNELS_SUCCESS:
    case DELETE_PERSONNEL_SUCCESS:
    case ADD_PERSONNEL_SUCCESS:
      return state.merge({
        ids: payload.ids,
        personnels: payload.personnels
      });
    case LOAD_PERSONNELS_FAILURE:
      return state.merge({
        errors: payload
      });
    default:
      return state;
  }
};
