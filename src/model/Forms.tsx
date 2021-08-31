export interface EmployeeForm {
    nombre: string;
    fecha_de_nacimiento: string;
    lugar_de_nacimiento?: string;
    calle?: string;
    municipio: string;
    codigo_postal?: string;
    telefono_casa?: string,
    telefono_celular?: string,
    secciones: {

        ultimo_ejemplo_o_actividad: {
            ultimo_periodo: string;
            empresa: string;
            puesto: string;
            responsabilidad?: string
        },

        actividad_deseada: {
            jornada_de_trabajo: string;
            funcion: string;
            capacitacion_o_entrenamiento?: string,
            consultoria?: string,
            coaching?: string
        },

        nivel_de_estudios: {
            nivel_escolar: string;
            nombre_institucion: string;
            fecha_inicio: string;
            fecha_fin: string
        },

        comentarios: {
            porque_quieres_trabajo: string
        },

        tus_habilidades_son: {
            habilidades?: string[]
        },

        clasificacion_puesto: {
            clasificacion: string
        },

        aceptacion_politica: {
            aceptacion: boolean
        }
    }
}

export interface CompanyForm {
    nombre_empresa: string,
    direccion_actual: string,
    municipio: string,
    estado: string,
    telefono_1?: string,
    telefono_2: string,
    aceptacion_politica : {
        aceptacion : boolean
      }
}

export interface PositionForm {
    secciones: {
        posicion_vacante: {
                jornada_de_trabajo: string,
                funcion: string,
                capacitacion_o_entrenamiento: string,
                consultoria: string,
                coaching: string
        },
        habilidades_necesarias: {
                operacion_de_maquinaria: string,
                conocimientos_tecnicos: string,
                manejo_de_equipo_de_computo: string,
                programacion_u_office: string,
                analisis_logico: string,
                analisis_numerico: string
        },
        competencias_requeridas: {
                competencias: string[]
        }
    }
}
