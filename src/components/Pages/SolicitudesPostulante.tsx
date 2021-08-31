import React, {useContext, useState, useCallback, useEffect} from 'react';
import { Table, Row, Col, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
//import misSolicitudesActivas from '../../testing/misSolicitudesActivas.json';
import misSolicitudesCerradas from '../../testing/misSolicitudesCerradas.json';
import { UserContext } from '../Authentication/UserProvider';
import { getMatches } from '../../services/matchesService';
import ModalSolicitudesEmpresa from '../Modals/ModalSolicitudesPostulante';
import Loader from '../Loader/Loader';

interface User {
  enrollmentFormId?: string;
};

function typeTextSwitch(param:any) {
  switch(param) {
    case 'pending':
      return 'Nuevo';
    case 'active':
      return 'En proceso';
    case 'hired':
      return 'Oferta';
    case 'notHired':
      return 'Cerrada';
    case 'declined':
      return 'Rechazada';
    default:
      return 'Rechazada';
  }
}

function typeColorSwitch(param:any) {
  switch(param) {
    case 'pending':
      return 'primary'
    case 'active':
      return 'warning';
    case 'hired':
      return 'success';
    case 'notHired':
      return 'danger';
    case 'declined':
      return 'secondary';
    default:
      return 'secondary';
  }
}

function isUserActive(user: any) {
  return user.state == "active";
}

function userHasEnrollmentForm(user: any) {
  return user.hasOwnProperty("enrollmentFormId");
}

function SolicitudesPostulanteContent(props: {user: any}) {

  const [activeMatches, setActiveMatches] = useState<any | null>(null);
  const [pastMatches, setPastMatches] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(true);

  const giveAccess = useCallback(async (id: any) => {
    //setLoading(true);
    //await answerMatch(id, 'active'); //jobId not working
    console.log(id);
    //setLoading(false);
  }, []);

  const decline = useCallback(async (id: any) => {
    console.log(id);
  }, []);

  const isPending = (state:any, id:any) => {
    if (state == 'pending') {
      return (
        <React.Fragment>
          <Button color="success" style={{width: "100%"}} className="mb-2" onClick={() => giveAccess(id)}>Dar acceso</Button>
          <Button color="danger" style={{width: "100%"}} className="mb-2" onClick={() => decline(id)}>Rechazar</Button>
        </React.Fragment>
      );
    }
    return;
  }

  useEffect(() => {
    if (props.user) {
      getMatches().then((data:any) => {
        if (data) {
          let _matches = data.matches;
          _matches.sort((a:any, b:any) => {
            return b.matchMetadata.createdAt - a.matchMetadata.createdAt;
          });
          setActiveMatches(_matches.filter((s:any) => s.state=== 'pending' || s.state === 'active'));
          setPastMatches(_matches.filter((s:any) => s.state=== 'hired' || s.state === 'notHired' || s.state === 'declined'));
          setLoading(false);
        }
      });
    }
  }, [props.user]);

  if (isLoading) {
    return (<Loader></Loader>);
  }

  return (
    <React.Fragment>
      <Row className="mx-auto">
        <Col md={{size: 10, offset: 1}} sm={{size: 12}}>
          <h1>Mis solicitudes activas</h1>
          <Table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Empresa</th>
                {/*<th>Puesto</th>*/}
                <th>Estatus</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            { activeMatches && activeMatches.map((solicitud:any, index:number) => {
              let urlDetalle = "/oferta/" + solicitud.id;
              let myClassName = 'alert alert-' + typeColorSwitch(solicitud.state) +' text-center mb-0';
              let date = new Date(solicitud.matchMetadata.createdAt * 1000);
              let formattedDate = (date.getDate()) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

              return (
              <tr>
                <td className="align-middle" style={{ width: "20%" }}>{formattedDate}</td>
                <td className="align-middle" style={{ width: "30%" }}>{solicitud.company.username}</td>
                {/*<td className="align-middle" style={{ width: "30%" }}>{solicitud.position}</td>*/}
                <td className="align-middle" style={{ width: "25%" }}>
                  <div className={myClassName} role="alert">{typeTextSwitch(solicitud.state)}</div>
                </td>
                <td className="text-center align-middle" style={{ width: "25%" }}>
                  <ModalSolicitudesEmpresa match={solicitud} buttonLabel="Ver detalle" className=""></ModalSolicitudesEmpresa>
                </td>
              </tr>
              )
            })}
            </tbody>
          </Table>
          <h1>Mis solicitudes pasadas</h1>
          <Table>
            <thead>
            <tr>
              <th>Fecha</th>
              <th>Empresa</th>
              {/*<th>Puesto</th>*/}
              <th>Estatus</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            { pastMatches && pastMatches.map((solicitud:any, index:number) => {
              let urlDetalle = "/oferta/" + solicitud.id;
              let myClassName = 'alert alert-' + typeColorSwitch(solicitud.state) +' text-center mb-0';
              let date = new Date(solicitud.matchMetadata.createdAt * 1000);
              let formattedDate = (date.getDate()) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
              return (
              <tr>
                <td className="align-middle" style={{ width: "20%" }}>{formattedDate}</td>
                <td className="align-middle" style={{ width: "30%" }}>{solicitud.company.username}</td>
                {/*<td className="align-middle" style={{ width: "30%" }}>{solicitud.position}</td>*/}
                <td className="align-middle" style={{ width: "25%" }}>
                  <div className={myClassName} role="alert">{typeTextSwitch(solicitud.state)}</div>
                </td>
                <td className="text-center align-middle" style={{ width: "25%" }}>
                  <ModalSolicitudesEmpresa match={solicitud} buttonLabel="Ver detalle" className=""></ModalSolicitudesEmpresa>
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

function SolicitudesPostulante() {
  
  const { user } = useContext(UserContext);

  if(!userHasEnrollmentForm(user)) {
    return (
        <React.Fragment>
          <Row className="mx-auto">
            <Col md={{size: 10, offset: 1}} sm={{size: 12}} style={{ textAlign: "center" }}>
              <h1>Antes de utilizar los servicios de la bolsa de trabajo debes llenar tus datos en el apartado:</h1>
              <br/>
              <Link to="/form-employee">
                <Button color="primary">
                  <h2>Mi Información</h2>
                </Button>
              </Link>
            </Col>
          </Row>
        </React.Fragment>
      )
  }

  if(!isUserActive(user)) {
    return (
        <React.Fragment>
          <Row className="mx-auto">
            <Col md={{size: 10, offset: 1}} sm={{size: 12}} style={{ textAlign: "center" }}>
              <h1>Gracias por llenar tu información. Un administrador del IEPAM revisará tus datos y en breve te dará acceso al uso completo de la plataforma.</h1>
            </Col>
          </Row>
        </React.Fragment>
      )
  }

  return (
    <React.Fragment>
      <SolicitudesPostulanteContent user={user}/>
    </React.Fragment>
    )

}

export default SolicitudesPostulante;
