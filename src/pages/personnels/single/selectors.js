import { createSelector } from 'reselect';

const statusIds = state => state.statuses.get('ids');
const allStatuses = state => state.statuses.get('statuses');
const getStatuses = createSelector(statusIds, allStatuses, (ids, byIds) =>
  ids.map(id => byIds.get(id))
);

export { getStatuses };

export default getStatuses;
