import React, { useContext, useState } from 'react';
import { Link, } from 'react-router-dom';
import { Button, Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { isMinAdmin, isSuperAdmin } from '../../helpers/utils/utility';
import { authenticationService } from '../../services/authentication';
import { UserContext } from '../Authentication/UserProvider';


function AdminLayout({ children }: any) {
    const { user } = useContext(UserContext);

    const logout = async () => {
        await authenticationService.logout();
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            {
                isMinAdmin(user) ? (
                    <div>
                        <Navbar expand="md" className="py-4 px-5 navbar navbar-dark">
                            <Link to="/admin" style={{ textDecoration: 'none' }}>
                                <NavbarBrand href="/">Bolsa de Trabajo</NavbarBrand>
                            </Link>

                            <NavbarToggler onClick={toggle} />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="mr-auto" navbar>
                                    <NavItem>
                                        <Link to="/admin/accept-users" style={{ textDecoration: 'none' }}>
                                            <NavLink>Aceptar Usuarios</NavLink>
                                        </Link>
                                    </NavItem>

                                    {isSuperAdmin(user) && (
                                        <NavItem>
                                            <Link to="/admin/register-admins" style={{ textDecoration: 'none' }}>
                                                <NavLink>Registrar Administrador</NavLink>
                                            </Link>
                                        </NavItem>

                                    )}

                                    <NavItem>
                                        <Link to="/admin/manage-admins" style={{ textDecoration: 'none' }}>
                                            <NavLink>Gestionar Administradores</NavLink>
                                        </Link>
                                    </NavItem>
                                </Nav>
                                <Button outline onClick={logout} color="light">
                                    Cerrar sesión
                    </Button>
                            </Collapse>
                        </Navbar>
                        <div className="p-5">
                            {children}
                        </div>
                    </div>
                ) :
                    (
                        <h1>Acceso Denegado: Solo Administradores</h1>
                    )
            }
        </div>

    );
}

export default AdminLayout;