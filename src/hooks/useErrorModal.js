import { useCallback } from 'react';

import Swal from 'sweetalert2';

function useErrorModal(body, timer) {
  const showModal = useCallback(() => {
    if (timer) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: body,
        timer,
        timerProgressBar: true
      });
    }

    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: body
    });
  }, [body, timer]);

  return showModal;
}

export default useErrorModal;
