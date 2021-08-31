import React, {useContext, useState, useCallback, useEffect} from 'react';
import { Table, Row, Col, Button } from 'reactstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import listaPostulantes from '../../testing/detallesPostulantes.json'
import { getEmployeeDetail } from '../../services/employeeService';
import { UserContext } from '../Authentication/UserProvider';
import Loader from '../Loader/Loader';

const DetallePostulante = (props:any) => {
  const {
    id,
    state
  } = props;

  //const { id } = useParams<{ id: any }>();
  const { user } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getEmployeeDetail(id).then((data:any) => {
      if (data && data.enrollmentForm) {
        setUserInfo(data.enrollmentForm);
        setLoading(false);
      }
    });
  }, [user]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (!userInfo) {
    return (
      <React.Fragment>
        <h1>404. Not found.</h1>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <Row className="mx-auto">
        <Col md={{size: 7, offset: 0}} sm={{size: 12}}>
          <h1 className="display-4">{userInfo.nombre}</h1>
        </Col>
        <Col className="text-center" md={{size: 5, offset: 0}} sm={{size: 12}}>
          <br/>
          {/*<Button color="primary" className="w-100 mw-200" onClick={() => extenderOferta()}>Extender oferta</Button>*/}
        </Col>
      </Row>
      <Row className="mx-auto">
        <Col md={{size: 12, offset: 0}} sm={{size: 12}}>
          {(state && state == 'active') &&
            <React.Fragment>
              <hr></hr>
              <h4 className="mb-3">Información de Contacto</h4>
              <dl className="row">

                <dt className="col-sm-5">Dirección actual:</dt>
                <dd className="col-sm-7">{userInfo.calle + ", " + userInfo.municipio + ", " + userInfo.codigo_postal}</dd>

                <dt className="col-sm-5">Fecha de nacimiento:</dt>
                <dd className="col-sm-7">{userInfo.fecha_de_nacimiento}</dd>

                <dt className="col-sm-5">Lugar de nacimiento:</dt>
                <dd className="col-sm-7">{userInfo.lugar_de_nacimiento}</dd>

                <dt className="col-sm-5">Telefono casa:</dt>
                <dd className="col-sm-7">{userInfo.telefono_casa}</dd>

                <dt className="col-sm-5">Telefono celular:</dt>
                <dd className="col-sm-7">{userInfo.telefono_celular}</dd>
              </dl>
            </React.Fragment>
          }

          <hr></hr>
          <h4 className="mb-3">Último Empleo o Actividad</h4>
          <dl className="row">

            <dt className="col-sm-5">Ultimo Periodo:</dt>
            <dd className="col-sm-7">{userInfo.secciones!.ultimo_ejemplo_o_actividad!.ultimo_periodo}</dd>

            <dt className="col-sm-5">Empresa:</dt>
            <dd className="col-sm-7">{userInfo.secciones!.ultimo_ejemplo_o_actividad!.empresa}</dd>

            <dt className="col-sm-5">Puesto:</dt>
            <dd className="col-sm-7">{userInfo.secciones!.ultimo_ejemplo_o_actividad!.puesto}</dd>

            <dt className="col-sm-5">Responsabilidad:</dt>
            <dd className="col-sm-7">{userInfo.secciones!.ultimo_ejemplo_o_actividad!.responsabilidad}</dd>
          </dl>

          <hr></hr>
          <h4 className="mb-3">Actividad Deseada</h4>
          <dl className="row">

            <dt className="col-sm-5">Jornada de trabajo:</dt>
            <dd className="col-sm-7">{userInfo.secciones!.actividad_deseada!.jornada_de_trabajo}</dd>

            <dt className="col-sm-5">Función:</dt>
            <dd className="col-sm-7">{userInfo.secciones!.actividad_deseada!.funcion}</dd>

            <dt className="col-sm-5">Capacitación o entrenamiento:</dt>
            <dd className="col-sm-7">{userInfo.secciones!.actividad_deseada!.capacitacion_o_entrenamiento}</dd>

            <dt className="col-sm-5">Consultoría:</dt>
            <dd className="col-sm-7">{userInfo.secciones!.actividad_deseada!.consultoria}</dd>

            <dt className="col-sm-5">Coaching:</dt>
            <dd className="col-sm-7">{userInfo.secciones!.actividad_deseada!.coaching}</dd>
          </dl>

          <hr></hr>
          <h4 className="mb-3">Nivel de estudios</h4>
          <dl className="row">
            <dt className="col-sm-5">Nivel Escolar:</dt>
            <dd className="col-sm-7">{userInfo.secciones!.nivel_de_estudios!.nivel_escolar}</dd>
            <dt className="col-sm-5">Institución:</dt>
            <dd className="col-sm-7">{userInfo.secciones!.nivel_de_estudios!.nombre_institucion}</dd>
            <dt className="col-sm-5">Fecha de Inicio:</dt>
            <dd className="col-sm-7">{userInfo.secciones!.nivel_de_estudios!.fecha_inicio}</dd>
            <dt className="col-sm-5">Fecha de Fin:</dt>
            <dd className="col-sm-7">{userInfo.secciones!.nivel_de_estudios!.fecha_fin}</dd>
          </dl>

          <hr></hr>
          <h4 className="mb-3">Habilidades</h4>
          <ul>
          {userInfo.secciones!.tus_habilidades_son!.habilidades.map((habilidad:any, index:number) => {
            return <li>{habilidad}</li>;
          })}
          </ul>
          <hr></hr>
          <h4 className="mb-3">Comentarios</h4>
          <dl className="row">

            <dt className="col-sm-5">¿Por qué quieres trabajo?</dt>
            <dd className="col-sm-7">{userInfo.secciones!.comentarios!.porque_quieres_trabajo}</dd>
          </dl>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default DetallePostulante;
