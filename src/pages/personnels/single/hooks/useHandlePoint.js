import { useCallback } from 'react';

export function useHandleEditPoint(dispatch, editFunc, personnelId) {
  const editPointHandler = useCallback(
    (personnelPointId, newPoint) => {
      dispatch(editFunc(personnelId, personnelPointId, newPoint));
    },
    [dispatch, editFunc, personnelId]
  );
  return editPointHandler;
}

export default useHandleEditPoint;
