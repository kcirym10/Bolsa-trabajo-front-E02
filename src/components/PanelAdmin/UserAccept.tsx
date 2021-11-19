import React, { useContext, useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, Col, Container, Jumbotron, Row, Spinner, Table } from 'reactstrap';
import { auth } from '../../firebase';
import { translateToUserType, User, UserTypeEnum } from '../../model/Users';
import { getUsers } from '../../services/usersService';

function UserAccept() {

    const [inactiveUsers, setInactiveUsers] = useState<User[]>([]);
    const [activeUsers, setActiveUsers] = useState<User[]>([]);

    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const getUsersFromAPI = async () => {
            const users = await getUsers();

            let activeUsersAPI: User[] = [];
            let inactiveUsersAPI: User[] = [];

            users.forEach(u => {
                if (u.state === "active") {
                    activeUsersAPI.push(u);
                }
                else {
                    inactiveUsersAPI.push(u)
                }
            })

            setInactiveUsers(inactiveUsersAPI);
            setActiveUsers(activeUsersAPI);
        }
        /*/
        auth.onAuthStateChanged(async user => {
            if (user) {
                await getUsersFromAPI();
            }
            else {
                console.log("No user")
            }
            setLoading(false);
        })
        /*/
    }, [])

    if (isLoading && false) { // LOADING BYPASS
        return (
            <React.Fragment>
                <Jumbotron>
                    <h1>Autorización de Usuarios</h1>
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
                <h1>Autorización de Usuarios</h1>
            </Jumbotron>
            <Container fluid>
                <Row>
                    <Col md={{ size: 10, offset: 1 }} xs={{ size: 12 }} >
                        <Row>
                            <Col>
                                <h3>Usuarios esperando autorización:</h3>
                            </Col>
                        </Row>
                        {
                            inactiveUsers.length > 0 ? (

                                <Row>
                                    <Col>
                                        <Table bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>Nombre de Usuario</th>
                                                    <th>Tipo de Usuario</th>
                                                    <th>Email</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {inactiveUsers.map((user, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{user.username}</td>
                                                            <td>{translateToUserType(user.type) == UserTypeEnum.employee ? "Empleado" : "Organización"}</td>
                                                            <td>{user.email}</td>
                                                            <td className="text-center">
                                                                <Link to={{ pathname: `/admin/accept-users/${user.id}`, state: { user: user } }}>
                                                                    <Button color="primary">Ver Usuario</Button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            ) :
                                (
                                    <Row>
                                        <Col><p>No hay usuarios esperando autorización</p></Col>
                                    </Row>
                                )
                        }
                    </Col>
                </Row>
            </Container>
            <Container fluid className="mt-5">
                <Row>
                    <Col md={{ size: 10, offset: 1 }} xs={{ size: 12 }} >
                        <Row>
                            <Col>
                                <h3>Usuarios activos:</h3>
                            </Col>
                        </Row>
                        {
                            activeUsers.length > 0 ? (

                                <Row>
                                    <Col>
                                        <Table bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>Nombre de Usuario</th>
                                                    <th>Tipo de Usuario</th>
                                                    <th>Email</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {activeUsers.map((user, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{user.username}</td>
                                                            <td>{translateToUserType(user.type) == UserTypeEnum.employee ? "Empleado" : "Organización"}</td>
                                                            <td>{user.email}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            ) :
                                (
                                    <Row>
                                        <Col><p>No hay usuarios activos</p></Col>
                                    </Row>
                                )
                        }
                    </Col>
                </Row>
            </Container>
        </React.Fragment >
    );
};

export default UserAccept;
