import styled from '@emotion/styled';
import { Field, Formik, FormikErrors } from 'formik';
import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Jumbotron, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { translateToUserType } from '../../model/Users';
import { updateUser } from '../../services/usersService';
import UserDetail from './UserDetail';

function createEmailLink(accepted: boolean, email: string, feedback?: string) {
    if (accepted) {
        return "mailto:" + email + "?subject=Aprobación De Cuenta&body=Estimado Usuario,%0D%0A%0D%0ASu cuenta ha sido aprobada en el sistema de Bolsa De Trabajo.%0D%0A¡Bienvenido!%0D%0A%0D%0ASaludos,%0D%0AIEPAM";
    }

    return "mailto:" + email + "?subject=Rechazo De Cuenta&body=Estimado Usuario,%0D%0A%0D%0ASu cuenta ha sido rechazada en el sistema de Bolsa De Trabajo por la siguiente razón:%0D%0A%0D%0A" + feedback + "%0D%0A%0D%0ACorrija estos detalles para empezar a usar el sistema.%0D%0A%0D%0ASaludos,%0D%0AIEPAM"
}

function UserAcceptDetails(props: any) {
    let params = useParams<{ userId: string }>();
    const userId = params.userId;
    console.log(userId);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [emailText, setEmailText] = useState("");

    let userInfo = {
        id: "",
        username: "",
        createdBy: "",
        type: "employee",
        state: "inactive",
        email: ""
    };

    let history = useHistory();
    if (props.location.state) {
        userInfo = props.location.state.user;
        console.log(userInfo)
    }
    else {
        console.log("No state")
        history.push("/admin/accept-users")
    }

    const acceptUser = async () => {
        await updateUser(userId, { state: "active" });
        alert("El usuario ha sido aceptado");

        setEmailText(createEmailLink(true, userInfo.email));
    }

    const StyledErrorMessage = styled.div`
        color: red;
    `;

    if (emailText !== "") {
        return (
            <React.Fragment>
                <Jumbotron>
                    <h1>Detalle de Usuario</h1>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col><h2>Haga click en el botón para comunicar la decisión al usuario:</h2></Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Link to="#" onClick={(e) => {
                                window.location.href = emailText;
                                e.preventDefault();
                            }}>
                                <Button color="primary">Enviar Correo</Button>
                            </Link>
                            <Link to="/admin/accept-users">
                                <Button className="ml-3">Regresar</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Jumbotron>
                <h1>Detalle de Usuario</h1>
            </Jumbotron>
            <UserDetail userId={userId} userType={translateToUserType(userInfo.type)}>
                <Container className="mt-5" fluid>
                    <Row>
                        <Col xs="12" md={{ size: 8, offset: 2 }}>
                            <Button className="mr-3" onClick={acceptUser} color="success" size="lg">Aceptar</Button>
                            <Button color="danger" onClick={toggle} size="lg">Rechazar</Button>
                        </Col>

                    </Row>
                </Container>
            </UserDetail>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Razón de Rechazo</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>Describa por qué ha decidido rechazar al usuario, como retroalimentación para este:</Col>
                    </Row>
                    <Row>
                        <Col>
                            <Formik
                                initialValues={{ feedback: '' }}
                                validate={values => {
                                    let errors: FormikErrors<{ feedback: string }> = {};

                                    if (!values.feedback || values.feedback.length < 1) {
                                        errors.feedback = "Es necesario escribir algo de retroalimentación"
                                    }

                                    return errors;
                                }}

                                validateOnBlur={true}
                                onSubmit={(values, { setSubmitting }) => {

                                    setSubmitting(false);

                                    // TODO: send email
                                    setEmailText(createEmailLink(false, userInfo.email, values.feedback));
                                }}
                            >
                                {({ values, errors, touched, handleChange, handleSubmit }) =>
                                    <Form onSubmit={handleSubmit}>
                                        <Input id="feedback" name="feedback" tag={Field} type="textarea" onChange={handleChange} value={values.feedback} placeholder="Ejemplo: La dirección no existe" invalid={(typeof errors.feedback !== 'undefined') && touched.feedback}></Input>
                                        {touched.feedback && errors.feedback && <StyledErrorMessage>{errors.feedback}</StyledErrorMessage>}
                                        <FormGroup className="mt-4">
                                            <Button type="submit" color="danger" className="mr-4">Enviar</Button>
                                            <Button onClick={toggle} className="mr-4">Cancelar</Button>
                                        </FormGroup>
                                    </Form>}

                            </Formik>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default UserAcceptDetails;