import React from 'react';
import { Form, Row, Col, Button, Input, Jumbotron, Label, FormGroup, CustomInput } from "reactstrap";
import { Formik } from "formik";
import { Link, useHistory } from 'react-router-dom';
import { authenticationService, RegisterData } from '../../services/authentication';
import { UserType } from '../../model/Users';
import * as Yup from 'yup';

const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Requerido'),
  email: Yup.string().required('Requerido').email(),
  password: Yup.string().required('Requerido'),
  phoneNumber: Yup.number().required('Requerido. Para registrar tu telefono usa el código de area y los 10 digitos (Ejemplo:+521234567891'),
  type: Yup.string().required('Requerido')
})

const SignUp = () => {

  const history = useHistory();

  const createUserWithEmailAndPasswordHandler = async ({ name, email, password, phoneNumber}: any) => {
    const type: UserType = {type: 'employee'};
    const data: RegisterData = {name, email, password, type, phoneNumber};
      try {
        await authenticationService.register(data);
        history.push('/'); // redirect to login
      } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
          <Jumbotron className="main-jumbotron">
            <Row className="justify-content-center">
              <img src="logoIEPAM_Blanco.png" height="110" width="180"/>
            </Row>
          </Jumbotron>
          <Row className="mx-auto">
            <Formik
              initialValues= {{
                name: '',
                email: '',
                password: '',
                phoneNumber: '',
                type: 'employee'
              }}
              validationSchema={signUpSchema}
              onSubmit={createUserWithEmailAndPasswordHandler}
              >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Col md={{size: 4, offset: 4}} sm={{size: 12}}>
              <Form onSubmit={handleSubmit}>
                <h2>Registro</h2>
                <hr></hr>
                <FormGroup>
                  <Label htmlFor="name" >Nombre</Label>
                  <Input type="text" id="name" name="name" onChange={handleChange} value={values.name}></Input>
                  {errors.name && touched.name ? (
                  <div className="errorMessage">{errors.name}</div>) : null}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email" >Email</Label>
                  <Input type="text" id="email" name="email" onChange={handleChange} value={values.email}></Input>
                  {errors.email && touched.email ? (
                  <div className="errorMessage">{errors.email}</div>) : null}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password" >Contraseña</Label>
                  <Input type="password" id="password" name="password" onChange={handleChange} value={values.password}></Input>
                  {errors.password && touched.password ? (
                  <div className="errorMessage">{errors.password}</div>) : null}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phoneNumber" >Teléfono</Label>
                  <Input type="text" id="phoneNumber" name="phoneNumber" onChange={handleChange} value={values.phoneNumber}></Input>
                  {errors.phoneNumber && touched.phoneNumber ? (
                  <div className="errorMessage">{errors.phoneNumber}</div>) : null}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="type" >Tipo de cuenta</Label>
                  <CustomInput type="select" id="type" name="type" onChange={handleChange} value={values.type}>
                    <option value="employee">Empleado</option>
                    <option value="company">Organización</option>
                  </CustomInput>
                  {errors.type && touched.type ? (
                  <div className="errorMessage">{errors.type}</div>) : null}
                </FormGroup>
                <FormGroup>
                    <Button type="submit" value="submit" color="primary" className="mr-4 signbtn">Crear Usuario</Button>
                </FormGroup>
                <div className="text-center">
                    <p>¿Ya te registraste? <Link to="/">Inicia sesión</Link></p>
                </div>
              </Form>
            </Col>
            )}
          </Formik>
        </Row>
      </React.Fragment>
  );
};
export default SignUp;
