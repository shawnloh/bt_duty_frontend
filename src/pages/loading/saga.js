import { takeLatest, call, all, put } from 'redux-saga/effects';
import { LOAD_APP } from './constants';
import { loadRanksSuccess, loadRanksFailure } from '../../actions/ranksActions';
import {
  loadPlatoonsFailure,
  loadPlatoonsSuccess
} from '../../actions/platoonsActions';
import {
  loadEventsSuccess,
  loadEventsFailure
} from '../../actions/eventsActions';
import {
  loadPersonnelsFailure,
  loadPersonnelsSuccess
} from '../../actions/personnelsActions';
import { loadAppSuccess, loadAppFailed } from './actions';
import RanksService from '../../services/ranks';
import PlatoonsService from '../../services/platoons';
import EventsService from '../../services/events';
import PersonnelsService from '../../services/personnels';

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

function* loadEssentials() {
  try {
    yield all([
      call(loadRanks),
      call(loadPlatoons),
      call(loadEvents),
      call(loadPersonnels)
    ]);
    yield put(loadAppSuccess());
  } catch (error) {
    yield put(loadAppFailed());
  }
}

function* loadingWatcher() {
  yield takeLatest(LOAD_APP, loadEssentials);
}

export default loadingWatcher;
