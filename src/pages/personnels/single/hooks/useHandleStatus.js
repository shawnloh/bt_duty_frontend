import { useCallback } from 'react';

export function useHandleAddStatus(dispatch, addFunc, personnelId) {
  const addHandler = useCallback(
    ({ statusId, startDate, endDate }) => {
      dispatch(addFunc(personnelId, statusId, startDate, endDate));
    },
    [addFunc, dispatch, personnelId]
  );

  return addHandler;
}

export function useHandleDeleteStatus(dispatch, deleteFunc, personnelId) {
  const deleteHandler = useCallback(
    personnelStatusId => {
      dispatch(deleteFunc(personnelId, personnelStatusId));
    },
    [deleteFunc, dispatch, personnelId]
  );

  return deleteHandler;
}
