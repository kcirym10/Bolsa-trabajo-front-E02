import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Jumbotron, Modal, ModalBody, ModalHeader, Row, Spinner, Table, UncontrolledCollapse } from 'reactstrap';
import { auth } from '../../firebase';
import { isMinAdmin, isSuperAdmin } from '../../helpers/utils/utility';
import { Admin, AdminCreate, AdminUpdate, translateToAdminType } from '../../model/Admins';
import { deleteAdmin, getAdmins, getAdminsAndSuperAdmins } from '../../services/usersService';
import { UserContext } from '../Authentication/UserProvider';
import RegisterAdmins from './RegisterAdmins';

function ManageAdmins() {

    const { user } = useContext(UserContext);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const toggleDeleteConfirmation = () => setDeleteConfirmation(!deleteConfirmation);

    const [admins, setAdmins] = useState<Admin[]>([]);

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getAdminsFromAPI = async () => {
            let adminsAPI;

            if(isSuperAdmin(user)) {
                adminsAPI = await getAdminsAndSuperAdmins();
            }
            else {
                adminsAPI = await getAdmins();
            }

            console.log(adminsAPI)

            setAdmins(adminsAPI)
        }
        /*/
        auth.onAuthStateChanged(async user => {
            if (user) {
                await getAdminsFromAPI();
            }
            else {
                console.log("No user")
            }
            setLoading(false);
        });
        /*/
    }, [])

    const [adminEdit, setAdminEdit] = useState(0);

    const updateAdmin = (index: number, admin: Admin) => {

        const adminArr = [...admins];
        adminArr[index] = admin;

        setAdmins(adminArr);
    }

    const deleteAdministrator = async () => {
        await deleteAdmin(admins[adminEdit].id)
        alert("El administrador ha sido eliminado")

        const adminArr = [...admins];
        adminArr.splice(adminEdit, 1);

        setAdmins(adminArr);
    }

    if (isLoading) {
        return (
            <React.Fragment>
                <Jumbotron>
                    <h1>Gestionar Administradores</h1>
                </Jumbotron>
                <Container className="text-center">
                    <Spinner />
                </Container>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Jumbotron>
                <h1>Gestionar Administradores</h1>
            </Jumbotron>
            <Container fluid>
                <Row>
                    <Col md={{ size: 10, offset: 1 }} xs={{ size: 12 }}>
                        <Row>
                            <Col>
                                <h3>Administradores Registrados:</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Correo Electrónico</th>
                                            <th>Teléfono</th>
                                            <th>Tipo de Administrador</th>
                                            {
                                                isSuperAdmin(user) && (
                                                    <th></th>
                                                )
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {admins.map((admin, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{admin.id}</td>
                                                    <td>{admin.username}</td>
                                                    <td>{admin.email}</td>
                                                    <td>{admin.phoneNumber}</td>
                                                    <td>{admin.type == "admin" ? "Administrador" : "Super Administrador"}</td>
                                                    {
                                                        isSuperAdmin(user) && (
                                                            <td className="text-center">
                                                                <Button color="primary" onClick={() => { setAdminEdit(index); toggle(); }}>Editar</Button>
                                                            </td>
                                                        )
                                                    }
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Editar Administrador</ModalHeader>
                    <ModalBody >
                        <RegisterAdmins admin={admins[adminEdit]} isEdit onEdit={(editedAdmin: Admin) => { updateAdmin(adminEdit, editedAdmin); setModal(false) }} />
                        <Container className={`${deleteConfirmation ? 'd-none' : ''} ml-3`}>
                            <Row >
                                <Col md={{ size: 8, offset: 2 }} sm="12">
                                    <Button color="danger" onClick={toggleDeleteConfirmation}>Eliminar Administrador</Button>
                                </Col>
                            </Row>
                        </Container>
                        <Container className={`${deleteConfirmation ? '' : 'd-none'} ml-3`}>
                            <Row>
                                <Col md={{ size: 8, offset: 2 }} sm="12">
                                    <p>¿Seguro que desea eliminarlo?</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ size: 8, offset: 2 }} sm="12">
                                    <Button className="mr-2" color="danger" onClick={() => { deleteAdministrator(); toggle(); }}>Sí, eliminar</Button>
                                    <Button onClick={toggleDeleteConfirmation}>No, Cancelar</Button>
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                </Modal>
            </Container>
        </React.Fragment>
    )
}

export default ManageAdmins;
