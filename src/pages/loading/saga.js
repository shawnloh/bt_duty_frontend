import { takeLatest, call, all, put, delay, select } from 'redux-saga/effects';
import { logout } from '../../actions/authActions';
import { LOAD_APP } from './constants';
import {
  loadRanksSuccess,
  loadRanksFailure,
  loadRanks
} from '../../actions/ranksActions';
import {
  loadPlatoons,
  loadPlatoonsFailure,
  loadPlatoonsSuccess
} from '../../actions/platoonsActions';
import {
  loadPoints,
  loadPointsFailure,
  loadPointsSuccess
} from '../../actions/pointsActions';
import {
  loadEvents,
  loadEventsSuccess,
  loadEventsFailure
} from '../../actions/eventsActions';
import {
  loadPersonnels,
  loadPersonnelsFailure,
  loadPersonnelsSuccess
} from '../../actions/personnelsActions';
import {
  loadStatuses,
  loadStatusesFailure,
  loadStatusesSuccess
} from '../../actions/statusesActions';

import { loadAppSuccess, loadAppFailed } from './actions';
import RanksService from '../../services/ranks';
import PlatoonsService from '../../services/platoons';
import PointsService from '../../services/points';
import EventsService from '../../services/events';
import PersonnelsService from '../../services/personnels';
import StatusesService from '../../services/statuses';

const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED'
};

function* loadPointsSaga() {
  yield put(loadPoints());
  const response = yield call(PointsService.getPoints);
  if (response.ok) {
    const points = {};
    const ids = [];

    response.data.forEach(point => {
      const { _id: id } = point;
      points[id] = point;
      ids.push(id);
    });
    yield put(loadPointsSuccess({ ids, points }));
  } else if (response.status === 401) {
    throw new Error(ERROR_CODES.UNAUTHORIZED);
  } else {
    let errors = [];
    if (response.data.message) {
      errors = errors.concat(response.data.message);
    }
    if (response.data.errors) {
      errors = errors.concat(response.data.errors);
    }
    yield put(loadPointsFailure(errors));
  }
}

function* loadRanksSaga() {
  yield put(loadRanks());
  const response = yield call(RanksService.getRanks);
  if (response.ok) {
    const ranks = {};
    const ids = [];

    response.data.forEach(rank => {
      const { _id: id } = rank;
      ranks[id] = rank;
      ids.push(id);
    });
    yield put(loadRanksSuccess({ ids, ranks }));
  } else if (response.status === 401) {
    throw new Error(ERROR_CODES.UNAUTHORIZED);
  } else {
    yield put(loadRanksFailure(response.data.message || response.data.errors));
  }
}

function* loadPlatoonsSaga() {
  yield put(loadPlatoons());
  const response = yield call(PlatoonsService.getPlatoons);
  if (response.ok) {
    const platoons = {};
    const ids = [];

    response.data.forEach(platoon => {
      const { _id: id } = platoon;
      platoons[id] = platoon;
      ids.push(id);
    });
    yield put(loadPlatoonsSuccess({ ids, platoons }));
  } else if (response.status === 401) {
    throw new Error(ERROR_CODES.UNAUTHORIZED);
  } else {
    yield put(
      loadPlatoonsFailure(response.data.message || response.data.errors)
    );
  }
}

function* loadEventsSaga() {
  yield put(loadEvents());
  const response = yield call(EventsService.getEvents);
  if (response.ok) {
    const events = {};
    const ids = [];

    response.data.forEach(event => {
      const { _id: id } = event;
      events[id] = event;
      ids.push(id);
    });
    yield put(loadEventsSuccess({ ids, events }));
  } else if (response.status === 401) {
    throw new Error(ERROR_CODES.UNAUTHORIZED);
  } else {
    yield put(loadEventsFailure(response.data.message || response.data.errors));
  }
}

function* loadPersonnelsSaga() {
  yield put(loadPersonnels());
  const response = yield call(PersonnelsService.getPersonnels);
  if (response.ok) {
    const personnels = {};
    const ids = [];

    response.data.forEach(person => {
      const { _id: id } = person;
      personnels[id] = person;
      ids.push(id);
    });
    yield put(loadPersonnelsSuccess({ ids, personnels }));
  } else if (response.status === 401) {
    throw new Error(ERROR_CODES.UNAUTHORIZED);
  } else {
    yield put(
      loadPersonnelsFailure(response.data.message || response.data.errors)
    );
  }
}

function* loadStatusesSaga() {
  yield put(loadStatuses());
  const response = yield call(StatusesService.getStatuses);
  if (response.ok) {
    const statuses = {};
    const ids = [];

    response.data.forEach(status => {
      const { _id: id } = status;
      statuses[id] = status;
      ids.push(id);
    });
    yield put(loadStatusesSuccess({ ids, statuses }));
  } else if (response.status === 401) {
    throw new Error(ERROR_CODES.UNAUTHORIZED);
  } else {
    yield put(
      loadStatusesFailure(response.data.message || response.data.errors)
    );
  }
  return false;
}

function* loadEssentials() {
  try {
    yield all([
      call(loadRanksSaga),
      call(loadPlatoonsSaga),
      call(loadPointsSaga),
      call(loadEventsSaga),
      call(loadPersonnelsSaga),
      call(loadStatusesSaga)
    ]);
    yield put(loadAppSuccess());
  } catch (error) {
    if (error.message === ERROR_CODES.UNAUTHORIZED) {
      yield put(logout());
    }
    yield put(loadAppFailed());
  }
}

function* refresh() {
  while (true) {
    try {
      const threeMinute = 1000 * 60 * 3;
      yield delay(threeMinute);
      const isAuth = yield select(state => state.auth.get('isAuthenticated'));
      if (isAuth) {
        yield call(loadEssentials);
      }
    } catch (error) {
      if (error.message === ERROR_CODES.UNAUTHORIZED) {
        yield put(logout());
      }
    }
  }
}

function* loadingWatcher() {
  yield all([takeLatest(LOAD_APP, loadEssentials), refresh()]);
}

export default loadingWatcher;
