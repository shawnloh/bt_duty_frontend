import { useCallback } from 'react';

import Swal from 'sweetalert2';

function useSuccessUpdatedModal(actionName, timer) {
  const showModal = useCallback(() => {
    if (timer) {
      return Swal.fire({
        title: actionName,
        text: `Successfully ${actionName}`,
        icon: 'success',
        confirmButtonColor: '#007bff',
        timer: 2000
      });
    }

    return Swal.fire({
      title: actionName,
      text: `Successfully ${actionName}`,
      confirmButtonColor: '#007bff',
      icon: 'success'
    });
  }, [actionName, timer]);

  return showModal;
}

export default useSuccessUpdatedModal;
