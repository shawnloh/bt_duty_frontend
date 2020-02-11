import { useCallback } from 'react';
import moment from 'moment-timezone';
import Swal from 'sweetalert2';

function useHandleSetPersonnels(date, setFunc, field) {
  const handler = useCallback(
    selectedPersonnels => {
      if (date === '' || !moment(date, 'DDMMYY', true).isValid()) {
        return Swal.fire({
          title: 'Please set a date',
          text: ' Please assign a valid date before selecting personnels',
          timer: 3000
        });
      }
      if (!selectedPersonnels && field) {
        return setFunc(field, []);
      }
      if (!selectedPersonnels && !field) {
        return setFunc([]);
      }
      if (!field) {
        return setFunc(selectedPersonnels);
      }
      // const values = selectedPersonnels.map(person => person.value);
      return setFunc(field, selectedPersonnels);
    },
    [date, field, setFunc]
  );
  return handler;
}

export default useHandleSetPersonnels;
