import React, { useCallback, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Row, Col, Input, Jumbotron, Label, FormGroup, CustomInput, ButtonGroup } from 'reactstrap';
import DetallePuesto from '../Puestos/DetallePuesto';
import { updateMatch } from '../../services/matchesService';
import { findOneJob } from '../../services/jobService';


const ModalSolicitudesEmpresa = (props:any) => {
  const {
    buttonLabel,
    className,
    match
  } = props;

  const state = match.state;
  const companyId = match.company.id;
  const companyName = match.company.username;
  const matchId = match.id;
  const jobId = match.jobId;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const refreshPage = () => {
    window.location.reload(false);
  }

  const acceptMatch = useCallback(async () => {
    updateMatch(matchId, 'active').then(() => {
      setModal(false);
    }).then(() => {
      refreshPage();
    });
  }, []);

  const declineMatch = useCallback(async () => {
    updateMatch(matchId, 'declined').then(() => {
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
          <DetallePuesto company={companyName} id={jobId}></DetallePuesto>
        </ModalBody>
        <ModalFooter>
          {(state == 'pending') && (
            <React.Fragment>
              <Button color="success" onClick={acceptMatch}>Aceptar Solicitud</Button>
              <Button color="danger" onClick={declineMatch}>Rechazar Solicitud</Button>
            </React.Fragment>
          )}
          {(state == 'active') && <Button color="danger" onClick={declineMatch}>Cancelar Solicitud</Button>}
          <Button color="secondary" onClick={toggle}>Regresar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalSolicitudesEmpresa;
