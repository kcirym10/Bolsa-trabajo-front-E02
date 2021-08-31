import React, {useContext, useState, useCallback, useEffect} from 'react';
import { Table, Row, Col, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import municipios from "../../shared/municipios";
import puestos from "../../shared/puestos";
import { getEmployeesFiltered } from '../../services/employeeService';
import { getJobs } from '../../services/jobService';
import { useFormik, Formik, Field, useFormikContext } from "formik";
import { Form, Input, Jumbotron, Label, FormGroup, CustomInput } from "reactstrap";
import { UserContext } from '../Authentication/UserProvider';
import ModalDetallePostulante from '../Modals/ModalDetallePostulante';
import Loader from '../Loader/Loader';
import { Redirect } from "react-router-dom";

function ExplorarPostulantes() {

  const { user } = useContext(UserContext);

  const [isLoading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<any | null>(null);
  const [jobs, setJobs] = useState<any | null>(null);
  const [targetValues, setTargetValues] = useState<any>(['-']);

  useEffect(() => {
    if (user) {
      getEmployeesFiltered({field: "municipio", operator: "==", target: ""}).then((data:any) => {
        if (data && data.users) {
          setEmployees(data);
        }
        setLoading(false);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getJobs().then((data:any) => {
        if (data && data.jobs) {
          setJobs(data);
        }
      });
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      field: '',
      operator: '==',
      target: ''
    },
    onSubmit: async (values) => {
      setLoading(true);
      getEmployeesFiltered(values).then((data:any) => {
        if (data && data.users) {
          setEmployees(data);
          setLoading(false);
        } else {
          setEmployees(null);
        }
        setLoading(false);
      });
    },
  });

  useEffect(() => {
    formik.values.target = 'empty';
    switch (formik.values.field) {
      case 'empty':
        //formik.values.target = '-';
        setTargetValues([]);
        break;
      case 'municipio':
        //formik.values.target = municipios[0];
        setTargetValues(municipios);
        break;
      case 'secciones.clasificacion_puesto.clasificacion':
        //formik.values.target = puestos[0];
        setTargetValues(puestos);
        break;
      case 'secciones.actividad_deseada.jornada_de_trabajo':
        let jornadas = ['Parcial', 'Completa'];
        //formik.values.target = jornadas[0];
        setTargetValues(jornadas);
        break;
      case 'secciones.nivel_de_estudios.nivel_escolar':
        let nivelEscolar = ['Primaria', 'Secundaria', 'Técnica o Bachillerato', 'Profesional', 'Maestría o Doctorado'];
        //formik.values.target = nivelEscolar[0];
        setTargetValues(nivelEscolar);
        break;
      default:
        //formik.values.target = '-';
        setTargetValues(['-']);
    }
  }, [formik.values.field]);

  if (isLoading) {
    return <Loader></Loader>;
  }
  // console.log("Working: ", employees);
  return (
    <React.Fragment>
      <Row className="mx-auto">
        <Col md={{size: 10, offset: 1}} sm={{size: 12}}>
          <h1>Explorar Postulantes</h1>
          <Form onSubmit={formik.handleSubmit}>
          <Row className="mx-auto">
            <Col md={{size: 4}} sm={{size: 4}}>
              <Label htmlFor="field" >Filtrar por:</Label>
            </Col>
            <Col md={{size: 4}} sm={{size: 4}}>
            </Col>
            <Col md={{size: 4}} sm={{size: 4}}>
            </Col>
          </Row>
          <Row className="mx-auto">
            <Col md={{size: 4}} sm={{size: 4}}>
            <FormGroup>
              <CustomInput type="select" id="field" name="field" onChange={formik.handleChange} value={formik.values.field}>
                <option value="empty">-</option>
                <option value="municipio">Municipio</option>
                <option value="secciones.actividad_deseada.jornada_de_trabajo">Jornada de trabajo</option>
                <option value="secciones.clasificacion_puesto.clasificacion">Puesto deseado</option>
                <option value="secciones.nivel_de_estudios.nivel_escolar">Nivel de estudios</option>
              </CustomInput>
            </FormGroup>
            </Col>
            <Col md={{size: 4}} sm={{size: 4}}>
            <FormGroup>
              <CustomInput type="select" id="target" name="target" onChange={formik.handleChange} value={formik.values.target}>
                  <option value="empty" disabled selected>-</option>
                {targetValues.map((value:any) => {
                  return <option value={value}>{value}</option>;
                })};
              </CustomInput>
            </FormGroup>
            </Col>
            <Col md={{size: 4}} sm={{size: 4}}>
            <FormGroup>
                <Button type="submit" value="submit" color="primary" className="mr-4 signbtn">Buscar</Button>
            </FormGroup>
            </Col>
          </Row>
          </Form>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th style={{ textAlign: "center" }}>Ver detalle</th>
              </tr>
            </thead>
            <tbody>
            { employees && employees.users.map((postulante:any, index:number) => {
              let urlDetalle = "/postulantes/" + postulante.id;
              return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{postulante.username}</td>
                <td style={{ textAlign: "center" }}>
                  <ModalDetallePostulante id={postulante.id} jobs={jobs.jobs} buttonLabel="Ver detalle"></ModalDetallePostulante>
                </td>
              </tr>
              )
            })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ExplorarPostulantes;
