import { createSelector } from 'reselect';

const personnelIds = state => state.personnels.get('ids');
const allPersonnels = state => state.personnels.get('personnels');
const getPersonnels = createSelector(
  personnelIds,
  allPersonnels,
  (ids, byPersonnelIds) => ids.map(id => byPersonnelIds.get(id))
);

const allEvents = state => state.events.get('events');

const getEventById = createSelector(
  allEvents,
  (_, id) => id,
  (eventById, id) => eventById.get(id)
);

export { getPersonnels, getEventById };
export default getPersonnels;
