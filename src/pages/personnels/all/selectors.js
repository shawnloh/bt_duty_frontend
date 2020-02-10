import { createSelector } from 'reselect';

const personnelIds = state => state.personnels.get('ids');
const allPersonnels = state => state.personnels.get('personnels');
const getPersonnels = createSelector(
  personnelIds,
  allPersonnels,
  (ids, byIds) => ids.map(id => byIds.get(id))
);

export { getPersonnels };

export default getPersonnels;
