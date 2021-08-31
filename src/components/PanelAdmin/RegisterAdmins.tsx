import React, { useContext, useState } from 'react';
import { Button, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Jumbotron, Label, Row } from 'reactstrap';
import { Field, Formik, FormikErrors } from 'formik'
import styled from '@emotion/styled';
import { isMinAdmin, isSuperAdmin } from '../../helpers/utils/utility';
import { UserContext } from '../Authentication/UserProvider';
import { Admin, AdminCreate, AdminType, AdminUpdate, translateToAdminType } from '../../model/Admins';
import { registerAdmin, updateUser } from '../../services/usersService';

const StyledErrorMessage = styled.div`
  color: red;
`;

interface RegisterAdminProps {
    admin: Admin;
    isEdit?: boolean;
    onEdit?: (admin: Admin) => void;
}

const validateEmail = (value: string) => {
    let error;

    if (!value) {
        error = 'Campo requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Dirección de correo inválida';
    }

    return error;
}

const validatePhoneNumber = (value: string) => {
    let error;

    if (!value) {
        error = 'Campo requerido';
    }
    else if (!/^(\+[0-9][0-9]?)?[0-9]{10}$/i.test(value)) {
        error = 'Formato del teléfono incorrecto (10 dígitos)'
    }

    return error;
}

const validateUsername = (value: string) => {
    let error;

    if (!value) {
        error = 'Campo requerido';
    } else if (!/^[A-Z\-\_]+$/i.test(value)) {
        error = 'Formato del nombre incorrecto (solo letras sin acento, ni espacios y/o guiones';
    }

    return error;
}

const validateAdminType = (value: string) => {
    let error;

    if (!value) {
        error = 'Campo requerido';
    } else if (value !== AdminType.admin && value !== AdminType.superAdmin) {
        error = 'El tipo debe ser Administrador o Super Administrador';
    }

    return error;
}

const validatePassword = (value: string, isEdit: boolean) => {
    let error;

    if (isEdit) {
        if (value.length > 0 && value.length < 5) {
            error = 'La contraseña debe contener al menos 5 caracteres';
        }
    }
    else {
        if (!value) {
            error = 'Campo requerido';
        } else if (value.length < 5) {
            error = 'La contraseña debe contener al menos 5 caracteres';
        }
    }

    return error;
}


