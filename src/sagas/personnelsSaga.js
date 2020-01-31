import {
  all,
  takeLatest,
  select,
  take,
  race,
  put,
  takeEvery,
  call
} from 'redux-saga/effects';

import {
  loadPersonnelsFailure,
  loadPersonnelsSuccess,
  personnelsUpdateEventPoints,
  personnelsUpdatePlatoon,
  personnelsUpdatePointsSystem,
  personnelsUpdateRank,
  personnelsUpdateStatus
} from '../actions/personnelsActions';

import {
  UPDATE_RANK,
  UPDATE_RANK_SUCCESS,
  UPDATE_RANK_FAILURE
} from '../pages/ranks/constants';
import {
  UPDATE_PLATOON,
  UPDATE_PLATOON_FAILURE,
  UPDATE_PLATOON_SUCCESS
} from '../pages/platoons/constants';

import {
  CREATE_EVENT_SUCCESS,
  DELETE_EVENT,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_SUCCESS
} from '../pages/events/constants';

import {
  ADD_POINT_SUCCESS,
  DELETE_POINT,
  DELETE_POINT_SUCCESS,
  DELETE_POINT_FAILURE,
  UPDATE_POINT_SUCCESS
} from '../pages/points/constants';

import {
  UPDATE_STATUS,
  UPDATE_STATUS_FAILURE,
  UPDATE_STATUS_SUCCESS
} from '../pages/statuses/constants';

import PersonnelsService from '../services/personnels';

function* refreshPersonnelsFromServer() {
  try {
    const response = yield call(PersonnelsService.getPersonnels);
    if (response.ok) {
      const personnels = {};
      const ids = [];

      response.data.forEach(rank => {
        const { _id: id } = rank;
        personnels[id] = rank;
        ids.push(id);
      });
      yield put(loadPersonnelsSuccess({ ids, personnels }));
    } else {
      yield put(
        loadPersonnelsFailure(response.data.message || response.data.errors)
      );
    }
  } catch (error) {
    yield put(loadPersonnelsFailure([error.message]));
  }
}
function* updatePersonnelsPointSystemName() {
  const personnelsState = yield select(state => state.personnels);
  const { ...points } = yield select(state => state.points.get('points'));

  const ids = personnelsState.get('ids');
  const { ...personnels } = personnelsState.get('personnels');

  ids.forEach(id => {
    const person = personnels[id];
    person.points = person.points.map(point => {
      const currPoint = point;
      currPoint.pointSystem = points[currPoint.pointSystem._id];
      return currPoint;
    });
  });
  yield put(personnelsUpdatePointsSystem(personnels));
}

function* deletePersonnelsPointsSystem(action) {
  const eventIdToDelete = action.payload;
  const { success } = yield race({
    success: take(DELETE_POINT_SUCCESS),
    failure: take(DELETE_POINT_FAILURE)
  });
  if (success) {
    const personnelsState = yield select(state => state.personnels);
    const ids = personnelsState.get('ids');
    const { ...personnels } = personnelsState.get('personnels');
    ids.forEach(id => {
      const person = personnels[id];
      person.points = person.points.filter(point => {
        return point.pointSystem._id !== eventIdToDelete;
      });
    });

    yield put(personnelsUpdatePointsSystem(personnels));
  }
}

function* deleteEventUpdatePoints(action) {
  const { revert, eventId } = action.payload;
  const allEvents = yield select(state => state.events.get('events'));
  const event = allEvents[eventId];
  if (revert) {
    const { success } = yield race({
      success: take(DELETE_EVENT_SUCCESS),
      failure: take(DELETE_EVENT_FAILURE)
    });
    if (success) {
      const { ...personnels } = yield select(state =>
        state.personnels.get('personnels')
      );
      const personnelIds = event.personnels.map(person => person._id);

      personnelIds.forEach(id => {
        const person = personnels[id];
        person.points = person.points.map(point => {
          if (point.pointSystem._id === event.pointSystem._id) {
            const currPoint = point;
            currPoint.points -= event.pointsAllocation;
            return currPoint;
          }
          return point;
        });
      });
      yield put(personnelsUpdateEventPoints(personnels));
    }
  }
}

function* updatePersonnelsPlatoonName(action) {
  const { id, name } = action.payload;
  const { success } = yield race({
    success: take(UPDATE_PLATOON_SUCCESS),
    failure: take(UPDATE_PLATOON_FAILURE)
  });
  if (success) {
    const personnelsState = yield select(state => state.personnels);
    const ids = personnelsState.get('ids');
    const { ...personnels } = personnelsState.get('personnels');
    ids.forEach(personId => {
      const person = personnels[personId];
      if (person.platoon._id === id) {
        person.platoon.name = String(name).toUpperCase();
      }
    });
    yield put(personnelsUpdatePlatoon(personnels));
  }
}

function* updatePersonnelsRankName(action) {
  const { id, name } = action.payload;
  const { success } = yield race({
    success: take(UPDATE_RANK_SUCCESS),
    failure: take(UPDATE_RANK_FAILURE)
  });

  if (success) {
    const personnelsState = yield select(state => state.personnels);
    const ids = personnelsState.get('ids');
    const { ...personnels } = personnelsState.get('personnels');
    ids.forEach(personId => {
      const person = personnels[personId];
      if (person.rank._id === id) {
        person.rank.name = String(name).toUpperCase();
      }
    });
    yield put(personnelsUpdateRank(personnels));
  }
}

function* updateStatusesName(action) {
  const { id, name } = action.payload;
  const { success } = yield race({
    success: take(UPDATE_STATUS_SUCCESS),
    failure: take(UPDATE_STATUS_FAILURE)
  });

  if (success) {
    const personnelsState = yield select(state => state.personnels);
    const ids = personnelsState.get('ids');
    const { ...personnels } = personnelsState.get('personnels');
    ids.forEach(personId => {
      const person = personnels[personId];
      person.statuses = person.statuses.map(status => {
        const currStatus = status;
        if (currStatus.statusId._id === id) {
          currStatus.statusId.name = String(name).toUpperCase();
        }
        return currStatus;
      });
    });
    yield put(personnelsUpdateStatus(personnels));
  }
}

function* personnelsSagaWatcher() {
  yield all([
    takeLatest(UPDATE_POINT_SUCCESS, updatePersonnelsPointSystemName),
    takeEvery(UPDATE_PLATOON, updatePersonnelsPlatoonName),
    takeEvery(UPDATE_RANK, updatePersonnelsRankName),
    takeEvery(UPDATE_STATUS, updateStatusesName),
    takeEvery(DELETE_POINT, deletePersonnelsPointsSystem),
    takeEvery(DELETE_EVENT, deleteEventUpdatePoints),
    takeLatest(ADD_POINT_SUCCESS, refreshPersonnelsFromServer),
    takeLatest(CREATE_EVENT_SUCCESS, refreshPersonnelsFromServer)
  ]);
}

export default personnelsSagaWatcher;
