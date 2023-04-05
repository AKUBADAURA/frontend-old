import React, { useContext, useState } from "react";
import { Popup } from "react-leaflet";
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
import { red } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility'
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FindInPage } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { POAContext } from "../../context/POAContext";
import { typesMapaIndex } from "../../types/types";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(12),
        flexBasis: '15%',
        flexShrink: 0,
    },
    secondaryHeading: {
        flexBasis: '100%',
        fontSize: theme.typography.pxToRem(12),
        color: theme.palette.text.secondary,
    },
}));

const MarkerPopupMultipleItems = (props) => {

    const { markerDataPOAIndex, typesViewMapaIndex } = useContext(POAContext)
    const classes = useStyles();
    const [expandedAccordion, setExpandedAccordion] = useState(false);
    const [expandedCard, setExpandedCard] = useState(false);

    const handleChangeAccordion = (panel) => (event, isExpandedAccordion) => {
        console.log('isExpandedAccordion: ', isExpandedAccordion)

        setExpandedAccordion(isExpandedAccordion ? panel : false);
        if (isExpandedAccordion === false) {
            setExpandedCard(false)
        }
    };
    const handleExpandClickCard = () => {
        setExpandedCard(!expandedCard);
    };
    useEffect(() => {
        console.log('markerDataPOAIndex: ', markerDataPOAIndex)
        return () => {
        }
    }, [markerDataPOAIndex])

    

    const title = () => {
        if (typesViewMapaIndex === typesMapaIndex.departamentos) {
            return `Presencia de POAS en el departamento de ${markerDataPOAIndex[0].departamento}.`
        }
        else if (typesViewMapaIndex === typesMapaIndex.municipios) {
            return `Presencia de POAS en el municipio de ${markerDataPOAIndex[0].municipio}, departamento de ${markerDataPOAIndex[0].departamento}.`
        }
        else if (markerDataPOAIndex[0].municipio === 'SIN MUNICIPIO' && typesViewMapaIndex === typesMapaIndex.marcadores) {
            return `Presencia de POAS en la capital del departamento de ${markerDataPOAIndex[0].departamento} y otras ubicaciones no definidas dentro del departamento.`
        }
        else if (markerDataPOAIndex[0].municipio !== 'SIN MUNICIPIO' && typesViewMapaIndex === typesMapaIndex.marcadores) {
            return `Presencia de POAS en el municipio de ${markerDataPOAIndex[0].municipio}, departamento de ${markerDataPOAIndex[0].departamento}.`
        }
        else {
            return `Presencia de POAS en el municipio de ${markerDataPOAIndex[0].municipio}, departamento de ${markerDataPOAIndex[0].departamento}.`
        }
    }

    return (
        <>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={props.classes.avatar}>
                        P
                    </Avatar>
                }
                title={title()}


                subheader={`De click sobre el POA de interés para desplegar más información`}
            />
            <CardMedia
                className={props.classes.media + ' containerCardImageMarker'}
                image={process.env.PUBLIC_URL + '/img/departamentos/' + markerDataPOAIndex[0].departamento + '.jpg'}
                title="Imagen del departamento con presencia de POAS"
            />
            <div className={classes.root + ' containerPOASMarkers'}>
                {markerDataPOAIndex.map((item, i) => {
                    return (
                        <Accordion key={i} expanded={expandedAccordion === `panel${i}`} onChange={handleChangeAccordion(`panel${i}`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>{item.codigo}</Typography>
                                <Typography className={classes.secondaryHeading}>{item.nombrePOA.length > 113 ? (`${item.nombrePOA.slice(0, 113)}...`) : (`${item.nombrePOA}`)}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="row w-100 accordionDetails m-0 p-0">
                                <CardContent className="col-12 cardContent w-100">
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {`Total de Comunidades: ${item.totalComunidades}`}
                                        <br />
                                        {`Fecha de Acto Administrativo: ${item.fechaActoAdmin}`}
                                        <br />
                                        {`Número de Acto Administrativo: ${item.numActoAdmin}`}
                                        <br />
                                        {`Estado de Gestión: ${item.estadoGestion}`}
                                        <br />
                                        {`¿Etapa Finalizada? : ${item.etapaFinalizada}`}
                                        <br />
                                        {`Pueblo : ${item.pueblo}`}
                                        <br />
                                        {`Tipo de Comunidad: ${item.tipoComunidad}`}
                                        <br />
                                        {`PINE: ${item.pine}`}
                                        <br />
                                        {`¿Es con Acuerdos?: ${item.esConAcuerdos}`}
                                        <br />
                                        {` Latitud: ${item.latitud}`}
                                        <br />
                                        {` Longitud: ${item.longitud}`}
                                        <br />
                                        {` Código del Municipio: ${item.codigoMunicipio}`}
                                        <br />
                                        {`Creación de Registro: ${item.createAt}`}
                                        <br />
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing className="col-12 cardActions w-100">
                                    <Link to={'/poas/' + item.id}>
                                        <IconButton aria-label="Ver Más Detalles en Modal" >
                                            <FindInPage style={{ fontSize: 20 }} />
                                        </IconButton>
                                    </Link>
                                    <IconButton
                                        className={clsx(props.classes.expand, {
                                            [props.classes.expandOpen]: expandedCard,
                                        })}
                                        onClick={handleExpandClickCard}
                                        aria-expanded={expandedCard}
                                        aria-label="Ver más"
                                    >
                                        <ExpandMoreIcon style={{ fontSize: 20 }} />
                                    </IconButton>
                                </CardActions>
                                <Collapse className="col-12 collapseCard w-100" in={expandedCard} timeout="auto" unmountOnExit >
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {`Código: ${item.codigo}`}
                                            <br />
                                            {`¿Es POMCAS?: ${item.esPOMCAS}`}
                                            <br />
                                            {`Ejecutor POA: ${item.ejecutorPOA}`}
                                            <br />
                                            {`¿Tiene Licencia?: ${item.tieneLicencia}`}
                                            <br />
                                            {`Sector: ${item.sector}`}
                                            <br />
                                            {`Estado: ${item.estado}`}
                                            <br />
                                            {`Departamento: ${item.departamento}`}
                                            <br />
                                            {`Etapa: ${item.etapa}`}
                                            <br />
                                            {`Fecha de Planeación: ${item.fechaPlaneacion}`}
                                            <br />
                                            {`Fecha Real: ${item.fechaReal}`}
                                            <br />
                                            {`Comunidad: ${item.comunidad}`}
                                            <br />
                                            {`Municipio: ${item.municipio}`}
                                            <br />
                                            {`Región: ${item.region}`}
                                            <br />
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </div>

        </>
    )
}

export default MarkerPopupMultipleItems