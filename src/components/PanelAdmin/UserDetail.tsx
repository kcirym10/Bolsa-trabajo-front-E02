import React, { useEffect, useState } from 'react';
import { Col, Container, Jumbotron, Row, Spinner } from 'reactstrap';
import { auth } from '../../firebase';
import { CompanyForm, EmployeeForm } from '../../model/Forms';
import { UserType, UserTypeEnum } from '../../model/Users';
import { getEnrollmentForm } from '../../services/formService';

interface UserDetailProps {
    userId: string;
    userType: UserTypeEnum;
    children: React.ReactNode
}

function EmployeeDetail(props: { enrollmentForm: EmployeeForm }) {

    return (
        <React.Fragment>
            <Container fluid>
                <Row className="mx-auto">
                    <Col md={{ size: 8, offset: 2 }} sm="12">
                        <h2><b>{props.enrollmentForm.nombre}</b></h2>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row className="mx-auto">
                    <Col md={{ size: 9, offset: 2 }} sm={{ size: 12 }}>
                        <hr></hr>
                        <h4 className="mb-3">Información General</h4>
                        <dl className="row">

                            <dt className="col-sm-4">Dirección actual:</dt>
                            <dd className="col-sm-8">{(props.enrollmentForm.calle + ", " || "") + props.enrollmentForm.municipio + ", " + (props.enrollmentForm.codigo_postal || "")}</dd>

                            <dt className="col-sm-4">Fecha de nacimiento:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.fecha_de_nacimiento}</dd>

                            <dt className="col-sm-4">Lugar de nacimiento:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.lugar_de_nacimiento || "Información No Disponible"}</dd>

                            <dt className="col-sm-4">Telefono casa:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.telefono_casa || "Información No Disponible"}</dd>

                            <dt className="col-sm-4">Telefono celular:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.telefono_celular || "Información No Disponible"}</dd>
                        </dl>

                        <hr></hr>
                        <h4 className="mb-3">Último Empleo o Actividad</h4>
                        <dl className="row">

                            <dt className="col-sm-4">Ultimo Periodo:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.secciones!.ultimo_ejemplo_o_actividad!.ultimo_periodo}</dd>

                            <dt className="col-sm-4">Empresa:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.secciones!.ultimo_ejemplo_o_actividad!.empresa}</dd>

                            <dt className="col-sm-4">Puesto:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.secciones!.ultimo_ejemplo_o_actividad!.puesto}</dd>

                            <dt className="col-sm-4">Responsabilidad:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.secciones!.ultimo_ejemplo_o_actividad!.responsabilidad || "Información No Disponible"}</dd>
                        </dl>

                        <hr></hr>
                        <h4 className="mb-3">Actividad Deseada</h4>
                        <dl className="row">

                            <dt className="col-sm-4">Jornada de trabajo:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.secciones!.actividad_deseada!.jornada_de_trabajo}</dd>

                            <dt className="col-sm-4">Función:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.secciones!.actividad_deseada!.funcion}</dd>

                            <dt className="col-sm-4">Capacitación o entrenamiento:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.secciones!.actividad_deseada!.capacitacion_o_entrenamiento || "Información No Disponible"}</dd>

                            <dt className="col-sm-4">Consultoría:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.secciones!.actividad_deseada!.consultoria || "Información No Disponible"}</dd>

                            <dt className="col-sm-4">Coaching:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.secciones!.actividad_deseada!.coaching || "Información No Disponible"}</dd>
                        </dl>

                        <hr></hr>
                        <h4 className="mb-3">Nivel de estudios</h4>
                        <dl className="row">
                            <dt className="col-sm-4">Nivel Escolar:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.secciones!.nivel_de_estudios!.nivel_escolar}</dd>
                            <dt className="col-sm-4">Institución:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.secciones!.nivel_de_estudios!.nombre_institucion}</dd>
                            <dt className="col-sm-4">Fecha de Inicio:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.secciones!.nivel_de_estudios!.fecha_inicio}</dd>
                            <dt className="col-sm-4">Fecha de Fin:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.secciones!.nivel_de_estudios!.fecha_fin}</dd>
                        </dl>

                        <hr></hr>
                        <h4 className="mb-3">Habilidades</h4>
                        <ul>
                            {props.enrollmentForm.secciones.tus_habilidades_son.habilidades ? (props.enrollmentForm.secciones.tus_habilidades_son.habilidades.map((habilidad, index) => {
                                return <li>{habilidad}</li>;
                            })) : (<li>Ninguna especificada</li>)
                            }
                        </ul>
                        <hr></hr>
                        <h4 className="mb-3">Comentarios</h4>
                        <dl className="row">

                            <dt className="col-sm-4">¿Por qué quieres trabajo?</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.secciones!.comentarios!.porque_quieres_trabajo}</dd>
                        </dl>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

function CompanyDetail(props: { enrollmentForm: CompanyForm }) {

    return (
        <React.Fragment>
            <Container fluid>
                <Row className="mx-auto">
                    <Col md={{ size: 8, offset: 2 }} sm="12">
                        <h2><b>{props.enrollmentForm.nombre_empresa}</b></h2>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row className="mx-auto">
                    <Col md={{ size: 9, offset: 2 }} sm={{ size: 12 }}>
                        <hr></hr>
                        <h4 className="mb-3">Información General</h4>
                        <dl className="row">

                            <dt className="col-sm-4">Dirección actual:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.direccion_actual}</dd>

                            <dt className="col-sm-4">Municipio:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.municipio}</dd>

                            <dt className="col-sm-4">Estado:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.estado}</dd>

                            <dt className="col-sm-4">Telefono 1:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.telefono_1 || "Información No Disponible"}</dd>

                            <dt className="col-sm-4">Telefono 2:</dt>
                            <dd className="col-sm-8">{props.enrollmentForm.telefono_2}</dd>
                        </dl>
                    </Col>
                </Row>
            </Container>

        </React.Fragment>
    )
}

function UserDetail(props: UserDetailProps) {

    const [enrollmentForm, setEnrollmentForm] = useState<EmployeeForm | CompanyForm>();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getEnrollmentFormFromAPI = async () => {
            const enrollmentFormAPI = await getEnrollmentForm(props.userId);
            if (!enrollmentFormAPI || enrollmentFormAPI.message) {
                setEnrollmentForm(undefined);
            }
            else {
                setEnrollmentForm(enrollmentFormAPI)
            }
        }
        auth.onAuthStateChanged(async user => {
            if (user) {
                await getEnrollmentFormFromAPI();
            }
            else {
                console.log("No user")
            }

            setLoading(false);
        })
    }, [])

    if (isLoading) {
        return (
            <React.Fragment>
                <Container className="text-center">
                    <Spinner />
                </Container>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {
                enrollmentForm ? (
                    <div>
                        {props.userType == UserTypeEnum.employee ? (<EmployeeDetail enrollmentForm={enrollmentForm as EmployeeForm} />) : (<CompanyDetail enrollmentForm={enrollmentForm as CompanyForm} />)}
                        {props.children}
                    </div>
                ) :
                    (
                        <Container className="text-center">
                            <Row>
                                <Col>
                                    <h2>Error: No se pudo acceder a la información. Intente de nuevo más tarde</h2>
                                </Col>
                            </Row>
                        </Container>
                    )
            }
        </React.Fragment>
    )
}

export default UserDetail;