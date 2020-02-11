import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import StatusTable from './status/StatusTable';
import AddStatus from './status/AddStatus';

const PersonnelStatus = ({
  personStatuses,
  statuses,
  handleAdd,
  handleDelete
}) => {
  return (
    <>
      <AddStatus handleAdd={handleAdd} statuses={statuses} />
      <StatusTable statuses={personStatuses} handleDelete={handleDelete} />
    </>
  );
};

PersonnelStatus.propTypes = {
  personStatuses: PropTypes.oneOfType([PropTypes.instanceOf(List)]).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  statuses: PropTypes.oneOfType([PropTypes.instanceOf(List).isRequired])
    .isRequired
};

export default memo(PersonnelStatus);
