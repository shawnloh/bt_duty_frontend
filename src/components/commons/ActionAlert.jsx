import React, { memo } from 'react';
import { Alert, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

const ActionAlert = ({ name }) => {
  return (
    <Alert color="primary" className="w-100">
      {name} in progress <Spinner color="primary" size="sm" />
    </Alert>
  );
};

ActionAlert.propTypes = {
  name: PropTypes.string.isRequired
};

export default memo(ActionAlert);