function RegisterAdmins(props: RegisterAdminProps) {

    let initialValues: AdminCreate;

    if (props.isEdit) {
        initialValues = {
            username: props.admin.username,
            email: props.admin.email,
            type: translateToAdminType(props.admin.type),
            phoneNumber: props.admin.phoneNumber,
            password: ''
        };
    }
    else {
        initialValues = {
            username: '',
            email: '',
            type: AdminType.admin,
            phoneNumber: '',
            password: ''
        }
    }

    console.log(initialValues)

    const { user } = useContext(UserContext);

    const [adminTipo, setAdminTipo] = useState(initialValues.type || AdminType.admin)

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <React.Fragment>
            {
                !props.isEdit && (
                    <Jumbotron>
                        <h1> Registrar Nuevo Administrador </h1>
                    </Jumbotron>
                )
            }
            {isSuperAdmin(user) ? (
                <Container>
                    <Row>
                        <Col md={{ size: props.isEdit ? 8 : 6, offset: props.isEdit ? 2 : 3 }} sm={{ size: 12 }}>
                            <Formik
                                initialValues={initialValues}

                                validate={values => {
                                    let errors: FormikErrors<AdminCreate> = {};

                                    const name = validateUsername(values.username)
                                    if (name) {
                                        errors.username = name;
                                    }

                                    const email = validateEmail(values.email)
                                    if (email) {
                                        errors.email = email;
                                    }

                                    const phoneNumber = validatePhoneNumber(values.phoneNumber)
                                    if (phoneNumber) {
                                        errors.phoneNumber = phoneNumber
                                    }

                                    const adminType = validateAdminType(adminTipo)
                                    if (adminType) {
                                        errors.type = adminType;
                                    }

                                    const pwd = validatePassword(values.password, props.isEdit ? true : false)
                                    if (pwd) {
                                        errors.password = pwd;
                                    }

                                    return errors;
                                }}

                                validateOnBlur={true}

                                onSubmit={async (values, { setSubmitting }) => {

                                    setSubmitting(false);
                                    values.username = values.username.trim();
                                    values.email = values.email.trim();
                                    values.phoneNumber = values.phoneNumber[0] == '+' ? values.phoneNumber : "+52" + values.phoneNumber;
                                    values.type = adminTipo;

                                    if (props.isEdit) {
                                        const updateAdmin: AdminUpdate = {
                                            email: values.email,
                                            type: values.type,
                                            username: values.username,
                                            phoneNumber: values.phoneNumber,
                                            state: props.admin.state
                                        }
                                        
                                        if(values.password.length > 0) {
                                            updateAdmin.password = values.password;
                                        }

                                        await updateUser(props.admin.id, updateAdmin);
                                        alert("Se ha editado el administrador");

                                        if (props.onEdit) {
                                            const editedAdmin: Admin = {
                                                id: props.admin.id,
                                                createdBy: props.admin.createdBy,
                                                email: values.email,
                                                type: values.type,
                                                username: values.username,
                                                phoneNumber: values.phoneNumber,
                                                state: props.admin.state
                                            }
                                            props.onEdit(editedAdmin);
                                        }
                                    }
                                    else {

                                        const createAdmin: AdminCreate = values;
                                        
                                        await registerAdmin(createAdmin);
                                        alert("Se ha registrado el administrador");
                                    }

                                    console.log(values)

                                    if (props.isEdit && props.onEdit) {


                                    }
                                }}
                            >
                                {({ values, errors, handleChange, touched, handleSubmit, validateForm }) =>
                                    <Form onSubmit={handleSubmit}>
                                        <Container>
                                            <FormGroup >
                                                <Label htmlFor="username">Nombre de Usuario</Label>
                                                <Input id="username" name="username" tag={Field} type="text" onChange={handleChange} value={values.username} placeholder="Ejemplo: juan_perez" invalid={(typeof errors.username !== 'undefined') && touched.username}></Input>
                                                {touched.username && errors.username && <StyledErrorMessage>{errors.username}</StyledErrorMessage>}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="email">Correo Electrónico</Label>
                                                <Input id="email" name="email" type="email" tag={Field} onChange={handleChange} value={values.email} placeholder="Ejemplo: admin@email.com" invalid={(typeof errors.email !== 'undefined') && touched.email}></Input>
                                                {touched.email && errors.email && <StyledErrorMessage>{errors.email}</StyledErrorMessage>}
                                            </FormGroup>
                                            <FormGroup >
                                                <Label htmlFor="phoneNumber">Número de Teléfono</Label>
                                                <Input id="phoneNumber" name="phoneNumber" tag={Field} type="text" onChange={handleChange} value={values.phoneNumber} placeholder="Ejemplo: 8123456789" invalid={(typeof errors.phoneNumber !== 'undefined') && touched.phoneNumber}></Input>
                                                {touched.phoneNumber && errors.phoneNumber && <StyledErrorMessage>{errors.phoneNumber}</StyledErrorMessage>}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="adminType">Tipo de Administrador</Label>
                                                <Dropdown id="adminType" isOpen={dropdownOpen} toggle={toggle}>
                                                    <DropdownToggle caret>
                                                        {adminTipo === AdminType.admin ? "Administrador" : "Super Administrador"}
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem onClick={() => { setAdminTipo(AdminType.admin); validateForm() }}>Administrador</DropdownItem>
                                                        <DropdownItem onClick={() => { setAdminTipo(AdminType.superAdmin); validateForm() }}>Super Administrador</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                                {touched.type && errors.type && <StyledErrorMessage>{errors.type}</StyledErrorMessage>}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="password">Contraseña</Label>
                                                <Input id="password" name="password" type="password" tag={Field} onChange={handleChange} value={values.password} invalid={(typeof errors.password !== 'undefined') && touched.password}></Input>
                                                {touched.password && errors.password && <StyledErrorMessage>{errors.password}</StyledErrorMessage>}
                                            </FormGroup>
                                            <FormGroup>
                                                <Button type="submit" color="primary" className="mr-4" >{props.isEdit ? "Editar Administrador" : " Registrar Nuevo Administrador"}</Button>
                                            </FormGroup>
                                        </Container>
                                    </Form>}
                            </Formik>
                        </Col>
                    </Row>
                </Container>
            ) :
                (
                    <h3>Permisos de Administrador Insuficientes</h3>
                )}
        </React.Fragment>
    )
}

export default RegisterAdmins;