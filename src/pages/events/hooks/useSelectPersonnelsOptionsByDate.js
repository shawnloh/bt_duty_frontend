import { useMemo } from 'react';
import moment from 'moment-timezone';

function useSelectPersonnelsOptionsByDate(date, personnels, includes = []) {
  const selectPersonnelsOptions = useMemo(() => {
    if (date !== '' && moment(date, 'DDMMYY', true).isValid()) {
      const currEventDate = moment(date, 'DDMMYY', true).format('DD-MM-YYYY');
      const dayBeforeEventDate = moment(currEventDate, 'DD-MM-YYYY', true)
        .subtract(1, 'd')
        .format('DD-MM-YYYY');
      const dayAfterEventDate = moment(currEventDate, 'DD-MM-YYYY', true)
        .add(1, 'd')
        .format('DD-MM-YYYY');

      return personnels
        .filter(person => {
          const blockoutDates = person.get('blockOutDates');
          if (blockoutDates.includes(currEventDate)) {
            return false;
          }
          // handle event personnel if modifying
          if (includes.find(p => p.value === person.get('_id'))) {
            return true;
          }
          const eventsDate = person.get('eventsDate');
          if (
            eventsDate.includes(currEventDate) ||
            eventsDate.includes(dayBeforeEventDate) ||
            eventsDate.includes(dayAfterEventDate)
          ) {
            return false;
          }

          return true;
        })
        .map(person => {
          return {
            value: person.get('_id'),
            label: `${person.getIn(['platoon', 'name'])} ${person.getIn([
              'rank',
              'name'
            ])} ${person.get('name')}`
          };
        });
    }

    return personnels.map(person => {
      return {
        value: person.get('_id'),
        label: `${person.getIn(['platoon', 'name'])} ${person.getIn([
          'rank',
          'name'
        ])} ${person.get('name')}`
      };
    });
  }, [date, includes, personnels]);

  return selectPersonnelsOptions;
}

export default useSelectPersonnelsOptionsByDate;
