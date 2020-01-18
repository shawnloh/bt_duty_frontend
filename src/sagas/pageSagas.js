// PAGES SAGAS
import loginPageSaga from '../pages/login/saga';
import loadingPageSaga from '../pages/loading/saga';
import ranksPageSaga from '../pages/ranks/saga';
import platoonsPageSaga from '../pages/platoons/saga';
import pointsPageSaga from '../pages/points/saga';
import statusesPageSaga from '../pages/statuses/saga';
import personnelsPageSaga from '../pages/personnels/saga';
import eventsPageSaga from '../pages/events/saga';

const pageSagas = [
  loginPageSaga(),
  loadingPageSaga(),
  ranksPageSaga(),
  platoonsPageSaga(),
  pointsPageSaga(),
  statusesPageSaga(),
  personnelsPageSaga(),
  eventsPageSaga()
];

export default pageSagas;
