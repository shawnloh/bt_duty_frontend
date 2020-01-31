import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Tabs = ({ setTab, activeTab }) => {
  return (
    <Nav tabs>
      <NavItem>
        <NavLink
          className={activeTab === '1' ? 'active' : ''}
          onClick={() => {
            setTab('1');
          }}
        >
          Info
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={activeTab === '2' ? 'active' : ''}
          onClick={() => {
            setTab('2');
          }}
        >
          Status
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={activeTab === '3' ? 'active' : ''}
          onClick={() => {
            setTab('3');
          }}
        >
          Blockout dates
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={activeTab === '4' ? 'active' : ''}
          onClick={() => {
            setTab('4');
          }}
        >
          Points
        </NavLink>
      </NavItem>
    </Nav>
  );
};

Tabs.propTypes = {
  setTab: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired
};

export default Tabs;
