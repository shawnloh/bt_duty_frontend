import { takeLatest, call, all, put, delay, select } from 'redux-saga/effects';
import { LOAD_APP } from './constants';
import { loadRanksSuccess, loadRanksFailure } from '../../actions/ranksActions';
import {
  loadPlatoonsFailure,
  loadPlatoonsSuccess
} from '../../actions/platoonsActions';
import {
  loadPointsFailure,
  loadPointsSuccess
} from '../../actions/pointsActions';
import {
  loadEventsSuccess,
  loadEventsFailure
} from '../../actions/eventsActions';
import {
  loadPersonnelsFailure,
  loadPersonnelsSuccess
} from '../../actions/personnelsActions';
import {
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

function* loadPoints() {
  try {
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
    } else {
      yield put(
        loadPointsFailure(response.data.message || response.data.errors)
      );
    }
  } catch (error) {
    yield put(loadPointsFailure([error.message]));
  }
}

function* loadRanks() {
  try {
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
    } else {
      yield put(
        loadRanksFailure(response.data.message || response.data.errors)
      );
    }
  } catch (error) {
    yield put(loadRanksFailure([error.message]));
  }
}

function* loadPlatoons() {
  try {
    const response = yield call(PlatoonsService.getPlatoons);
    if (response.ok) {
      const platoons = {};
      const ids = [];

      response.data.forEach(rank => {
        const { _id: id } = rank;
        platoons[id] = rank;
        ids.push(id);
      });
      yield put(loadPlatoonsSuccess({ ids, platoons }));
    } else {
      yield put(
        loadPlatoonsFailure(response.data.message || response.data.errors)
      );
    }
  } catch (error) {
    yield put(loadPlatoonsFailure([error.message]));
  }
}

function* loadEvents() {
  try {
    const response = yield call(EventsService.getEvents);
    if (response.ok) {
      const events = {};
      const ids = [];

      response.data.forEach(rank => {
        const { _id: id } = rank;
        events[id] = rank;
        ids.push(id);
      });
      yield put(loadEventsSuccess({ ids, events }));
    } else {
      yield put(
        loadEventsFailure(response.data.message || response.data.errors)
      );
    }
  } catch (error) {
    yield put(loadEventsFailure([error.message]));
  }
}

function* loadPersonnels() {
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

function* loadStatuses() {
  try {
    const response = yield call(StatusesService.getStatuses);
    if (response.ok) {
      const statuses = {};
      const ids = [];

      response.data.forEach(rank => {
        const { _id: id } = rank;
        statuses[id] = rank;
        ids.push(id);
      });
      yield put(loadStatusesSuccess({ ids, statuses }));
    } else {
      yield put(
        loadStatusesFailure(response.data.message || response.data.errors)
      );
    }
  } catch (error) {
    yield put(loadStatusesFailure([error.message]));
  }
}

function* loadEssentials() {
  try {
    yield all([
      call(loadRanks),
      call(loadPlatoons),
      call(loadPoints),
      call(loadEvents),
      call(loadPersonnels),
      call(loadStatuses)
    ]);
    yield put(loadAppSuccess());
  } catch (error) {
    yield put(loadAppFailed());
  }
}

function* refresh() {
  while (true) {
    const threeMinute = 1000 * 60 * 3;
    yield delay(threeMinute);
    const isAuth = yield select(state => state.auth.get('isAuthenticated'));
    if (isAuth) {
      yield call(loadEssentials);
    }
  }
}

function* loadingWatcher() {
  yield all([takeLatest(LOAD_APP, loadEssentials), refresh()]);
}

export default loadingWatcher;
