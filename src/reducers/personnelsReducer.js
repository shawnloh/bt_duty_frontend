import { Map } from 'immutable';
import {
  LOAD_PERSONNELS_FAILURE,
  LOAD_PERSONNELS_SUCCESS,
  PERSONNELS_UPDATE_EVENT_POINTS,
  PERSONNELS_UPDATE_PLATOON_NAME,
  PERSONNELS_UPDATE_POINTS_SYSTEM,
  PERSONNELS_UPDATE_RANK_NAME
} from '../actions/constants';
import {
  DELETE_PERSONNEL_SUCCESS,
  ADD_PERSONNEL_SUCCESS,
  ADD_STATUS_SUCCESS,
  DELETE_STATUS_SUCCESS,
  ADD_BLOCKOUT_SUCCESS,
  DELETE_BLOCKOUT_SUCCESS,
  EDIT_PERSONNEL_POINT_SUCCESS
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
    case DELETE_STATUS_SUCCESS:
    case ADD_STATUS_SUCCESS:
    case ADD_BLOCKOUT_SUCCESS:
    case DELETE_BLOCKOUT_SUCCESS:
    case EDIT_PERSONNEL_POINT_SUCCESS:
    case PERSONNELS_UPDATE_EVENT_POINTS:
    case PERSONNELS_UPDATE_PLATOON_NAME:
    case PERSONNELS_UPDATE_RANK_NAME:
    case PERSONNELS_UPDATE_POINTS_SYSTEM:
      return state.merge({
        personnels: payload
      });
    case LOAD_PERSONNELS_FAILURE:
      return state.merge({
        errors: payload
      });
    default:
      return state;
  }
};
