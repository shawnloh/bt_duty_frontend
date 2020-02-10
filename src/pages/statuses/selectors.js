import { createSelector } from 'reselect';

const statusIds = state => state.statuses.get('ids');
const allStatuses = state => state.statuses.get('statuses');
const getStatuses = createSelector(statusIds, allStatuses, (ids, byStatusIds) =>
  ids.map(id => byStatusIds.get(id))
);

export { getStatuses };

export default getStatuses;
