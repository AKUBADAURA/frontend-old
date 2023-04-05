import React, { useContext, useEffect, useParams, useState } from 'react'
import { Redirect } from "react-router-dom";
import MapView from '../MapView/MapView';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MapDrawer from '../MapView/MapDrawer';
import { POAContext } from '../../context/POAContext';
import ReactDOM from "react-dom";
import ReporteIntro from './Reporte-Intro';
import Plantilla from '../ui/plantilla';
import Header from '../header/Header';
import ReportePiePagina from './Reporte-piePagina';


const useStyles = makeStyles({
    table: {
        //minWidth: 650,
    },
});

//print configuration



const ReporteCuerpo = (props) => {


    //print configuration

    ///////////////////////////////////////////

    //vars and const 
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
    let dataletS2territorio = {
        type: 'FeatureCollection',
        features: []
    };
    //useParams
    const classes = useStyles();
    //useContext
    const {
        POASYCasosReporte, setPOASYCasosReporte,
        typeReporte, setTypeReporte,
        configReporte
    } = useContext(POAContext)
    //useState
    const [zoom, setZoom] = useState(12)

    //useEffect
    useEffect(() => {
        console.log('POASYCasosReporte: ', POASYCasosReporte)
        // window.print();
    }, [POASYCasosReporte])


    return (
        <>
            <div className="row m-0">
                <Header />
                <div className="row w-100 m-0 p-0">
                    <div className="p-0 m-0">
                        <ReporteIntro typeReporte className="break-after-page" />
                        {/* <div className="salto_pagina_despues"></div> */}
                        {
                            POASYCasosReporte.map((POA) => {
                                return (
                                    <div className="containerReporte mb-3 break-after-page" key={POA.id}>
                                        <Card variant="outlined" >
                                            <CardContent>
                                                {/* FIRST SECTION */}
                                                <div className="row mb-3 align-items-end">
                                                    {/* TITULO DEL POA */}
                                                    <h4 className="col-12 mt-3 mb-3 w-100 text-center titlePOAReporte">{POA.nombrePOA.toUpperCase()}</h4>

                                                    {/* IMAGEN DE ARCHIVO DE COMUNIDAD Y GRAFICA */}
                                                    <div className="col-3">
                                                        <figure className="overflow-hidden figureReporte m-0" >
                                                            <img
                                                                className="imageReportePOA"
                                                                alt="POA"
                                                                // src= 'https://www.masaya-experience.com/santa-marta/wp-content/uploads/2019/05/Tayrona-Pueblito.jpg'
                                                                // src={process.env.PUBLIC_URL + '/img/paisajes/image (' + Math.floor(Math.random()*43)+1 + ').jpg' || "https://www.masaya-experience.com/santa-marta/wp-content/uploads/2019/05/Tayrona-Pueblito.jpg"}
                                                                src={process.env.PUBLIC_URL + '/img/paisajes/image (' + (Math.floor(Math.random() * (42) + 1)) + ').jpg' || "https://www.masaya-experience.com/santa-marta/wp-content/uploads/2019/05/Tayrona-Pueblito.jpg"}
                                                            />
                                                            <figcaption className="text-right">{`Imagen de archivo.`}</figcaption>
                                                        </figure>
                                                    </div>

                                                    {/* DETALLES DEL POA */}

                                                    <div className="col-9 seccion-detalles-POA">
                                                        <div className="mb-2 row">
                                                            <h4 className="col-12 mb-1">Detalles del Programa, Obra o Actividad</h4>
                                                            <div className="col-12">
                                                                <hr className="m-auto w-100 d-flex justify-content-between align-items-center divisor"></hr>
                                                            </div>
                                                        </div>
                                                        <TableContainer className="row cuerpoDetallesPOA">
                                                            <Table className={classes.table} size="small" aria-label="a dense table">
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">¿Es POMCAS?:</TableCell>
                                                                        <TableCell align="right">{POA.esPOMCAS ? POA.esPOMCAS : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">¿Tiene licencia?:</TableCell>
                                                                        <TableCell align="right">{POA.tieneLicencia ? POA.tieneLicencia : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">Código:</TableCell>
                                                                        <TableCell align="right">{POA.codigo ? POA.codigo : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">Ejecutor:</TableCell>
                                                                        <TableCell align="right">{POA.ejecutorPOA ? POA.ejecutorPOA : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">¿Es con acuerdos?:</TableCell>
                                                                        <TableCell align="right">{POA.esConAcuerdos ? POA.esConAcuerdos : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">Estado:</TableCell>
                                                                        <TableCell align="right">{POA.estado ? POA.estado : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">Estado de la gestión:</TableCell>
                                                                        <TableCell align="right">{POA.estadoGestion ? POA.estadoGestion : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">Etapa:</TableCell>
                                                                        <TableCell align="right">{POA.etapa ? POA.etapa : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">¿Etapa finalizada?:</TableCell>
                                                                        <TableCell align="right">{POA.etapaFinalizada ? POA.etapaFinalizada : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">PINE:</TableCell>
                                                                        <TableCell align="right">{POA.pine ? POA.pine : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">Sector:</TableCell>
                                                                        <TableCell align="right">{POA.sector ? POA.sector : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">Fecha de Planeación:</TableCell>
                                                                        <TableCell align="right">{POA.fechaPlaneacion ? POA.fechaPlaneacion : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">Fecha Real:</TableCell>
                                                                        <TableCell align="right">{POA.fechaReal ? POA.fechaReal : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">Fecha Acto Administrativo:</TableCell>
                                                                        <TableCell align="right">{POA.fechaActoAdmin ? POA.fechaActoAdmin : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">Número de Acto Administrativo:</TableCell>
                                                                        <TableCell align="right">{POA.numActoAdmin ? POA.numActoAdmin : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">¿Tiene Licencia?:</TableCell>
                                                                        <TableCell align="right">{POA.tieneLicencia ? POA.tieneLicencia : '---Sin datos---'}</TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </div>
                                                </div>
                                                {/* SECOND SECTION */}
                                                <div className="p-0 m-0 break-after-page">
                                                    <div className="row mb-3 align-items-end">
                                                        {/* DETALLES COMUNIDAD */}
                                                        <div className="col-9 seccion-detalles-Comunidad">
                                                            <div className="mb-2 row">
                                                                <h4 className="col-12 mb-1">Comunidad</h4>
                                                                <div className="col-12">
                                                                    <hr className="m-auto w-100 d-flex justify-content-between align-items-center divisor"></hr>
                                                                </div>
                                                            </div>
                                                            <TableContainer className="row cuerpoDetallesComunidad">
                                                                <Table className={classes.table} size="small" aria-label="a dense table">
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell component="th" scope="row">Comunidad:</TableCell>
                                                                            <TableCell align="right">{POA.comunidad ? POA.comunidad : '---Sin datos---'}</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell component="th" scope="row">Región:</TableCell>
                                                                            <TableCell align="right">{POA.region ? POA.region : '---Sin datos---'}</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell component="th" scope="row">Departamento:</TableCell>
                                                                            <TableCell align="right">{POA.departamento ? POA.departamento : '---Sin datos---'}</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell component="th" scope="row">Municipio:</TableCell>
                                                                            <TableCell align="right">{POA.municipio ? POA.municipio : '---Sin datos---'}</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell component="th" scope="row">Tipo de comunidad:</TableCell>
                                                                            <TableCell align="right">{POA.tipoComunidad ? POA.tipoComunidad : '---Sin datos---'}</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell component="th" scope="row">Pueblo:</TableCell>
                                                                            <TableCell align="right">{POA.pueblo ? POA.pueblo : '---Sin datos---'}</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell component="th" scope="row">Total de Comunidades:</TableCell>
                                                                            <TableCell align="right">{POA.totalComunidades ? POA.totalComunidades : '---Sin datos---'}</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell component="th" scope="row">Latitud:</TableCell>
                                                                            <TableCell align="right">{POA.latitud ? POA.latitud : '---Sin datos---'}</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell component="th" scope="row">Longitud:</TableCell>
                                                                            <TableCell align="right">{POA.longitud ? POA.longitud : '---Sin datos---'}</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell component="th" scope="row">Código del municipio:</TableCell>
                                                                            <TableCell align="right">{POA.codigoMunicipio ? POA.codigoMunicipio : '---Sin datos---'}</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </div>
                                                        {/* IMAGEN DE UBICACION GEOGRAFICA - DEPARTAMENTO*/}
                                                        <div className="col-3">
                                                            <figure
                                                                className="overflow-hidden figureReporte m-0"
                                                            >
                                                                <img
                                                                    // className="w-100"
                                                                    className="imageReporteDepartamento"
                                                                    alt="departamento de colombia"
                                                                    src={process.env.PUBLIC_URL + '/img/departamentos/' + POA.departamento + '.jpg' || "https://www.elcolombiano.com/documents/10157/0/580x397/0c16/580d365/none/11101/KLJJ/image_content_29780442_20171103171455.jpg"}
                                                                />
                                                                <figcaption className="text-right">{`Imagen de archivo.`}</figcaption>
                                                            </figure>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* THIRD SECTION - SEGUIMIENTO A CASOS  */}
                                                {
                                                    POA.seguimientoCasos.length !== 0
                                                        ? (
                                                            <>
                                                                <div className="w-100 mb-3 mt-3 align-items-end mt-0 pt-0">
                                                                    <div className="col-12 seccion-detalles-Caso-A">
                                                                        <div className="mb-2 row">
                                                                            <h4 className="col-12 mb-1 ">Casos de seguimiento</h4>
                                                                            <div className="col-12">
                                                                                <hr className="m-auto w-100 d-flex justify-content-between align-items-center divisor"></hr>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                        : ''
                                                }
                                                {
                                                    POA.seguimientoCasos.length !== 0
                                                        ? (
                                                            POA.seguimientoCasos.map((seguimientoCaso, index) => {
                                                                return (
                                                                    // <div>
                                                                    <div className="w-100 p-0 m-0 break-after-page" key={index}>
                                                                        <h4 className="col-12 mb-1 mt-3 text-right">Caso de seguimiento #{index + 1}</h4>
                                                                        <div className="col-12">
                                                                            <hr className="m-auto w-100 d-flex justify-content-between align-items-center divisor"></hr>
                                                                        </div>
                                                                        <div className="col-12 mb-4 pb-4 containerMapSeguimientoCasosDetails">
                                                                            <MapDrawer
                                                                                drawConfig={drawConfig}
                                                                                center={[POA.latitud, POA.longitud]}
                                                                                label='Mapa del territorio //Reserva Forestal // Baldíos // Área Protegida'
                                                                                zoom={zoom}
                                                                                //type='drawing'
                                                                                type='showing'
                                                                                //onChange={onChangeS2territorio}
                                                                                dataLet={dataletS2territorio}
                                                                                venues={[{
                                                                                    id: POA.id ? POA.id : new Date(),
                                                                                    nombre: POA.nombrePOA ? POA.nombrePOA : 'marker',
                                                                                    ubicacion: [POA.latitud ? POA.latitud : 4.6501730300, POA.longitud ? POA.longitud : -74.1073590000],
                                                                                    description: POA.estado ? POA.estado : 'El nuevo marcador'
                                                                                }]}
                                                                                simpleVenues={true}
                                                                                object={seguimientoCaso}
                                                                                nameSelect='s2territorio'
                                                                                // setObject={setMoreDetailsSeguimientoCasos}
                                                                                selectOptions={seguimientoCaso.s2territorio}
                                                                            />
                                                                        </div>
                                                                        <TableContainer className="col-12 detalles-Caso w-100 mb-4 pb-4" key={seguimientoCaso.id}>
                                                                            <Table className={classes.table} size="small" stickyHeader={true} padding='none' aria-label="a dense table">
                                                                                <TableBody>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Fecha de creación:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.createAt ? seguimientoCaso.createAt : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Financiador:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s1financiador ? seguimientoCaso.s1financiador : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Nombre del proyecto:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s1nombreProyecto ? seguimientoCaso.s1nombreProyecto : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Operador:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s1operador ? seguimientoCaso.s1operador : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Reglón económico:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s1reglonEconomico ? seguimientoCaso.s1reglonEconomico : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Responsable:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s1Responsable ? seguimientoCaso.s1Responsable : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Existe desplazamiento?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s2desplazamiento ? seguimientoCaso.s2desplazamiento : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿En fragilidad demográfica?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s2fragilidadDemografica ? seguimientoCaso.s2fragilidadDemografica : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Comunidad:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s2nombreComunidad ? seguimientoCaso.s2nombreComunidad : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Número de habitantes:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s2numeroHabitantes ? seguimientoCaso.s2numeroHabitantes : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Pueblo:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s2pueblo ? seguimientoCaso.s2pueblo : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Cuenta con reconocimiento?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s2reconocimiento ? seguimientoCaso.s2reconocimiento : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿En riesgo de extinción?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s2riesgoExtincion ? seguimientoCaso.s2riesgoExtincion : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Ruta de consulta concertada?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s3consultaConcertada ? seguimientoCaso.s3consultaConcertada : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Estado actual:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s3estadoConsulta ? seguimientoCaso.s3estadoConsulta : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Por qué?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s3porqueConsultaConcertada ? seguimientoCaso.s3porqueConsultaConcertada : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Hubo proceso de consulta?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s3procesoConsulta ? seguimientoCaso.s3procesoConsulta : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Participantes por los entes de control:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s4participantesEntesControl ? seguimientoCaso.s4participantesEntesControl.join(",") : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Participantes por el gobierno:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s4participantesGobierno ? seguimientoCaso.s4participantesGobierno.join(",") : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Participantes por las organizaciones asesoras u observadoras:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s4participantesOrganizaciones ? seguimientoCaso.s4participantesOrganizaciones.join(",") : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Se realizó entrega de documentos del proyecto de manera previa al inicio de la consulta?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s5documentosPrevioConsulta ? seguimientoCaso.s5documentosPrevioConsulta : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Se dio información sobre Fuentes de financiación del proceso?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s5fuentesFinanciacion ? seguimientoCaso.s5fuentesFinanciacion : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Se garantizó y financió la logística?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s6financiacionLogistica ? seguimientoCaso.s6financiacionLogistica : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿La comunidad contó con garantía para tener equipo técnico propio?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s6garantiaEquipoTecnico ? seguimientoCaso.s6garantiaEquipoTecnico : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Claridad de lenguaje y oportunidad en la información?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s7claridadInformacion ? seguimientoCaso.s7claridadInformacion : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Se expusieron los alcances reales del proyecto?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s7exposicionalcances ? seguimientoCaso.s7exposicionalcances : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Se respondió a las preguntas de la comunidad?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s7preguntasComunidad ? seguimientoCaso.s7preguntasComunidad : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Estudios concertados?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s8concertadoEstudio ? seguimientoCaso.s8concertadoEstudio : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Hubo estudio de impacto ambiental?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s8estudioImpactoAmbiental ? seguimientoCaso.s8estudioImpactoAmbiental : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Se plasmó en el estudio lo concertado?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s8plasmaConcertado ? seguimientoCaso.s8plasmaConcertado : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Concertado?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s9concertadoPlan ? seguimientoCaso.s9concertadoPlan : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Hubo plan de manejo ambiental?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s9planManejoAmbiental ? seguimientoCaso.s9planManejoAmbiental : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Se plasmó en el estudio lo concertado?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s9plasmaConcertado ? seguimientoCaso.s9plasmaConcertado : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Hubo planes de compensación?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s10planCompensacion ? seguimientoCaso.s10planCompensacion : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Concertados?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s10concertadoCompensacion ? seguimientoCaso.s10concertadoCompensacion : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Se plasmó en el plan lo concertado con la comunidad?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s10plasmaConcertado ? seguimientoCaso.s10plasmaConcertado : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿La consulta fue concertada?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s11consultaConcertada ? seguimientoCaso.s11consultaConcertada : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Hay relación o diálogo con respeto a plan de salvaguarda?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s11relacionPlanSalvaguarda ? seguimientoCaso.s11relacionPlanSalvaguarda : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Hay relación o diálogo con respeto a planes de vida?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s11relacionPlanVida ? seguimientoCaso.s11relacionPlanVida : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Hay relación o diálogo con respeto a protocolos bioculturales?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s11relacionProtocolosBioculturales ? seguimientoCaso.s11relacionProtocolosBioculturales : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Hay relación o diálogo con respeto a protocolos de consulta previa?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s11relacionProtocolosCP ? seguimientoCaso.s11relacionProtocolosCP : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Hay cumplimiento?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s12cumplimientoAcuerdos ? seguimientoCaso.s12cumplimientoAcuerdos : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Observaciones:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s12observaciones ? seguimientoCaso.s12observaciones : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿se reune el comité de seguimiento?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s13comiteReunido ? seguimientoCaso.s13comiteReunido : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Se conformó comité de seguimiento a los acuerdos?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s13comiteSeguimientoAcuerdos ? seguimientoCaso.s13comiteSeguimientoAcuerdos : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Gobierno como garante tiene asiento allí?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s13garantesGobierno ? seguimientoCaso.s13garantesGobierno : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Pueblos indígenas como garante tienen asiento allí?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s13garantesIndigenas ? seguimientoCaso.s13garantesIndigenas : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Integrantes Comité:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s13integrantesComite ? seguimientoCaso.s13integrantesComite : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Con qué periodicidad se realiza?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s14PeriodicidadMonitoreo ? seguimientoCaso.s14PeriodicidadMonitoreo : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Existe monitoreo ambiental?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s14monitoreoAmbiental ? seguimientoCaso.s14monitoreoAmbiental : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿La comunidad participa del monitoreo?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s14participacionComunidad ? seguimientoCaso.s14participacionComunidad : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Quiénes participan?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s14participantesMonitoreo ? seguimientoCaso.s14participantesMonitoreo : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Qué tipo de afectaciones ha generado el desarrollo del proyecto o de la consulta?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s15tipoAfectaciones ? seguimientoCaso.s15tipoAfectaciones.join(",") : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">¿Qué tipo de beneficios ha generado el desarrollo del proyecto o de la consulta?:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s16tipoBeneficios ? seguimientoCaso.s16tipoBeneficios.join(',') : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Conflictos Generados:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s17conflictosGenerados ? seguimientoCaso.s17conflictosGenerados.join(',') : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Procesos De Defensa Territorial Con Ocasión De Los Proyectos A Consultar:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s18defensaTerritorial ? seguimientoCaso.s18defensaTerritorial.join(',') : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                    <TableRow className="table-row break-after-page-auto">
                                                                                        <TableCell className="leftColumn">Comentarios Adicionales:</TableCell>
                                                                                        <TableCell className="rightColumn" align="right">{seguimientoCaso.s19comentarios ? seguimientoCaso.s19comentarios : '---Sin datos---'}</TableCell>
                                                                                    </TableRow>
                                                                                </TableBody>
                                                                            </Table>
                                                                        </TableContainer>
                                                                        {/* <div className="saltopagina"></div> */}
                                                                    </div>
                                                                    // </div>
                                                                )
                                                            }))
                                                        : ''
                                                    // : (<span>---No hay casos de seguimiento registrados en el sitio por el momento.--- </span>)
                                                }
                                                {/* </div> */}
                                            </CardContent>
                                        </Card>
                                    </div>
                                )
                            })
                        }
                        {
                            configReporte.notas === 'si'
                                ? <ReportePiePagina className="break-after-page" />
                                : ''
                        }

                    </div>
                </div>
            </div>
        </>

    )
}

export default ReporteCuerpo
