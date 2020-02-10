import { createSelector } from 'reselect';

const platoonIds = state => state.platoons.get('ids');
const allPlatoons = state => state.platoons.get('platoons');
const getPlatoons = createSelector(
  platoonIds,
  allPlatoons,
  (ids, byPlatoonIds) => ids.map(id => byPlatoonIds.get(id))
);

export { getPlatoons };

export default getPlatoons;
