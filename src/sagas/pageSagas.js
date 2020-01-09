// PAGES SAGAS
import loginPageSaga from '../pages/login/saga';
import loadingPageSaga from '../pages/loading/saga';
import ranksPageSaga from '../pages/ranks/saga';
import platoonsPageSaga from '../pages/platoons/saga';
import pointsPageSaga from '../pages/points/saga';

const pageSagas = [
  loginPageSaga(),
  loadingPageSaga(),
  ranksPageSaga(),
  platoonsPageSaga(),
  pointsPageSaga()
];

export default pageSagas;
