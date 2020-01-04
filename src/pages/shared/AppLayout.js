import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TopNavBar from '../../components/commons/TopNavBar';
import { logout } from '../../actions/authActions';

class AppLayout extends PureComponent {
  render() {
    const { children, username, userLogout } = this.props;
    return (
      <>
        <TopNavBar username={username} logout={userLogout} />
        {children}
      </>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  username: PropTypes.string.isRequired,
  userLogout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  username: state.auth.get('username')
});

const mapDispatchToProps = {
  userLogout: logout
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
