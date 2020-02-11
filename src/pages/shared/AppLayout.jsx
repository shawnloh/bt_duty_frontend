import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TopNavBar from '../../components/commons/TopNavBar';

export function AppLayout({ children }) {
  const username = useSelector(state => state.auth.get('username'));

  return (
    <>
      <TopNavBar username={username} />
      {children}
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default memo(AppLayout);
