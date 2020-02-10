import { createSelector } from 'reselect';

const eventIds = state => state.events.get('ids');
const allEvents = state => state.events.get('events');
const getEvents = createSelector(eventIds, allEvents, (ids, byEventIds) =>
  ids.map(id => byEventIds.get(id))
);

const pointIds = state => state.points.get('ids');
const allPoints = state => state.points.get('points');
const getPoints = createSelector(pointIds, allPoints, (ids, byPointIds) =>
  ids.map(id => byPointIds.get(id))
);

export { getEvents, getPoints };
