import React, { useContext, useEffect, useState } from 'react'
import '../../css/boletinesReportes.css'
import Header from '../header/Header';
import NavbarApp from '../NavBar/NavbarApp';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, yellow } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SelectMultipleDB from '../../logic/SelectMultipleDB';
import { blue } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { POAContext } from '../../context/POAContext';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    avatarB: {
        backgroundColor: blue[500],
    },
    avatarC: {
        backgroundColor: yellow[500],
    },
}));

const BoletinesReportes = () => {


    //let & const

    const url = process.env.REACT_APP_BACKEND_API_URL
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('JWT')}`
        }
    }

    let responsePOAS,
        responseFixPOAS,
        responsesSeguimientoCasos,
        responseFixSeguimientoCasos
        ;




    //useStyles

    const classes = useStyles();

    const { POASYCasosReporte, setPOASYCasosReporte } = useContext(POAContext)

    //useStates
    const [expandedReporteRegiones, setExpandedReporteRegiones] = useState(false);
    const [expandedReporteComunidades, setExpandedReporteComunidades] = useState(false);
    const [expandedBoletines, setExpandedBoletines] = useState(false);
    const [state, setState] = useState({
        municipio: undefined,
        departamento: undefined,
        comunidad: undefined
    })
    const [redirectReporte, setRedirectReporte] = useState(false)

    //useeffect


    //functions

    const concatResponseData = (responsesIn) => {
        return responsesIn.map((responseIn) => {
            return responseIn.data;
        }).reduce((pre, cur) => {
            return pre.concat(cur)
        })

    }

    const concatPOASCasos = (POAS, Casos) => {
        let letPOAS = POAS
        POAS.map((POA, i) => {
            let casosFilter = []
            if (Casos.find((Caso) => Caso.poaId === POA.id) !== undefined) {
                Casos.map((Caso) => {
                    if (Caso.poaId === POA.id) {
                        casosFilter.push(Caso)
                    }
                })
            }
            letPOAS[i].seguimientoCasos = casosFilter
        })
        console.log('letPOAS: ', letPOAS)
        return letPOAS
    }

    const getPOAS = async (origenReporte) => {
        //caso departamento

        try {

        if (state.municipio === undefined && state.departamento !== undefined && origenReporte === 'origenRegiones') {
            let departamentos = state.departamento.split(',')
            responsePOAS = await Promise.all(
                departamentos.map((item) => {
                    return axios.get(`${url}/poa?filter[where][departamento]=${item}`)
                })
            );
            return concatResponseData(responsePOAS)

        }
        //caso municipio
        else if (state.departamento === undefined && state.municipio !== undefined && origenReporte === 'origenRegiones') {
            let municipios = state.municipio.split(',')
            responsePOAS = await Promise.all(
                municipios.map((item) => {
                    return axios.get(`${url}/poa?filter[where][municipio]=${item}`)
                })
            )
            return concatResponseData(responsePOAS)

        }
        //caso comunidades
        else if (state.comunidad !== undefined && origenReporte === 'origenComunidades') {
            let comunidades = state.comunidad.split(',')
            responsePOAS = await Promise.all(
                comunidades.map((item) => {
                    return axios.get(`${url}/poa?filter[where][comunidad]=${item}`)
                })
            )
            return concatResponseData(responsePOAS)

        }
        else if (state.comunidad === undefined && origenReporte === 'origenComunidades') {
            throw ('Debe ingresar una(s) comunidad(es) para generar el reporte')

        }
        else if (state.departamento === undefined && state.municipio === undefined && origenReporte === 'origenRegiones') {
            throw ('Debe ingresar un(os) departamento(s) o municipio(s) para generar el reporte')

        }
        else {
            throw ('Error, inténtelo de nuevo')
        }
    }
    catch (e){
        alert('Error general, inténtelo de nuevo')
    }

    }

    const getSeguimientoCasos = async (POASIn) => {

        responsesSeguimientoCasos = await Promise.all(
            POASIn.map((POAIn) => {
                return axios.get(`${url}/poas/${POAIn.id}/seguimiento-casos`)
            })
        )
        return concatResponseData(responsesSeguimientoCasos)
    }



    const generarReporte = async (origenReporte) => {
        if (origenReporte === 'origenComunidades') {

        }
        if (origenReporte === 'origenRegiones') {
        }
        console.log('origen: ', origenReporte);
        console.log('generando Reporte')
        try {
            responseFixPOAS = await getPOAS(origenReporte) //consulta los POAS de las regiones seleccionadas
            responseFixSeguimientoCasos = await getSeguimientoCasos(responseFixPOAS) // consulta los casos de seguimiento deacuerdo a unos POAS ingresados
            setPOASYCasosReporte(concatPOASCasos(responseFixPOAS, responseFixSeguimientoCasos))//concatena los casos de seguimiento a sus respectivos POAS
            console.log('POASYCasosReporte: ', POASYCasosReporte);
            setRedirectReporte(true)
        }
        catch (e) {
            console.log('error:', e)
            // alert('error al generar Reporte, inténtelo de nuevo')
            alert(e)
        }
    }

    const generarBoletin = () => {
        console.log('boletin')
    }
    const handleExpandClickRegiones = () => {
        setExpandedReporteRegiones(!expandedReporteRegiones)
    }
    const handleExpandClickComunidades = () => {
        setExpandedReporteComunidades(!expandedReporteComunidades)
    }
    const handleExpandClickBoletines = () => {
        setExpandedBoletines(!expandedBoletines)
    }
    return (
        <div className="row m-0">
            <Header />
            <NavbarApp />
            {redirectReporte === true
                ? <Redirect to={{ pathname: "/reporte", state: { POASYCasosReporte, typeReporte: 'Regiones' } }} />
                : ''
            }
            <div className="row w-100 m-auto">
                <div className="col-12">
                    <div className="row px-1 d-flex justify-content-between align-items-around">
                        <div className="col-12 d-flex justify-content-end mt-2  align-items-center">
                            <h3 className="m-0">Boletines & Reportes</h3>
                        </div>
                        <hr className="d-flex justify-content-between  align-items-center divisor"></hr>
                        <div className="col-4">
                            <Card className={classes.root}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                            M D
                                        </Avatar>
                                    }
                                    // action={
                                    //     <IconButton aria-label="settings">
                                    //         <MoreVertIcon />
                                    //     </IconButton>
                                    // }
                                    title="Reporte"
                                    subheader="Municipios-Departamentos"
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={`${process.env.PUBLIC_URL}/img/Reporte-Regiones.png`}
                                    title="Reporte"
                                />
                                <CardContent>
                                    <Typography align="justify" variant="body2" color="textSecondary" component="p">
                                        Reporte de presencia de POAS, sus casos de seguimiento asociados, documentos anexos y mapas de comunidades afectadas para uno o un grupo de  municipios o departamentos seleccionados.
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    {/* <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton> */}
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expandedReporteRegiones,
                                        })}
                                        onClick={handleExpandClickRegiones}
                                        aria-expanded={expandedReporteRegiones}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                                <Collapse className="contentExpandedBoletin" in={expandedReporteRegiones} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        {
                                            state.municipio === undefined
                                                ? <SelectMultipleDB
                                                    label='Departamento'
                                                    className="w-100"
                                                    urlSelect="departamento"
                                                    nameSelect="departamento"
                                                    value={state.departamento}
                                                    setObject={setState}
                                                    object={state}
                                                />
                                                : ''
                                        }
                                        {
                                            (state.departamento === undefined && state.municipio === undefined)
                                                ? (<div className="col-12 d-flex justify-content-center align-items-center">
                                                    <hr className="separadores" /><span className="middleSeparadores">ó</span><hr className="separadores" />
                                                </div>)
                                                : ''
                                        }
                                        {
                                            state.departamento === undefined
                                                ? <SelectMultipleDB
                                                    label='Municipio'
                                                    className="w-100"
                                                    urlSelect="municipio"
                                                    nameSelect="municipio"
                                                    value={state.municipio}
                                                    setObject={setState}
                                                    object={state}
                                                />
                                                : ''
                                        }
                                        <Button
                                            name="buttonReporteRegiones"
                                            id="buttonReporteRegiones"
                                            onClick={() => { generarReporte('origenRegiones') }}
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            // className={classes.button}
                                            startIcon={<PictureAsPdfIcon />}
                                        >
                                            Generar Reporte
                                        </Button>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </div>
                        <div className="col-4">
                            <Card className={classes.root}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className={classes.avatarB}>
                                            C
                                        </Avatar>
                                    }
                                    // action={
                                    //     <IconButton aria-label="settings">
                                    //         <MoreVertIcon />
                                    //     </IconButton>
                                    // }
                                    title="Reporte"
                                    subheader="Comunidades"
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={`${process.env.PUBLIC_URL}/img/Reporte-Comunidades.png`}
                                    title="Reporte"
                                />
                                <CardContent>
                                    <Typography align="justify" variant="body2" color="textSecondary" component="p">
                                        Reporte de presencia de POAS, sus casos de seguimiento asociados, documentos anexos, mapas de comunidades afectadas y departamentos o municipios donde se ubiquen las comunidades seleccionadas.
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    {/* <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton> */}
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expandedReporteComunidades,
                                        })}
                                        onClick={handleExpandClickComunidades}
                                        aria-expanded={expandedReporteComunidades}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                                <Collapse className="contentExpandedBoletin" in={expandedReporteComunidades} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <SelectMultipleDB
                                            label='Comunidades'
                                            className="w-100"
                                            urlSelect="comunidad"
                                            nameSelect="comunidad"
                                            value={state.comunidad}
                                            setObject={setState}
                                            object={state}
                                        />
                                        <Button
                                            name="buttonReporteComunidades"
                                            id="buttonReporteComunidades"
                                            onClick={() => { generarReporte('origenComunidades') }}
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            className={classes.button}
                                            startIcon={<PictureAsPdfIcon />}
                                        >
                                            Generar Reporte
                                        </Button>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </div>
                        {/* <div className="col-4">
                            <Card className={classes.root}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className={classes.avatarC}>
                                            B
                                        </Avatar>
                                    }
                                    // action={
                                    //     <IconButton aria-label="settings">
                                    //         <MoreVertIcon />
                                    //     </IconButton>
                                    // }
                                    title="Boletín"
                                    subheader="Bimestral"
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={`${process.env.PUBLIC_URL}/img/Boletin-Bimestral.png`}
                                    title="Boletín"
                                />
                                <CardContent>
                                    <Typography align="justify" variant="body2" color="textSecondary" component="p">
                                        Boletines bimestrales con los 3 últimos POAS registrados y listado de seguimiento a casos y sus documentos anexos, los 3 POAS con mayor número de actualizaciones, su lista de casos de seguimiento, documentos anexos.
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>

                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expandedBoletines,
                                        })}
                                        onClick={handleExpandClickBoletines}
                                        aria-expanded={expandedBoletines}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                                <Collapse className="contentExpandedBoletin" in={expandedBoletines} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography align="justify" variant="body2" color="textSecondary" component="p">
                                            Gráficas representativas con el comportamiento histórico a lo largo de un año en barras mensuales de número de poas donde hubo proceso de consulta, donde hubo participación de entes de control, donde hubo participación de entes gubernamentales, donde hubo participación de organizaciones observadoras, donde hubo estudios de impacto ambiental, donde hubo planes de manejo ambiental, donde hubo planes de compensación. Diagramas Pie char para totalidad de poas con distribución por sectores económicos, tipos de comunidad, estado, etapa.
                                        </Typography>
                                        <Button
                                            id="buttonBoletin"
                                            onClick={generarBoletin}
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            className={classes.button}
                                            startIcon={<PictureAsPdfIcon />}
                                        >
                                            Descargar Boletín
                                        </Button>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </div> */}
                    </div>
                </div>
            </div>



        </div>
    )
}

export default BoletinesReportes
