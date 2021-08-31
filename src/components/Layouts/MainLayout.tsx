import React, { useContext, useState } from 'react';
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
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';

import styled from '@emotion/styled';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import { isEmployee, isCompany, isMinEmployee, isMinCompany, isMinAdmin, isSuperAdmin } from '../../helpers/utils/utility';
import { UserContext } from '../Authentication/UserProvider';
import { authenticationService } from '../../services/authentication';

function MainLayout({navExtraInfo = <></>, children,}: any) {
  const { user } = useContext(UserContext);

  const logout = async () => {
    await authenticationService.logout();
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
    <Navbar expand="md" className="py-4 px-5 navbar navbar-dark">
      <img className="pr-2" src="logoIEPAM_Blanco.png" height="55" width="90"/>
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <NavbarBrand href="/">Bolsa de Trabajo</NavbarBrand>
      </Link>

      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          {isEmployee(user) && (
            <NavItem>
              <Link to="/missolicitudes" style={{ textDecoration: 'none' }}>
                <NavLink>Mis Solicitudes</NavLink>
              </Link>
            </NavItem>
          )}
          {isEmployee(user) && (
            <NavItem>
              <Link to="/form-employee" style={{ textDecoration: 'none' }}>
                <NavLink>Mi Información</NavLink>
              </Link>
            </NavItem>
          )}
          {isMinAdmin(user) && (
          <NavItem>
            <Link to="/admin" style={{ textDecoration: 'none' }}>
              <NavLink>Panel Admin</NavLink>
            </Link>
          </NavItem>
          )}
          {isCompany(user) && (
          <NavItem>
            <Link to="/postulantes" style={{ textDecoration: 'none' }}>
              <NavLink>Explorar Postulantes</NavLink>
            </Link>
          </NavItem>
          )}
          {isCompany(user) && (
          <NavItem>
            <Link to="/form-position" style={{ textDecoration: 'none' }}>
              <NavLink>Crear Puesto de Trabajo</NavLink>
            </Link>
          </NavItem>
          )}
          {isCompany(user) && (
          <NavItem>
            <Link to="/solicitudes" style={{ textDecoration: 'none' }}>
              <NavLink>Solicitudes</NavLink>
            </Link>
          </NavItem>
          )}
          {isCompany(user) && (
          <NavItem>
            <Link to="/form-organization" style={{ textDecoration: 'none' }}>
              <NavLink>Mi información</NavLink>
            </Link>
          </NavItem>
          )}
        </Nav>
        <Button outline onClick={logout} color="light">
          Cerrar sesión
        </Button>
      </Collapse>
    </Navbar>
    <div className="px-0 py-5 p-sm-5 p-md-5">
      {children}
    </div>
    </div>

  );
}

export default MainLayout;
