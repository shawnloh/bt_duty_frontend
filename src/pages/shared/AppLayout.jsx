import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import TopNavBar from '../../components/commons/TopNavBar';
import { logout } from '../../actions/authActions';

export function AppLayout({ children }) {
  const dispatch = useDispatch();
  const username = useSelector(state => state.auth.get('username'));
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <>
      <TopNavBar username={username} logout={handleLogout} />
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
