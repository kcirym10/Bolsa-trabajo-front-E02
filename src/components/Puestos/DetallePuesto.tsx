import React, {useContext, useState, useCallback, useEffect} from 'react';
import { Table, Row, Col, Button } from 'reactstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import listaPostulantes from '../../testing/detallesPostulantes.json'
import { getEmployeeDetail } from '../../services/employeeService';
import { findOneJob } from '../../services/jobService';
import { UserContext } from '../Authentication/UserProvider';
import Loader from '../Loader/Loader';

const DetallePostulante = (props:any) => {
  const {
    id,
    state,
    company
  } = props;

  //const { id } = useParams<{ id: any }>();
  const { user } = useContext(UserContext);

  const [jobInfo, setJobInfo] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    findOneJob(id).then((data:any) => {
      console.log(data);
      setJobInfo(data);
      setLoading(false);
    });
  }, [user]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <React.Fragment>
      <Row className="mx-auto">
        <Col md={{size: 7, offset: 0}} sm={{size: 12}}>
          <h1 className="display-4">{company}</h1>
        </Col>
        <Col className="text-center" md={{size: 5, offset: 0}} sm={{size: 12}}>
        </Col>
      </Row>
      <Row className="mx-auto">
        <Col md={{size: 12, offset: 0}} sm={{size: 12}}>
              <hr></hr>
              <h4 className="mb-3">Información de Puesto</h4>
              <dl className="row">
                <dt className="col-sm-5">Nombre de Puesto:</dt>
                <dd className="col-sm-7">{jobInfo.nombre_puesto}</dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-5">Jornada de Trabajo:</dt>
                <dd className="col-sm-7">{jobInfo.posicion_vacante.jornada_de_trabajo}</dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-5">Función:</dt>
                <dd className="col-sm-7">{jobInfo.posicion_vacante.funcion}</dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-5">Capacitación o entrenamiento:</dt>
                <dd className="col-sm-7">{jobInfo.posicion_vacante.capacitacion_o_entrenamiento}</dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-5">Consultoría:</dt>
                <dd className="col-sm-7">{jobInfo.posicion_vacante.consultoria}</dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-5">Coaching:</dt>
                <dd className="col-sm-7">{jobInfo.posicion_vacante.coaching}</dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-5">Competencias requeridas:</dt>
                <ul>
                {jobInfo.competencias_requeridas.competencias.map((habilidad:any) => {
                  return <li>{habilidad}</li>;
                })}
                </ul>
              </dl>

              <hr></hr>
              <h4 className="mb-3">Habilidades necesarias</h4>
              <dl className="row">
                <dt className="col-sm-5">Operación de maquinaria:</dt>
                <dd className="col-sm-7">{jobInfo.habilidades_necesarias.operacion_de_maquinaria}</dd>
              </dl>
              <dl className="row">
                <dt className="col-sm-5">Conocimientos Técnicos:</dt>
                <dd className="col-sm-7">{jobInfo.habilidades_necesarias.conocimientos_tecnicos}</dd>
              </dl>
              <dl className="row">
                <dt className="col-sm-5">Manejo de equipo de cómputo:</dt>
                <dd className="col-sm-7">{jobInfo.habilidades_necesarias.manejo_de_equipo_de_computo}</dd>
              </dl>
              <dl className="row">
                <dt className="col-sm-5">Programación u Office:</dt>
                <dd className="col-sm-7">{jobInfo.habilidades_necesarias.programacion_u_office}</dd>
              </dl>
              <dl className="row">
                <dt className="col-sm-5">Análisis Lógico:</dt>
                <dd className="col-sm-7">{jobInfo.habilidades_necesarias.analisis_logico}</dd>
              </dl>
              <dl className="row">
                <dt className="col-sm-5">Análisis Numérico:</dt>
                <dd className="col-sm-7">{jobInfo.habilidades_necesarias.analisis_numerico}</dd>
              </dl>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default DetallePostulante;
