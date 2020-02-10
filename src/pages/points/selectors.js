import { createSelector } from 'reselect';

const pointIds = state => state.points.get('ids');
const allPoints = state => state.points.get('points');
const getPoints = createSelector(pointIds, allPoints, (ids, byPointIds) =>
  ids.map(id => byPointIds.get(id))
);

export { getPoints };

export default getPoints;
