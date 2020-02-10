import { createSelector } from 'reselect';

const rankIds = state => state.ranks.get('ids');
const allRanks = state => state.ranks.get('ranks');
const getRanks = createSelector(rankIds, allRanks, (ids, byRankIds) =>
  ids.map(id => byRankIds.get(id))
);

export { getRanks };

export default getRanks;
