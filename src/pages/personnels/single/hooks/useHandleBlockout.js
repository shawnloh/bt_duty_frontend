import { useCallback } from 'react';

export function useHandleAddBlockout(dispatch, addFunc, personnelId) {
  const addHandler = useCallback(
    ({ startDate, endDate = null }) => {
      const date = {
        startDate
      };

      if (endDate) {
        date.endDate = endDate;
      }

      dispatch(addFunc(personnelId, date));
    },
    [addFunc, dispatch, personnelId]
  );

  return addHandler;
}

export function useHandleDeleteBlockout(dispatch, deleteFunc, personnelId) {
  const deleteHandle = useCallback(
    ({ startDate, endDate = null }) => {
      const date = {
        startDate
      };

      if (endDate) {
        date.endDate = endDate;
      }
      dispatch(deleteFunc(personnelId, date));
    },
    [deleteFunc, dispatch, personnelId]
  );
  return deleteHandle;
}
