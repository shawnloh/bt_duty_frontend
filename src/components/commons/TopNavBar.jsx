import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const TopNavBar = ({ username, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Duty App</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/dashboard" activeClassName="active" exact>
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/personnels" activeClassName="active" exact>
              Personnels
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/ranks" activeClassName="active" exact>
              Ranks
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/platoons" activeClassName="active" exact>
              Platoons
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/points" activeClassName="active" exact>
              Points System
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/statuses" activeClassName="active" exact>
              Statuses
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Hello, {username}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={logout}>Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

TopNavBar.propTypes = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};

export default TopNavBar;
