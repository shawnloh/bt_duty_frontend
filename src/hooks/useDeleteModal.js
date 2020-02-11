import { useCallback } from 'react';
import Swal from 'sweetalert2';

function useUpdateModal(dispatch, deleteFunc) {
  const deleteCallBackModal = useCallback(
    (id, name) => {
      async function showModal() {
        const result = await Swal.fire({
          title: `Are you sure you want to delete ${name}?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#dc3545',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
          reverseButtons: true
        });
        if (result.value) {
          dispatch(deleteFunc(id));
        }
      }
      showModal();
    },
    [deleteFunc, dispatch]
  );
  return deleteCallBackModal;
}

export default useUpdateModal;
