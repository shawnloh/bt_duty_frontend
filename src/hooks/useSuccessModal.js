import { useCallback } from 'react';

import Swal from 'sweetalert2';

function useSuccessUpdatedModal(bodyText, timer) {
  const showModal = useCallback(() => {
    if (timer) {
      return Swal.fire({
        title: 'Success!',
        text: bodyText,
        icon: 'success',
        confirmButtonColor: '#007bff',
        timer: 2000,
        timerProgressBar: true
      });
    }

    return Swal.fire({
      title: 'Success!',
      text: bodyText,
      confirmButtonColor: '#007bff',
      icon: 'success'
    });
  }, [bodyText, timer]);

  return showModal;
}

export default useSuccessUpdatedModal;
