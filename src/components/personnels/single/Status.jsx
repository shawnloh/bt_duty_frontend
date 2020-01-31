import React from 'react';
import PropTypes from 'prop-types';
import StatusTable from './status/StatusTable';
import AddStatus from './status/AddStatus';

const PersonnelStatus = ({
  personStatuses,
  statuses,
  statusIds,
  handleAdd,
  handleDelete
}) => {
  return (
    <>
      <AddStatus
        handleAdd={handleAdd}
        statusIds={statusIds}
        statuses={statuses}
      />
      <StatusTable statuses={personStatuses} handleDelete={handleDelete} />
    </>
  );
};

PersonnelStatus.propTypes = {
  personStatuses: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  statuses: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    })
  }).isRequired,
  statusIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default PersonnelStatus;
