import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { POAContext } from '../../../context/POAContext'
import MapDrawer from '../../MapView/MapDrawer'
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PrintIcon from '@material-ui/icons/Print';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TimelineIcon from '@material-ui/icons/Timeline';
import RolValidation from '../../../logic/RolValidation';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import POASeguimientoCasosFormulario from './POASeguimientoCasos-Formulario';



const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));





const POASeguimientoCasosModalDetails = (props) => {



    //useContext

    const { POA } = useContext(POAContext)


    //vars and const
    const url = process.env.REACT_APP_BACKEND_API_URL
    let config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }
    //////////////////-map---//////////////////////////////
    const [centerMap, setCenterMap] = useState({ 'lat': POA.latitud ? POA.latitud : 4.6501730300, 'lng': POA.longitud ? POA.longitud : -74.1073590000 })
    const [zoom, setZoom] = useState(7)
    const [venues, setVenues] = useState([{
        id: POA.id ? POA.id : new Date(),
        nombre: POA.nombrePOA ? POA.nombrePOA : 'marker',
        ubicacion: [POA.latitud ? POA.latitud : 4.6501730300, POA.longitud ? POA.longitud : -74.1073590000],
        description: POA.estado ? POA.estado : 'El nuevo marcador'
    }])


    /////////////////new map implementation 

    const [center, setCenter] = useState([POA.latitud ? POA.latitud : 4.6501730300, POA.longitud ? POA.longitud : -74.1073590000])
    const drawConfig = {
        edit: false,
        delete: false,
        rectangle: false,
        line: false,
        polygon: false,
        circle: false,
        polyline: false,
        marker: false,
        circlemarker: false,
    }

    //useStyle
    const classes = useStyles();

    //useState
    const [openModalHistorico, setOpenModalHistorico] = React.useState(false);
    const [openModalEditSeguimientoCasos, setOpenModalEditSeguimientoCasos] = React.useState(false);
    const [moreDetailsSeguimientoCasos, setMoreDetailsSeguimientoCasos] = useState({})
    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [historico, setHistorico] = useState([])



    //useEffect
    useEffect(() => {
        setMoreDetailsSeguimientoCasos({})
        getMoreDetailsSeguimientoCasos()

    }, [])

    let dataletS2territorio = {
        type: 'FeatureCollection',
        features: []
    };

    const multiPolygon = [
        [
            [51.51, -0.12],
            [51.51, -0.13],
            [51.53, -0.13],
        ],
        [
            [51.51, -0.05],
            [51.51, -0.07],
            [51.53, -0.07],
        ],
    ]

    useEffect(() => {
        console.log('coordenadas area protegida stringify: ', moreDetailsSeguimientoCasos.s2areaProtegida)
    }, [moreDetailsSeguimientoCasos])


    //functions

    ///funciones handle para  modal en listado de historico de mofidicaciones a dicho caso de seguimiento. 
    const handleOpenModalHistorico = () => {
        setOpenModalHistorico(true);
    };

    const handleCloseModalHistorico = () => {
        setOpenModalHistorico(false);
    };
    ///funciones handle para  modal en edicion de caso de seguimiento
    const handleOpenModalEditSeguimientoCasos = () => {
        setOpenModalEditSeguimientoCasos(true);
    };

    const handleCloseModalEditSeguimientoCasos = () => {
        setOpenModalEditSeguimientoCasos(false);
    };

    //hANDLES de speedDial

    const handleCloseSpeedDial = () => {
        setOpenSpeedDial(false);
    }

    const handleOpenSpeedDial = () => {
        setOpenSpeedDial(true);
    }

    const convertDataPolygon = (array) => {
        array.map(() => {
            return (
                []
            )
        })

    }

    const getMoreDetailsSeguimientoCasos = async () => {
        try {
            const response = await axios.get(`${url}/seguimiento-casos/${props.detailsSeguimientoCasos.id}`, config)
            console.log('more details: ', response.data)
            setMoreDetailsSeguimientoCasos(response.data)
        }
        catch (error) {
            console.log(error.response)
        }

    }



    const printSeguimientoCasos = () => {
        window.print();
    }

    const historicoSeguimientoCasos = async () => {
        try {
            const historicoResponse = await axios.get(`${url}/historico?filter[order]=createAt%20ASC&filter[where][seguimientoCasoId]=${props.detailsSeguimientoCasos.id}`, config)
            setHistorico(historicoResponse.data)
            console.log('historico de caso de seguimiento: ', historico)
            setOpenModalHistorico(true);

        }
        catch (e) {
            console.log(e.response)
            alert(e.response.message)

        }
    }


    const deleteSeguimientoCasos = async (e) => {
        e.preventDefault();
        try {
            if (window.confirm("¿Estás seguro de eliminar el caso de seguimiento?")) {
                await axios.delete(`${url}/seguimiento-casos/${moreDetailsSeguimientoCasos.id}`, config)
                alert('El Seguimiento al caso ha sido eliminado con éxito')
                props.getSeguimientoCasos()
                props.setOpenModalDetailsSeguimientoCasos(false)


            }
        }
        catch (error) {
            console.log(error.response)
            alert(`El Seguimiento al caso no ha sido eliminado con éxito, ${error.response.data.error.message}`)
        }

    }


    const actionsDetailsSeguimientoCasos = () => {
        let optionsActionsDetailsSeguimientoCasos = [];


        optionsActionsDetailsSeguimientoCasos.push({ icon: <PrintIcon />, name: 'Imprimir', function: printSeguimientoCasos })

        // if (RolValidation([3,4,7,8])===true){
        //   optionsActionsDetailsSeguimientoCasos.push({ icon: <EditIcon />, name: 'Editar', function:editPOA})
        // }
        if (RolValidation([4, 7, 8]) === true) {
            optionsActionsDetailsSeguimientoCasos.push({ icon: <DeleteForeverIcon />, name: 'Eliminar', function: deleteSeguimientoCasos })
        }
        if (RolValidation([3, 4, 7, 8]) === true) {
            optionsActionsDetailsSeguimientoCasos.push({ icon: <TimelineIcon />, name: 'Histórico de modificaciones', function: historicoSeguimientoCasos })
        }
        if (RolValidation([3, 4, 7, 8]) === true) {
            optionsActionsDetailsSeguimientoCasos.push({ icon: <EditIcon />, name: 'Editar', function: handleOpenModalEditSeguimientoCasos })
        }
        //optionsActionsDetailsSeguimientoCasos.push({ icon: <ShareIcon />, name: 'Compartir', function:sharePOA })

        return optionsActionsDetailsSeguimientoCasos
    }

    let optionsActionsDetailsSeguimientoCasos = actionsDetailsSeguimientoCasos()





    return (
        <>
            <div className="row d-flex justify-content-between">
                <div className="col-12 d-flex justify-content-between mx-2 align-items-center">
                    <h3 className="m-0">Detalles de Registro Seguimiento al Caso</h3>
                    <SpeedDial
                        ariaLabel="SpeedDial"
                        hidden={false}
                        icon={<SpeedDialIcon />}
                        onClose={handleCloseSpeedDial}
                        onOpen={handleOpenSpeedDial}
                        open={openSpeedDial}
                        direction="left"
                    >
                        {optionsActionsDetailsSeguimientoCasos.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={action.function}
                            />
                        ))}
                    </SpeedDial>
                </div>
                <hr className="d-flex justify-content-between align-items-center divisor"></hr>
                <div className="col-6 columnaA">
                    <div className="row">
                        <div className="col-12 form-group ">
                            <label htmlFor="s1nombreProyecto">Nombre del proyecto</label>
                            <span name="s1nombreProyecto" className="form-control">{moreDetailsSeguimientoCasos.s1nombreProyecto ? moreDetailsSeguimientoCasos.s1nombreProyecto : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s1reglonEconomico">Reglón económico</label>
                            <span name="s1reglonEconomico" className="form-control">{moreDetailsSeguimientoCasos.s1reglonEconomico ? moreDetailsSeguimientoCasos.s1reglonEconomico : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s1responsable">Responsable</label>
                            <span name="s1responsable" className="form-control">{moreDetailsSeguimientoCasos.s1responsable ? moreDetailsSeguimientoCasos.s1responsable : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s1operador">Operador</label>
                            <span name="s1operador" className="form-control">{moreDetailsSeguimientoCasos.s1operador ? moreDetailsSeguimientoCasos.s1operador : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s1financiador">Financiador</label>
                            <span name="s1financiador" className="form-control">{moreDetailsSeguimientoCasos.s1financiador ? moreDetailsSeguimientoCasos.s1financiador : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s2nombreComunidad">Comunidad</label>
                            <span name="s2nombreComunidad" className="form-control">{moreDetailsSeguimientoCasos.s2nombreComunidad ? moreDetailsSeguimientoCasos.s2nombreComunidad : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s2pueblo">Pueblo</label>
                            <span name="s2pueblo" className="form-control">{moreDetailsSeguimientoCasos.s2pueblo ? moreDetailsSeguimientoCasos.s2pueblo : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s2numeroHabitantes">Número de habitantes</label>
                            <span name="s2numeroHabitantes" className="form-control">{moreDetailsSeguimientoCasos.s2numeroHabitantes ? moreDetailsSeguimientoCasos.s2numeroHabitantes : ''} </span>
                        </div>
                        {/* <div className="col-12 form-group ">
                        <label htmlFor="s2ubicacionGeografica">Ubicación geográfica</label>
                        <span name="s2ubicacionGeografica" className="form-control">{moreDetailsSeguimientoCasos.s2ubicacionGeografica ? moreDetailsSeguimientoCasos.s2ubicacionGeografica.join(",")   : ''} </span>
                    </div> */}
                        <div className="col-12 form-group ">
                            <label htmlFor="s2reconocimiento">Reconocimiento</label>
                            <span name="s2reconocimiento" className="form-control">{moreDetailsSeguimientoCasos.s2reconocimiento ? moreDetailsSeguimientoCasos.s2reconocimiento : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s2desplazamiento">Desplazamiento</label>
                            <span name="s2desplazamiento" className="form-control">{moreDetailsSeguimientoCasos.s2desplazamiento ? moreDetailsSeguimientoCasos.s2desplazamiento : ''} </span>
                        </div>
                        {/* <div className="col-12 form-group ">
                        <label htmlFor="s2territorio">Territorio</label>
                        <span name="s2territorio" className="form-control">{moreDetailsSeguimientoCasos.s2territorio ? moreDetailsSeguimientoCasos.s2territorio.join(",")   : ''} </span>
                    </div>
                    <div className="col-12 form-group ">
                        <label htmlFor="s2areaProtegida">Area Protegida</label>
                        <span name="s2areaProtegida" className="form-control">{moreDetailsSeguimientoCasos.s2areaProtegida ? moreDetailsSeguimientoCasos.s2areaProtegida.join(",")   : ''} </span>
                    </div>
                    <div className="col-12 form-group ">
                        <label htmlFor="s2areaReservaforestal">Reserva Forestal</label>
                        <span name="s2areaReservaforestal" className="form-control">{moreDetailsSeguimientoCasos.s2areaReservaforestal ? moreDetailsSeguimientoCasos.s2areaReservaforestal.join(",")   : ''} </span>
                    </div>
                    <div className="col-12 form-group ">
                        <label htmlFor="s2areaBaldios">Area baldios</label>
                        <span name="s2areaBaldios" className="form-control">{moreDetailsSeguimientoCasos.s2areaBaldios ? moreDetailsSeguimientoCasos.s2areaBaldios.join(",")   : ''} </span>
                    </div> */}
                        <div className="col-12 form-group ">
                            <label htmlFor="s2riesgoExtincion">¿En riesgo de extinción?</label>
                            <span name="s2riesgoExtincion" className="form-control">{moreDetailsSeguimientoCasos.s2riesgoExtincion ? moreDetailsSeguimientoCasos.s2riesgoExtincion : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s2fragilidadDemografica">¿Existe fragilidad demográfica?</label>
                            <span name="s2fragilidadDemografica" className="form-control">{moreDetailsSeguimientoCasos.s2fragilidadDemografica ? moreDetailsSeguimientoCasos.s2fragilidadDemografica : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s3procesoConsulta">¿Hubo proceso de consulta?</label>
                            <span name="s3procesoConsulta" className="form-control">{moreDetailsSeguimientoCasos.s3procesoConsulta ? moreDetailsSeguimientoCasos.s3procesoConsulta : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s3estadoConsulta">Estado actual</label>
                            <span name="s3estadoConsulta" className="form-control">{moreDetailsSeguimientoCasos.s3estadoConsulta ? moreDetailsSeguimientoCasos.s3estadoConsulta : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s3consultaConcertada">¿Ruta de consulta concertada?</label>
                            <span name="s3consultaConcertada" className="form-control">{moreDetailsSeguimientoCasos.s3consultaConcertada ? moreDetailsSeguimientoCasos.s3consultaConcertada : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s3porqueConsultaConcertada">¿Por qué?</label>
                            <span name="s3porqueConsultaConcertada" className="form-control">{moreDetailsSeguimientoCasos.s3porqueConsultaConcertada ? moreDetailsSeguimientoCasos.s3porqueConsultaConcertada : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s4participantesComunidad">Participantes por la comunidad</label>
                            <span name="s4participantesComunidad" className="form-control">{moreDetailsSeguimientoCasos.s4participantesComunidad ? moreDetailsSeguimientoCasos.s4participantesComunidad : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s4participantesEntesControl">Participantes por los entes de control</label>
                            <span name="s4participantesEntesControl" className="form-control">{moreDetailsSeguimientoCasos.s4participantesEntesControl ? moreDetailsSeguimientoCasos.s4participantesEntesControl.join(",") : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s4participantesGobierno">Participantes por el gobierno</label>
                            <span name="s4participantesGobierno" className="form-control">{moreDetailsSeguimientoCasos.s4participantesGobierno ? moreDetailsSeguimientoCasos.s4participantesGobierno.join(",") : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s4participantesOrganizaciones">Participantes por las organizaciones asesoras u observadoras</label>
                            <span name="s4participantesOrganizaciones" className="form-control">{moreDetailsSeguimientoCasos.s4participantesOrganizaciones ? moreDetailsSeguimientoCasos.s4participantesOrganizaciones.join(",") : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s5documentosPrevioConsulta">¿Se realizó entrega de documentos del proyecto de manera previa al inicio de la consulta?</label>
                            <span name="s5documentosPrevioConsulta" className="form-control">{moreDetailsSeguimientoCasos.s5documentosPrevioConsulta ? moreDetailsSeguimientoCasos.s5documentosPrevioConsulta : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s5fuentesFinanciacion">¿Se dio información sobre fuentes de financiación del proceso?</label>
                            <span name="s5fuentesFinanciacion" className="form-control">{moreDetailsSeguimientoCasos.s5fuentesFinanciacion ? moreDetailsSeguimientoCasos.s5fuentesFinanciacion : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s6garantiaEquipoTecnico">¿La comunidad contó con garantía para tener equipo técnico propio?</label>
                            <span name="s6garantiaEquipoTecnico" className="form-control">{moreDetailsSeguimientoCasos.s6garantiaEquipoTecnico ? moreDetailsSeguimientoCasos.s6garantiaEquipoTecnico : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s6financiacionLogistica">¿Se garantizó y financió la logística?</label>
                            <span name="s6financiacionLogistica" className="form-control">{moreDetailsSeguimientoCasos.s6financiacionLogistica ? moreDetailsSeguimientoCasos.s6financiacionLogistica : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s7claridadInformacion">¿Hubo claridad de lenguaje y oportunidad en la información?</label>
                            <span name="s7claridadInformacion" className="form-control">{moreDetailsSeguimientoCasos.s7claridadInformacion ? moreDetailsSeguimientoCasos.s7claridadInformacion : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s7preguntasComunidad">¿Se respondió a las preguntas de la comunidad?</label>
                            <span name="s7preguntasComunidad" className="form-control">{moreDetailsSeguimientoCasos.s7preguntasComunidad ? moreDetailsSeguimientoCasos.s7preguntasComunidad : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s19tipoAnexo1">Tipo de Anexo 1</label>
                            <span name="s19tipoAnexo1" className="form-control">{moreDetailsSeguimientoCasos.s19tipoAnexo1 ? moreDetailsSeguimientoCasos.s19tipoAnexo1 : 'Sin tipo de anexo 1'} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s19anexo1">Anexo1</label>
                            {moreDetailsSeguimientoCasos.s19anexo1
                                ? (<a name="s19anexo1" className="form-control" href={moreDetailsSeguimientoCasos.s19anexo1 ? moreDetailsSeguimientoCasos.s19anexo1 : '#'} target="_blank" rel="noreferrer">{moreDetailsSeguimientoCasos.s19anexo1 ? moreDetailsSeguimientoCasos.s19anexo1 : '#'}</a>)
                                : (<span name="s19anexo1" className="form-control">Sin anexo 1</span>)
                            }
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s19tipoAnexo2">Tipo de Anexo 2</label>
                            <span name="s19tipoAnexo2" className="form-control">{moreDetailsSeguimientoCasos.s19tipoAnexo2 ? moreDetailsSeguimientoCasos.s19tipoAnexo2 : 'Sin tipo de anexo 2'} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s19anexo1">Anexo2</label>
                            {moreDetailsSeguimientoCasos.s19anexo2
                                ? (<a name="s19anexo2" className="form-control" href={moreDetailsSeguimientoCasos.s19anexo2 ? moreDetailsSeguimientoCasos.s19anexo2 : '#'} target="_blank" rel="noreferrer">{moreDetailsSeguimientoCasos.s19anexo2 ? moreDetailsSeguimientoCasos.s19anexo2 : '#'}</a>)
                                : (<span name="s19anexo2" className="form-control">Sin anexo 2</span>)
                            }
                        </div>
                    </div>
                </div>
                <div className="col-6 columnaB">
                    <div className="row">
                        <div className="col-12 form-group ">
                            <label htmlFor="s7exposicionalcances">¿Se expusieron los alcances reales del proyecto?</label>
                            <span name="s7exposicionalcances" className="form-control">{moreDetailsSeguimientoCasos.s7exposicionalcances ? moreDetailsSeguimientoCasos.s7exposicionalcances : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s8estudioImpactoAmbiental">¿Hubo estudio de impacto ambiental?</label>
                            <span name="s8estudioImpactoAmbiental" className="form-control">{moreDetailsSeguimientoCasos.s8estudioImpactoAmbiental ? moreDetailsSeguimientoCasos.s8estudioImpactoAmbiental : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s8concertadoEstudio">¿Concertados?</label>
                            <span name="s8concertadoEstudio" className="form-control">{moreDetailsSeguimientoCasos.s8concertadoEstudio ? moreDetailsSeguimientoCasos.s8concertadoEstudio : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s8plasmaConcertado">¿Se plasmó en el estudio lo concertado?</label>
                            <span name="s8plasmaConcertado" className="form-control">{moreDetailsSeguimientoCasos.s8plasmaConcertado ? moreDetailsSeguimientoCasos.s8plasmaConcertado : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s9planManejoAmbiental">¿Hubo plan de manejo ambiental?</label>
                            <span name="s9planManejoAmbiental" className="form-control">{moreDetailsSeguimientoCasos.s9planManejoAmbiental ? moreDetailsSeguimientoCasos.s9planManejoAmbiental : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s9concertadoPlan">¿Concertado?</label>
                            <span name="s9concertadoPlan" className="form-control">{moreDetailsSeguimientoCasos.s9concertadoPlan ? moreDetailsSeguimientoCasos.s9concertadoPlan : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s9plasmaConcertado">¿Se plasmó en el estudio lo concertado con la comunidad?</label>
                            <span name="s9plasmaConcertado" className="form-control">{moreDetailsSeguimientoCasos.s9plasmaConcertado ? moreDetailsSeguimientoCasos.s9plasmaConcertado : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s10planCompensacion">¿Hubo planes de compensación?</label>
                            <span name="s10planCompensacion" className="form-control">{moreDetailsSeguimientoCasos.s10planCompensacion ? moreDetailsSeguimientoCasos.s10planCompensacion : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s10concertadoCompensacion">¿Concertado?</label>
                            <span name="s10concertadoCompensacion" className="form-control">{moreDetailsSeguimientoCasos.s10concertadoCompensacion ? moreDetailsSeguimientoCasos.s10concertadoCompensacion : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s10plasmaConcertado">¿Se plasmó en el plan lo concertado con la comunidad?</label>
                            <span name="s10plasmaConcertado" className="form-control">{moreDetailsSeguimientoCasos.s10plasmaConcertado ? moreDetailsSeguimientoCasos.s10plasmaConcertado : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s11consultaConcertada">¿La consulta fue concertada?</label>
                            <span name="s11consultaConcertada" className="form-control">{moreDetailsSeguimientoCasos.s11consultaConcertada ? moreDetailsSeguimientoCasos.s11consultaConcertada : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s11relacionPlanVida">¿Hay relación o diálogo con respecto a planes de vida?</label>
                            <span name="s11relacionPlanVida" className="form-control">{moreDetailsSeguimientoCasos.s11relacionPlanVida ? moreDetailsSeguimientoCasos.s11relacionPlanVida : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s11relacionPlanSalvaguarda">¿Hay relación o dialogo con respecto a plan de salvaguarda?</label>
                            <span name="s11relacionPlanSalvaguarda" className="form-control">{moreDetailsSeguimientoCasos.s11relacionPlanSalvaguarda ? moreDetailsSeguimientoCasos.s11relacionPlanSalvaguarda : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s11relacionProtocolosBioculturales">¿Hay relación o diálogo con respeto a protocolos bioculturales?</label>
                            <span name="s11relacionProtocolosBioculturales" className="form-control">{moreDetailsSeguimientoCasos.s11relacionProtocolosBioculturales ? moreDetailsSeguimientoCasos.s11relacionProtocolosBioculturales : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s11relacionProtocolosCP">¿Hay relación o diálogo con respeto a protocolos de consulta previa?</label>
                            <span name="s11relacionProtocolosCP" className="form-control">{moreDetailsSeguimientoCasos.s11relacionProtocolosCP ? moreDetailsSeguimientoCasos.s11relacionProtocolosCP : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s12cumplimientoAcuerdos">¿Hay cumplimiento?</label>
                            <span name="s12cumplimientoAcuerdos" className="form-control">{moreDetailsSeguimientoCasos.s12cumplimientoAcuerdos ? moreDetailsSeguimientoCasos.s12cumplimientoAcuerdos : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s12observaciones">Observaciones:</label>
                            <span name="s12observaciones" className="form-control">{moreDetailsSeguimientoCasos.s12observaciones ? moreDetailsSeguimientoCasos.s12observaciones : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s13comiteSeguimientoAcuerdos">¿Se conformó comité de seguimiento a los acuerdos?</label>
                            <span name="s13comiteSeguimientoAcuerdos" className="form-control">{moreDetailsSeguimientoCasos.s13comiteSeguimientoAcuerdos ? moreDetailsSeguimientoCasos.s13comiteSeguimientoAcuerdos : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s13comiteReunido">¿Se reune el comité de seguimiento?</label>
                            <span name="s13comiteReunido" className="form-control">{moreDetailsSeguimientoCasos.s13comiteReunido ? moreDetailsSeguimientoCasos.s13comiteReunido : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s13integrantesComite">¿Quienes conforman el comité?</label>
                            <span name="s13integrantesComite" className="form-control">{moreDetailsSeguimientoCasos.s13integrantesComite ? moreDetailsSeguimientoCasos.s13integrantesComite : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s13garantesIndigenas">¿Pueblos indígenas como garante tienen asiento allí?</label>
                            <span name="s13garantesIndigenas" className="form-control">{moreDetailsSeguimientoCasos.s13garantesIndigenas ? moreDetailsSeguimientoCasos.s13garantesIndigenas : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s13garantesGobierno">¿Gobierno como garante tiene asiento allí?</label>
                            <span name="s13garantesGobierno" className="form-control">{moreDetailsSeguimientoCasos.s13garantesGobierno ? moreDetailsSeguimientoCasos.s13garantesGobierno : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s14monitoreoAmbiental">¿Existe el monitoreo ambiental?</label>
                            <span name="s14monitoreoAmbiental" className="form-control">{moreDetailsSeguimientoCasos.s14monitoreoAmbiental ? moreDetailsSeguimientoCasos.s14monitoreoAmbiental : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s14PeriodicidadMonitoreo">¿Con qué periodicidad se realiza?</label>
                            <span name="s14PeriodicidadMonitoreo" className="form-control">{moreDetailsSeguimientoCasos.s14PeriodicidadMonitoreo ? moreDetailsSeguimientoCasos.s14PeriodicidadMonitoreo : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s14participantesMonitoreo">¿Quienes participan?</label>
                            <span name="s14participantesMonitoreo" className="form-control">{moreDetailsSeguimientoCasos.s14participantesMonitoreo ? moreDetailsSeguimientoCasos.s14participantesMonitoreo : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s14participacionComunidad">¿La comunidad participa del monitoreo?</label>
                            <span name="s14participacionComunidad" className="form-control">{moreDetailsSeguimientoCasos.s14participacionComunidad ? moreDetailsSeguimientoCasos.s14participacionComunidad : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s15tipoAfectaciones">¿Qué tipo de afectaciones ha generado el desarrollo del proyecto o de la consulta?</label>
                            <span name="s15tipoAfectaciones" className="form-control">{moreDetailsSeguimientoCasos.s15tipoAfectaciones ? moreDetailsSeguimientoCasos.s15tipoAfectaciones.join(",") : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s16tipoBeneficios">¿Qué tipo de beneficios ha generado el desarrollo del proyecto o de la consulta?</label>
                            <span name="s16tipoBeneficios" className="form-control">{moreDetailsSeguimientoCasos.s16tipoBeneficios ? moreDetailsSeguimientoCasos.s16tipoBeneficios.join(",") : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s17conflictosGenerados">Conflictos generados</label>
                            <span name="s17conflictosGenerados" className="form-control">{moreDetailsSeguimientoCasos.s17conflictosGenerados ? moreDetailsSeguimientoCasos.s17conflictosGenerados.join(",") : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s18defensaTerritorial">Procesos de defensa territorial con ocasión de los proyectos a consultar</label>
                            <span name="s18defensaTerritorial" className="form-control">{moreDetailsSeguimientoCasos.s18defensaTerritorial ? moreDetailsSeguimientoCasos.s18defensaTerritorial.join(",") : ''} </span>
                        </div>
                        <div className="col-12 form-group ">
                            <label htmlFor="s19comentarios">Comentarios Adicionales</label>
                            <span name="s19comentarios" className="form-control">{moreDetailsSeguimientoCasos.s19comentarios ? moreDetailsSeguimientoCasos.s19comentarios : ''} </span>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row w-100 mb-4 pb-4 containerMapSeguimientoCasosDetails">
                        {/* <MapView 
                        venues={venues} 
                        center={centerMap} 
                        zoom={zoom}
                        label='Area Protegida'
                        polygon={true}
                        data={multiPolygon}
                        //data={moreDetailsSeguimientoCasos.s2areaProtegida}
                    />  */}
                        <MapDrawer
                            drawConfig={drawConfig}
                            center={center}
                            label='Mapa del territorio //Reserva Forestal // Baldíos // Área Protegida'
                            zoom={zoom}
                            //type='drawing'
                            type='showing'
                            //onChange={onChangeS2territorio}
                            dataLet={dataletS2territorio}
                            venues={venues}
                            simpleVenues={true}
                            object={moreDetailsSeguimientoCasos}
                            nameSelect='s2territorio'
                            setObject={setMoreDetailsSeguimientoCasos}
                            selectOptions={moreDetailsSeguimientoCasos.s2territorio}
                        />

                    </div>
                    {/* <div className="row w-100 mb-4 pb-4 containerMapSeguimientoCasosDetails">
                    <MapView 
                        venues={venues} 
                        center={centerMap} 
                        zoom={zoom}
                        label='ReservaForestal'
                        // polygon={true}
                        // data={moreDetailsSeguimientoCasos.}
                    /> 
                </div>
                <div className="row w-100 mb-4 pb-4 containerMapSeguimientoCasosDetails">
                    <MapView 
                        venues={venues} 
                        center={centerMap} 
                        zoom={zoom}
                        label='Area Baldios'
                        // polygon={true}
                        // data={moreDetailsSeguimientoCasos.}
                    /> 
                </div>
                <div className="row w-100 mb-4 pb-4 containerMapSeguimientoCasosDetails">
                    <MapView 
                        venues={venues} 
                        center={centerMap} 
                        zoom={zoom}
                        label='Mapa del Territorio'
                        // polygon={true}
                        // data={moreDetailsSeguimientoCasos.}
                    /> 
                </div> */}

                </div>
            </div>
            {/* -------------------------------MODAL HISTORICO------------------------*/}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModalHistorico}
                onClose={handleCloseModalHistorico}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalHistorico}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Histórico de modificaciones</h2>
                        <p id="transition-modal-description">Encuentre listadas de manera descendente por orden cronológico los registros de creación y modificación a este caso de seguimiento.</p>
                        <div className="row TabsModalDetailPOA">
                            <TableContainer component={Paper}>
                                <Table
                                    className={classes.table}
                                    size="small"
                                    aria-label="a dense table"
                                    stickyHeader={true}
                                    padding={'none'}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Fecha de registro (GMT 0)</TableCell>
                                            <TableCell align="right">ID POA</TableCell>
                                            <TableCell align="right">ID Seguimiento Caso</TableCell>
                                            <TableCell align="right">Tipo Item</TableCell>
                                            <TableCell align="right">Acción</TableCell>
                                            <TableCell align="right">Id Usuario</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {historico.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell component="th" scope="item" >{item.createAt}</TableCell>
                                                <TableCell align="right">{item.poaId}</TableCell>
                                                <TableCell align="right">{item.seguimientoCasoId ? item.seguimientoCasoId : ''}</TableCell>
                                                <TableCell align="right">{item.tipoItem}</TableCell>
                                                <TableCell align="right">{item.accion}</TableCell>
                                                <TableCell align="right">{item.usuarioId}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {/* -------------------------------MODAL EDICION SEGUIMIENTO CASO------------------------*/}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModalEditSeguimientoCasos}
                onClose={handleCloseModalEditSeguimientoCasos}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalEditSeguimientoCasos}>
                    <div className={classes.paper + " row"} id='modalEditSeguimientoCaso'>
                        <POASeguimientoCasosFormulario edit={true} seguimientoCaso = {moreDetailsSeguimientoCasos} />
                    </div>
                </Fade>
            </Modal>

        </>

    )
}

export default POASeguimientoCasosModalDetails
