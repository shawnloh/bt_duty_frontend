import { useCallback } from 'react';
import Swal from 'sweetalert2';

function useUpdateModal(dispatch, addFunc, category) {
  const deleteCallBackModal = useCallback(() => {
    async function showModal() {
      const result = await Swal.fire({
        title: `Enter a new ${category} name`,
        input: 'text',
        inputValue: '',
        showCancelButton: true,
        confirmButtonText: 'Add',
        confirmButtonColor: '#28a745',
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#007bff',
        reverseButtons: true,
        inputValidator: value => {
          if (!value) {
            return 'Name cannot be empty';
          }
          return null;
        }
      });
      if (result.value) {
        dispatch(addFunc(result.value));
      }
    }
    showModal();
  }, [addFunc, category, dispatch]);

  return deleteCallBackModal;
}

export default useUpdateModal;
