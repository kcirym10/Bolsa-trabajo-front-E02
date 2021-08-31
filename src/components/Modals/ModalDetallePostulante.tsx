import React, { useEffect, useState, useCallback } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Row, Col, Input, Jumbotron, Label, FormGroup, CustomInput } from 'reactstrap';
import { useFormik, Formik, Field, useFormikContext } from "formik";
import DetallePostulante from '../Postulantes/DetallePostulante';
import { postMatch } from '../../services/matchesService';
import Loader from '../Loader/Loader';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

//Esquema de validación
const validMatchSchema = Yup.object().shape({
  job: Yup.string().min(1, 'Muy corto!').required('Requerido'),
  message: Yup.string().min(1, 'Muy corto!').required('Requerido')
});

const ModalDetallePostulante = (props:any) => {
  const {
    buttonLabel,
    className,
    id,
    jobs
  } = props;

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [offer, setOffer] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  }

  const solicitarDatos = useCallback(async (values) => {
    setSubmitting(true);
    postMatch(id, values.job, values.message).then(() => {
      setNestedModal(false);
      setCloseAll(true);
      setSubmitting(false);
    })
  }, []);

  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
      <Modal size="lg" isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Detalle de:</ModalHeader>
        <ModalBody>
          <DetallePostulante id={id}></DetallePostulante>
          <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
          <ModalHeader>Contactar postulante</ModalHeader>
          { (isSubmitting) ?
              <div className="pt-2"style={{height:"100px"}}>
              <Loader></Loader>
              </div>
            :
            <React.Fragment>
            <Formik
              initialValues= {{
                message: '',
                job: ''
              }}
              validationSchema= {validMatchSchema}
              onSubmit = {(values) => {
                  solicitarDatos(values);
              }}
            >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,

            }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <React.Fragment>
                  <Label htmlFor="job" >Puesto:</Label>
                  <CustomInput type="select" id="job" name="job" onChange={handleChange} value={values.job}>
                      <option value='' disabled selected>-</option>
                    {jobs.map((job:any) => {
                      return <option value={job.id}>{job.nombre_puesto}</option>;
                    })};
                  </CustomInput>
                  {errors.job && touched.job ? (
                  <div className="errorMessage">Debe seleccionar un puesto</div>) : null}

                  <Label htmlFor="mensaje" >Mensaje:</Label>
                  <Input type="text" id="message" name="message" onChange={handleChange} value={values.message}/>
                  {errors.message && touched.message ? (
                  <div className="errorMessage">El mensaje no puede estar vacío</div>) : null}
                </React.Fragment>

              </ModalBody>
              <ModalFooter>
                  <Button color="primary" type="submit" value="submit">Solicitar datos</Button>{' '}
                <Button color="danger" onClick={toggleNested}>Cancelar</Button>
              </ModalFooter>
            </Form>
          )}
            </Formik>
            </React.Fragment>
          }
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleNested}>Contactar</Button>{' '}
          <Button color="secondary" onClick={toggle}>Regresar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalDetallePostulante;
