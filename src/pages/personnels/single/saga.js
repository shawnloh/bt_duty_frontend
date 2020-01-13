import { takeLatest, call, put, select } from 'redux-saga/effects';
import moment from 'moment-timezone';
import { ADD_STATUS, DELETE_STATUS } from './constants';
import { addStatusSuccess, addStatusFailure } from './actions';
import { logout } from '../../../actions/authActions';
import PersonnelsService from '../../../services/personnels';

function* addStatus(action) {
  try {
    const { personnelId, statusId } = action.payload;
    let { startDate, endDate } = action.payload;
    startDate = moment(startDate, 'DDMMYY', true).format('DD-MM-YYYY');
    endDate = moment(endDate, 'DDMMYY', true).format('DD-MM-YYYY');
    const response = yield call(
      PersonnelsService.addPersonnelStatus,
      personnelId,
      statusId,
      startDate,
      endDate
    );
    if (response.ok) {
      const status = response.data;
      const { ...personnels } = yield select(state =>
        state.personnels.get('personnels')
      );
      const statusToPush = {
        _id: status._id,
        expired: status.expired,
        statusId: status.statusId,
        startDate: status.startDate,
        endDate: status.endDate
      };
      personnels[personnelId].statuses.push(statusToPush);
      yield put(addStatusSuccess(personnels));
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
    }
  } catch (error) {
    yield put(addStatusFailure([error.message]));
  }
}

function* singleWatcher() {
  yield takeLatest(ADD_STATUS, addStatus);
}

export default singleWatcher;
