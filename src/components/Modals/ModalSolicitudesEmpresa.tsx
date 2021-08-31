import React, { useCallback, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DetallePostulante from '../Postulantes/DetallePostulante';
import { updateMatch } from '../../services/matchesService';
import { Form, Row, Col, Input, Jumbotron, Label, FormGroup, CustomInput, ButtonGroup } from 'reactstrap';

const ModalSolicitudesEmpresa = (props:any) => {
  const {
    buttonLabel,
    className,
    match
  } = props;

  const state = match.state;
  const employeeId = match.employee.id;
  const matchId = match.id;

  const [modal, setModal] = useState(false);
  const [showingEmployee, setShowingEmployee] = useState(true);

  const toggle = () => setModal(!modal);

  const refreshPage = () => {
    window.location.reload(false);
  }

  const acceptMatch = useCallback(async () => {
    updateMatch(matchId, 'hired').then(() => {
      setModal(false);
    }).then(() => {
      refreshPage();
    });
  }, []);

  const cancelMatch = useCallback(async () => {
    updateMatch(matchId, 'notHired').then(() => {
      setModal(false);
    }).then(() => {
      refreshPage();
    });
  }, []);

  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
      <Modal size="lg" isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Información de Solicitud</ModalHeader>
        <ModalBody>
          <ButtonGroup style={{width: "100%"}}>
            <Button color='light' onClick={() => setShowingEmployee(true)} active={showingEmployee}>Empleado</Button>
            <Button color='light' onClick={() => setShowingEmployee(false)} active={!showingEmployee}>Puesto</Button>
          </ButtonGroup>
          <br/>
          <br/>
          {(showingEmployee) ?
           <DetallePostulante state={state} id={employeeId}></DetallePostulante>
           :
           <h1>Puesto</h1>
          }
        </ModalBody>
        <ModalFooter>
          {(state == 'pending') && <Button color="danger" onClick={cancelMatch}>Cancelar Oferta</Button>}
          {(state == 'active') && (
            <React.Fragment>
              <Button color="success" onClick={acceptMatch}>Oferta Aceptada</Button>
              <Button color="danger" onClick={cancelMatch}>Rechazar Postulante</Button>
            </React.Fragment>
          )}
          <Button color="secondary" onClick={toggle}>Regresar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalSolicitudesEmpresa;
