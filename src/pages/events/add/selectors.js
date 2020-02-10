import { createSelector } from 'reselect';

const pointIds = state => state.points.get('ids');
const allPoints = state => state.points.get('points');
const getPoints = createSelector(pointIds, allPoints, (ids, byPointIds) =>
  ids.map(id => byPointIds.get(id))
);

const statusIds = state => state.statuses.get('ids');
const allStatuses = state => state.statuses.get('statuses');
const getStatuses = createSelector(statusIds, allStatuses, (ids, byStatusIds) =>
  ids.map(id => byStatusIds.get(id))
);

const rankIds = state => state.ranks.get('ids');
const allRanks = state => state.ranks.get('ranks');
const getRanks = createSelector(rankIds, allRanks, (ids, byRankIds) =>
  ids.map(id => byRankIds.get(id))
);

const platoonIds = state => state.platoons.get('ids');
const allPlatoons = state => state.platoons.get('platoons');
const getPlatoons = createSelector(
  platoonIds,
  allPlatoons,
  (ids, byPlatoonIds) => ids.map(id => byPlatoonIds.get(id))
);

export { getPoints, getStatuses, getRanks, getPlatoons };
