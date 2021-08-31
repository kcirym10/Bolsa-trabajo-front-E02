import React from 'react';
import { Form, Row, Col, Button, Input, Navbar, Label, FormGroup, Container } from "reactstrap";
import { Formik,Field } from "formik";
import municipios from "../../shared/municipios";
import * as Yup from 'yup';
import { postJob } from '../../services/jobService';

//Esquema de validación
const validPositionInfoSchema = Yup.object().shape({
  jobTitle: Yup.string().required('Requerido'),
  worktime: Yup.string().required('Requerido'),
  jobFunction: Yup.string().required('Requerido'),
  desiredActivity: Yup.object().test('at-least-one-activity', "Marcar al menos un valor en capacitación, consultoría, o coaching", value =>
  !!(value.training || value.consulting || value.coaching)),
  abilities: Yup.object().test('at-least-one-activity', "Llenar al menos un recuadro de descripcion de habilidades", value =>
  !!(value.machineOperationDescription || value.technicalKnowledgeDescription || value.computingEquimentKnowledge || value.programmingKnowledge || value.logicKnowledge || value.numericKnowledge)),
  competences: Yup.array().min(1,'Eligir al menos una de las competencias en la lista'),
});

function generateOrganizationEnrollmentDocument(values: { jobTitle: any; worktime: any; jobFunction: any; desiredActivity: any; abilities?: { machineOperationDescription: string; technicalKnowledgeDescription: string; computingEquimentKnowledge: string; programmingKnowledge: string; logicKnowledge: string; numericKnowledge: string; professionalTitle: string; }; competences: any; technicalKnowledgeDescription?: any; computingEquimentKnowledge?: any; programmingKnowledge?: any; logicKnowledge?: any; numericKnowledge?: any; }) {
  let enrollmentDocument =
  {
    nombre_puesto: values.jobTitle,
    posicion_vacante: {
            jornada_de_trabajo: values.worktime,
            funcion: values.jobFunction,
            capacitacion_o_entrenamiento: values.desiredActivity?.training,
            consultoria: values.desiredActivity?.consulting,
            coaching: values.desiredActivity?.coaching
    },
    habilidades_necesarias: {
            operacion_de_maquinaria: values.abilities?.machineOperationDescription,
            conocimientos_tecnicos: values.abilities?.technicalKnowledgeDescription,
            manejo_de_equipo_de_computo: values.abilities?.computingEquimentKnowledge,
            programacion_u_office: values.abilities?.programmingKnowledge,
            analisis_logico: values.abilities?.logicKnowledge,
            analisis_numerico: values.abilities?.numericKnowledge,
            titulo_profesional: values.abilities?.professionalTitle
    },
    competencias_requeridas: {
            competencias: values.competences
    }
}
  return enrollmentDocument;
}

