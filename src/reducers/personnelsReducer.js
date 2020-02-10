import { fromJS, List } from 'immutable';
import {
  LOAD_PERSONNELS_FAILURE,
  LOAD_PERSONNELS_SUCCESS,
  PERSONNELS_UPDATE_EVENT_POINTS,
  PERSONNELS_UPDATE_PLATOON_NAME,
  PERSONNELS_UPDATE_POINTS_SYSTEM,
  PERSONNELS_UPDATE_RANK_NAME,
  PERSONNELS_UPDATE_STATUS_NAME
} from '../actions/constants';
import {
  DELETE_PERSONNEL_SUCCESS,
  ADD_PERSONNEL_SUCCESS,
  ADD_STATUS_SUCCESS,
  DELETE_STATUS_SUCCESS,
  ADD_BLOCKOUT_SUCCESS,
  DELETE_BLOCKOUT_SUCCESS,
  EDIT_PERSONNEL_POINT_SUCCESS,
  UPDATE_PERSON_SUCCESS
} from '../pages/personnels/constants';

const initialState = fromJS({
  ids: [],
  personnels: {},
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PERSONNELS_SUCCESS:
      return state.merge({
        ids: List(payload.ids),
        personnels: fromJS(payload.personnels),
        errors: List()
      });
    case LOAD_PERSONNELS_FAILURE:
      return state.merge({
        errors: List(payload)
      });
    case DELETE_PERSONNEL_SUCCESS:
      return state.merge({
        ids: state.get('ids').delete(state.get('ids').indexOf(payload)),
        personnels: state.get('personnels').delete(payload)
      });
    case ADD_STATUS_SUCCESS:
      return state.updateIn(
        ['personnels', payload.personnelId, 'statuses'],
        statuses => statuses.push(fromJS(payload.status))
      );
    case DELETE_STATUS_SUCCESS:
      return state.updateIn(
        ['personnels', payload.personnelId, 'statuses'],
        statuses =>
          statuses.filter(status => status.get('_id') !== payload.statusId)
      );
    case ADD_BLOCKOUT_SUCCESS:
    case DELETE_BLOCKOUT_SUCCESS:
      return state.setIn(
        ['personnels', payload.personnelId, 'blockOutDates'],
        List(payload.blockoutDates)
      );
    case EDIT_PERSONNEL_POINT_SUCCESS:
      return state.updateIn(
        ['personnels', payload.personnelId, 'points'],
        points => {
          return points.map(point => {
            if (point.get('_id') === payload.personnelPointId) {
              return point.set('points', payload.points);
            }
            return point;
          });
        }
      );
    case UPDATE_PERSON_SUCCESS:
      return state.mergeIn(['personnels', payload._id], fromJS(payload));
    case PERSONNELS_UPDATE_EVENT_POINTS:
    case PERSONNELS_UPDATE_PLATOON_NAME:
    case PERSONNELS_UPDATE_RANK_NAME:
    case PERSONNELS_UPDATE_POINTS_SYSTEM:
    case PERSONNELS_UPDATE_STATUS_NAME:
      return state.merge({
        personnels: payload
      });
    case ADD_PERSONNEL_SUCCESS:
      return state.merge({
        ids: state.get('ids').push(payload._id),
        personnels: state.get('personnels').set(payload._id, fromJS(payload))
      });
    default:
      return state;
  }
};
