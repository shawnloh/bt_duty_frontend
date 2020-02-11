import { Map } from 'immutable';
import { LOAD_APP, LOAD_APP_FAILURE, LOAD_APP_SUCCESS } from './constants';
import * as CONST from '../../actions/constants';

const initialState = Map({
  isLoading: false,
  appLoaded: false,
  appLoadedFailure: false,
  taskLoading: 6
});

export default (state = initialState, { type }) => {
  switch (type) {
    case CONST.LOAD_EVENTS:
    case CONST.LOAD_PERSONNELS:
    case CONST.LOAD_PLATOONS:
    case CONST.LOAD_POINTS:
    case CONST.LOAD_RANKS:
    case CONST.LOAD_STATUSES:
      return state.update('taskLoading', val => val + 1);
    case CONST.LOAD_EVENTS_SUCCESS:
    case CONST.LOAD_PERSONNELS_SUCCESS:
    case CONST.LOAD_PLATOONS_SUCCESS:
    case CONST.LOAD_POINTS_SUCCESS:
    case CONST.LOAD_RANKS_SUCCESS:
    case CONST.LOAD_STATUSES_SUCCESS:
    case CONST.LOAD_EVENTS_FAILURE:
    case CONST.LOAD_PERSONNELS_FAILURE:
    case CONST.LOAD_PLATOONS_FAILURE:
    case CONST.LOAD_POINTS_FAILURE:
    case CONST.LOAD_RANKS_FAILURE:
    case CONST.LOAD_STATUSES_FAILURE:
      return state.update('taskLoading', val => (val === 0 ? 0 : val - 1));
    case LOAD_APP:
      return state.merge({
        isLoading: true,
        appLoaded: false,
        appLoadedFailure: false
      });
    case LOAD_APP_FAILURE:
      return state.merge({
        taskLoading: 0,
        isLoading: false,
        appLoaded: false,
        appLoadedFailure: true
      });
    case LOAD_APP_SUCCESS:
      return state.merge({
        taskLoading: 0,
        isLoading: false,
        appLoaded: true
      });
    default:
      return state;
  }
};