const FormPosition = () => (
        <React.Fragment>
          <Container>
            <Row className='my-5'>
              <h1>Formato para registro de puesto</h1>
            </Row>
          </Container>
          <Formik
            initialValues={{
              jobTitle: '',
              worktime:'',
              jobFunction:'',
              desiredActivity:{
                training:'',
                consulting:'',
                coaching:'',
              },
              abilities:{
                machineOperationDescription: '',
                technicalKnowledgeDescription: '',
                computingEquimentKnowledge: '',
                programmingKnowledge: '',
                logicKnowledge: '',
                numericKnowledge: '',
                professionalTitle: ''
              },
              competences: [],
            }}
            validationSchema={validPositionInfoSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(true);
                //console.log(JSON.stringify(values, null, 2))
                //alert(JSON.stringify(values, null, 2));
                let enrollmentDocument = generateOrganizationEnrollmentDocument(values)
                console.log(JSON.stringify(enrollmentDocument));
                postJob(enrollmentDocument).then(() => {
                  setSubmitting(false);
                });
              }, 400);
            }}
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
              <Form onSubmit={handleSubmit}>
                <Container id='desiredActivityData'>
                  <FormGroup>
                      <Label htmlFor="jobTitle"><strong>Nombre del puesto</strong></Label>
                      <Input    type="text"
                                name="jobTitle"
                                value={values.jobTitle}
                                onChange={handleChange} />
                                {errors.jobTitle && touched.jobTitle ? (
                                <div className="errorMessage">{errors.jobTitle}</div>) : null}
                  </FormGroup>
                  <FormGroup tag="fieldset">
                    <Label htmlFor='worktime'><strong>Jornada de Trabajo</strong></Label>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio"
                                  name="worktime"
                                  value='partial'
                                  onChange={handleChange}/>{' '}
                          Parcial (horas)
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio"
                                  name="worktime"
                                  value='fulltime'
                                  onChange={handleChange}/>
                          Completa
                        </Label>
                      </FormGroup>
                      {errors.worktime && touched.worktime ? (
                      <div className="errorMessage">{errors.worktime}</div>) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup tag='fieldset'>
                    <Label htmlFor="jobFunction"><strong>Función</strong></Label>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio"
                                  name="jobFunction"
                                  value='Operativa'
                                  onChange={handleChange}/>{' '}
                          Operativa
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio"
                                  name="jobFunction"
                                  value='Contable'
                                  onChange={handleChange}/>{' '}
                          Contable
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio"
                                  name="jobFunction"
                                  value='Administrativa'
                                  onChange={handleChange}/>{' '}
                          Administrativa
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio"
                                  name="jobFunction"
                                  value='Gerencial'
                                  onChange={handleChange}/>{' '}
                          Gerencial
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio"
                                  name="jobFunction"
                                  value='A Pie de Maquina'
                                  onChange={handleChange}/>{' '}
                          A pie de máquina
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio"
                                  name="jobFunction"
                                  value='Supervision'
                                  onChange={handleChange}/>{' '}
                          Supervisión
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio"
                                  name="jobFunction"
                                  value='Oficina'
                                  onChange={handleChange}/>{' '}
                          Oficina
                        </Label>
                      </FormGroup>
                      {errors.jobFunction && touched.jobFunction ? (
                      <div className="errorMessage">{errors.jobFunction}</div>) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="desiredActivity.training"><strong>Capacitación o Entrenamiento</strong></Label>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio"
                                  name="desiredActivity.training"
                                  value='Operativa'
                                  onChange={handleChange}/>{' '}
                          Operativa
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio"
                                  name="desiredActivity.training"
                                  value='Ejecutiva'
                                  onChange={handleChange}/>{' '}
                          Ejecutiva
                        </Label>
                      </FormGroup>
                      {errors.desiredActivity && touched.desiredActivity ? (
                      <div className="errorMessage">{errors.desiredActivity}</div>) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="desiredActivity.consulting"><strong>Consultoría</strong></Label>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio"
                                  name="desiredActivity.consulting"
                                  value='Operativa'
                                  onChange={handleChange}/>{' '}
                          Operativa
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio"
                                  name="desiredActivity.consulting"
                                  value='Ejecutiva'
                                  onChange={handleChange}/>{' '}
                          Ejecutiva
                        </Label>
                      </FormGroup>
                      {errors.desiredActivity && touched.desiredActivity ? (
                      <div className="errorMessage">{errors.desiredActivity}</div>) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="desiredActivity.coaching"><strong>Coaching</strong></Label>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio"
                                  name="desiredActivity.coaching"
                                  value='Operativa'
                                  onChange={handleChange}/>{' '}
                          Operativa
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio"
                                  name="desiredActivity.coaching"
                                  value='Ejecutiva'
                                  onChange={handleChange}/>{' '}
                          Ejecutiva
                        </Label>
                      </FormGroup>
                      {errors.desiredActivity && touched.desiredActivity ? (
                      <div className="errorMessage">{errors.desiredActivity}</div>) : null}
                    </Col>
                  </FormGroup>
                </Container>
                <Container id='abilityData'>
                  <h3>Habilidades</h3>
                  <FormGroup>
                  <Label htmlFor='abilities'><strong>Habilidades necesarias:</strong></Label>
                    <FormGroup>
                    <Label htmlFor='abilities.machineOperationDescription'>Operación de maquinaria (especificar que tipo)</Label>
                      <Input  type="textarea"
                              name='abilities.machineOperationDescription'
                              onChange={handleChange}
                              value={values.abilities.machineOperationDescription} />
                    </FormGroup>
                    {errors.abilities && touched.abilities ? (
                      <div className="errorMessage">{errors.abilities}</div>) : null}
                    <FormGroup>
                    <Label htmlFor='abilities.technicalKnowledgeDescription'>Conocimientos Técnicos (especificar)</Label>
                    <Input  type="textarea"
                            name='abilities.technicalKnowledgeDescription'
                            onChange={handleChange}
                            value={values.abilities.technicalKnowledgeDescription} />
                    </FormGroup>
                    {errors.abilities && touched.abilities ? (
                      <div className="errorMessage">{errors.abilities}</div>) : null}
                    <FormGroup>
                    <Label htmlFor='abilities.computingEquimentKnowledge'>Manejo de equipo de cómputo</Label>
                    <Input  type="textarea"
                            name='abilities.computingEquimentKnowledge'
                            onChange={handleChange}
                            value={values.abilities.computingEquimentKnowledge} />
                    </FormGroup>
                    {errors.abilities && touched.abilities ? (
                      <div className="errorMessage">{errors.abilities}</div>) : null}
                    <FormGroup>
                    <Label htmlFor='abilities.programmingKnowledge'>Programación u Office</Label>
                    <Input  type="textarea"
                            name='abilities.programmingKnowledge'
                            onChange={handleChange}
                            value={values.abilities.programmingKnowledge} />
                    </FormGroup>
                    {errors.abilities && touched.abilities ? (
                      <div className="errorMessage">{errors.abilities}</div>) : null}
                    <FormGroup>
                    <Label htmlFor='abilities.logicKnowledge'>Análisis Lógico</Label>
                    <Input  type="textarea"
                            name='abilities.logicKnowledge'
                            onChange={handleChange}
                            value={values.abilities.logicKnowledge} />
                    </FormGroup>
                    {errors.abilities && touched.abilities ? (
                      <div className="errorMessage">{errors.abilities}</div>) : null}
                    <FormGroup>
                    <Label htmlFor='abilities.numericKnowledge'>Análisis Numérico</Label>
                    <Input  type="textarea"
                            name='abilities.numericKnowledge'
                            onChange={handleChange}
                            value={values.abilities.numericKnowledge} />
                    </FormGroup>
                    {errors.abilities && touched.abilities ? (
                      <div className="errorMessage">{errors.abilities}</div>) : null}
                    <FormGroup>
                    <Label htmlFor='abilities.professionalTitle'>Titulo Profesional en:</Label>
                    <Input  type='text'
                            name='abilities.professionalTitle'
                            onChange={handleChange}
                            value={values.abilities.professionalTitle} />
                    </FormGroup>
                    {errors.abilities && touched.abilities ? (
                      <div className="errorMessage">{errors.abilities}</div>) : null}
                  </FormGroup>
                </Container>
                <Container id='competenceData'>
                  <h3>Competencias</h3>
                  <FormGroup>
                  <Label htmlFor='competences'><strong>Competencias requeridas:</strong></Label>
                    <FormGroup>
                      <Field  type="checkbox"
                              name='competences'
                              value='Liderazgo'/>{' '}Liderazgo
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox"
                              name='competences'
                              value='Conciliador'/>{' '}Conciliador
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox"
                              name='competences'
                              value='Negociador'/>{' '}Negociador
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox"
                              name='competences'
                              value='Trabajo en Equipo'/>{' '}Trabajo en Equipo
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox"
                              name='competences'
                              value='Certificación en capacitación'/>{' '}Certificación en capacitación
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox"
                              name='competences'
                              value='Certificación como consejero'/>{' '}Certificación como consejero
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox"
                              name='competences'
                              value='Capacidad gerencial'/>{' '}Capacidad gerencial
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox"
                              name='competences'
                              value='Capacidad directiva'/>{' '}Capacidad directiva
                    </FormGroup>
                    {errors.competences && touched.competences ? (
                            <div className="errorMessage">{errors.competences}</div>) : null}
                  </FormGroup>
                </Container>
                <Container>
                  <FormGroup>
                    <Button type="submit" color="primary">
                        Enviar
                    </Button>
                  </FormGroup>
                </Container>
              </Form>
            )}
          </Formik>
        </React.Fragment>
    );

export default FormPosition ;
