import { createSelector } from 'reselect';

const getPerson = createSelector(
  state => state.personnels.get('personnels'),
  (_, personnelId) => personnelId,
  (personnels, id) => personnels.get(id)
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

export { getPerson, getRanks, getPlatoons };
