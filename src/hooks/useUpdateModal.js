import { useCallback } from 'react';
import Swal from 'sweetalert2';

function useUpdateModal(dispatch, updateFunc, category) {
  const updateCallBackModal = useCallback(
    (id, name) => {
      async function showModal() {
        const result = await Swal.fire({
          title: `Enter a new ${category} name for ${name}`,
          input: 'text',
          inputValue: '',
          inputPlaceholder: name,
          showCancelButton: true,
          confirmButtonText: 'Update',
          confirmButtonColor: '#28a745',
          cancelButtonText: 'Cancel',
          cancelButtonColor: '#007bff',
          reverseButtons: true,
          inputValidator: value => {
            if (!value) {
              return `Updating a ${category} name cannot be empty`;
            }
            return null;
          }
        });
        if (result.value) {
          dispatch(updateFunc(id, result.value));
        }
      }
      showModal();
    },
    [category, dispatch, updateFunc]
  );
  return updateCallBackModal;
}

export default useUpdateModal;
