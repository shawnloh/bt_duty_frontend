import { takeEvery, call, put, all, delay } from 'redux-saga/effects';
import moment from 'moment-timezone';
import {
  ADD_STATUS,
  DELETE_STATUS,
  ADD_BLOCKOUT,
  DELETE_BLOCKOUT,
  EDIT_PERSONNEL_POINT
} from './constants';
import {
  addStatusSuccess,
  addStatusFailure,
  deleteStatusFailure,
  deleteStatusSuccess,
  addBlockoutSuccess,
  addBlockoutFailure,
  deleteBlockoutFailure,
  deleteBlockoutSuccess,
  editPersonnelPointFailure,
  editPersonnelPointSuccess,
  clearErrors
} from './actions';
import { logout } from '../../../actions/authActions';
import PersonnelsService from '../../../services/personnels';

function* clearError() {
  try {
    yield delay(4000);
    yield put(clearErrors());
  } catch (error) {
    yield put(clearErrors());
  }
}
function* addStatus(action) {
  try {
    const { personnelId, statusId } = action.payload;
    let { startDate, endDate } = action.payload;
    startDate = moment(startDate, 'DDMMYY', true).format('DD-MM-YYYY');
    endDate =
      endDate.toLowerCase() === 'permanent'
        ? endDate
        : moment(endDate, 'DDMMYY', true).format('DD-MM-YYYY');

    const response = yield call(
      PersonnelsService.addPersonnelStatus,
      personnelId,
      statusId,
      startDate,
      endDate
    );
    if (response.ok) {
      const status = response.data;

      const newPersonnelStatus = {
        _id: status._id,
        expired: status.expired,
        statusId: status.statusId,
        startDate: status.startDate,
        endDate: status.endDate
      };

      yield put(addStatusSuccess({ personnelId, status: newPersonnelStatus }));
    } else if (response.status === 401) {
      yield put(logout());
    } else {
      let errors = [];
      if (response.data.message) {
        errors.push(response.data.message);
      }

      if (response.data.errors) {
        errors = errors.concat(response.data.errors);
      }
      yield put(addStatusFailure(errors));
      yield call(clearError);
    }
  } catch (error) {
    yield put(addStatusFailure([error.message || 'Please try again later']));
    yield call(clearError);
  }
}

function* deleteStatus(action) {
  try {
    const { personnelId, pStatusId } = action.payload;
    const response = yield call(
      PersonnelsService.deletePersonnelStatus,
      personnelId,
      pStatusId
    );

    if (response.ok) {
      yield put(deleteStatusSuccess({ personnelId, statusId: pStatusId }));
    } else if (response.status === 401) {
      yield put(logout());
    } else {
      let errors = [];
      if (response.data.message) {
        errors.push(response.data.message);
      }

      if (response.data.errors) {
        errors = errors.concat(response.data.errors);
      }
      yield put(deleteStatusFailure(errors));
      yield call(clearError);
    }
  } catch (error) {
    yield put(deleteStatusFailure([error.message || 'Please try again later']));
    yield call(clearError);
  }
}

function* addBlockout(action) {
  try {
    const { personnelId, date } = action.payload;

    const startDate = moment(date.startDate, 'DDMMYY', true).format(
      'DD-MM-YYYY'
    );

    const dateToSubmit = {
      startDate
    };

    if (date.endDate) {
      dateToSubmit.endDate = moment(date.endDate, 'DDMMYY', true).format(
        'DD-MM-YYYY'
      );
    }

    const response = yield call(
      PersonnelsService.addPersonnelBlockout,
      personnelId,
      dateToSubmit
    );

    if (response.ok) {
      const { blockOutDates, _id: id } = response.data;
      yield put(addBlockoutSuccess(id, blockOutDates));
    } else if (response.status === 304) {
      yield put(addBlockoutFailure(['Blockout date already exist']));
      yield call(clearError, addBlockoutFailure);
    } else if (response.status === 401) {
      yield put(logout());
    } else {
      let errors = [];
      if (response.data.message) {
        errors.push(response.data.message);
      }

      if (response.data.errors) {
        errors = errors.concat(response.data.errors);
      }
      yield put(addBlockoutFailure(errors));
      yield call(clearError);
    }
  } catch (error) {
    yield put(addBlockoutFailure([error.message || 'Please try again later']));
    yield call(clearError);
  }
}

function* deleteBlockout(action) {
  try {
    const { personnelId, date } = action.payload;
    const response = yield call(
      PersonnelsService.deletePersonnelBlockout,
      personnelId,
      date
    );
    if (response.ok) {
      const { blockOutDates, _id: id } = response.data;
      yield put(deleteBlockoutSuccess(id, blockOutDates));
    } else if (response.status === 401) {
      yield put(logout());
    } else {
      let errors = [];
      if (response.data.message) {
        errors.push(response.data.message);
      }

      if (response.data.errors) {
        errors = errors.concat(response.data.errors);
      }
      yield put(deleteBlockoutFailure(errors));
      yield call(clearError);
    }
  } catch (error) {
    yield put(deleteBlockoutFailure([error.message]));
    yield call(clearError);
  }
}

function* editPersonnelPoint(action) {
  try {
    const { personnelId, personnelPointId, point } = action.payload;

    const response = yield call(
      PersonnelsService.editPersonnelPoint,
      personnelId,
      personnelPointId,
      point
    );
    if (response.ok) {
      const { points, personId, _id } = response.data.personnelPoint;

      yield put(editPersonnelPointSuccess(personId, _id, points));
    } else if (response.status === 304) {
      yield put(
        editPersonnelPointFailure([
          'Please provide a different point number, must not be the same'
        ])
      );
      yield call(clearError);
    } else if (response.status === 401) {
      yield put(logout());
    } else {
      let errors = [];
      if (response.data.message) {
        errors.push(response.data.message);
      }

      if (response.data.errors) {
        errors = errors.concat(response.data.errors);
      }
      yield put(editPersonnelPointFailure(errors));
      yield call(clearError);
    }
  } catch (error) {
    yield put(
      editPersonnelPointFailure([error.message || 'Please try again later'])
    );
    yield call(clearError);
  }
}

function* singleWatcher() {
  yield all([
    takeEvery(ADD_STATUS, addStatus),
    takeEvery(DELETE_STATUS, deleteStatus),
    takeEvery(ADD_BLOCKOUT, addBlockout),
    takeEvery(DELETE_BLOCKOUT, deleteBlockout),
    takeEvery(EDIT_PERSONNEL_POINT, editPersonnelPoint)
  ]);
}

export default singleWatcher;
