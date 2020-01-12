import { combineReducers } from 'redux';
import loginPageReducer from '../pages/login/reducer';
import loadingPageReducer from '../pages/loading/reducer';
import ranksPageReducer from '../pages/ranks/reducer';
import platoonsPageReducer from '../pages/platoons/reducer';
import pointsPageReducer from '../pages/points/reducer';
import statusesPageReducer from '../pages/statuses/reducer';
import personnelsPageReducer from '../pages/personnels/reducer';

const pages = combineReducers({
  login: loginPageReducer,
  loading: loadingPageReducer,
  ranks: ranksPageReducer,
  platoons: platoonsPageReducer,
  points: pointsPageReducer,
  statuses: statusesPageReducer,
  personnels: personnelsPageReducer
});

export default pages;
