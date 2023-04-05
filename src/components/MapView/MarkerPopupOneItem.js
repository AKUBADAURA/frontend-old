import React, { useContext, useEffect, useState } from "react";
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
import { POAContext } from "../../context/POAContext";
import { typesMapaIndex } from "../../types/types";


const MarkerPopupOneItem = (props) => {
    const { markerDataPOAIndex, typesViewMapaIndex } = useContext(POAContext)
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClickCard = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
      console.log('markerDataPOAIndex: ', markerDataPOAIndex)  
      return () => {        
      }
    }, [markerDataPOAIndex])

    
    const title = () => {
        if (typesViewMapaIndex === typesMapaIndex.departamentos) {
            return  `${markerDataPOAIndex[0].nombrePOA}. Registro único presente en el departamento de ${markerDataPOAIndex[0].departamento}.`
        }
        else if (typesViewMapaIndex === typesMapaIndex.municipios){ 
            return `${markerDataPOAIndex[0].nombrePOA}. Registro único presente en el municipio de ${markerDataPOAIndex[0].municipio}, departamento de ${markerDataPOAIndex[0].departamento}.`
        }
        else {
            return `${markerDataPOAIndex[0].nombrePOA}. Registro único presente en el municipio de ${markerDataPOAIndex[0].municipio}, departamento de ${markerDataPOAIndex[0].departamento}.`
        }
    }

    
    

    return (
        <>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={props.classes.avatar}>
                        {markerDataPOAIndex[0].nombrePOA.charAt(0)}
                    </Avatar>
                }
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title={title()}
                subheader={`Estado: ${markerDataPOAIndex[0].estado}`}
            />
            <CardMedia
                className={props.classes.media + ' containerCardImageMarker'}
                image={process.env.PUBLIC_URL + '/img/departamentos/' + markerDataPOAIndex[0].departamento + '.jpg'}
                title="Imagen del departamento"
            />
            <CardContent>   
                <Typography variant="body2" color="textSecondary" component="p">
                    {`Total de Comunidades: ${markerDataPOAIndex[0].totalComunidades}`}
                    <br />
                    {`Fecha de Acto Administrativo: ${markerDataPOAIndex[0].fechaActoAdmin}`}
                    <br />
                    {`Número de Acto Administrativo: ${markerDataPOAIndex[0].numActoAdmin}`}
                    <br />
                    {`Estado de Gestión: ${markerDataPOAIndex[0].estadoGestion}`}
                    <br />
                    {`¿Etapa Finalizada? : ${markerDataPOAIndex[0].etapaFinalizada}`}
                    <br />
                    {`Pueblo : ${markerDataPOAIndex[0].pueblo}`}
                    <br />
                    {`Tipo de Comunidad: ${markerDataPOAIndex[0].tipoComunidad}`}
                    <br />
                    {`PINE: ${markerDataPOAIndex[0].pine}`}
                    <br />
                    {`¿Es con Acuerdos?: ${markerDataPOAIndex[0].esConAcuerdos}`}
                    <br />
                    {` Latitud: ${markerDataPOAIndex[0].latitud}`}
                    <br />
                    {` Longitud: ${markerDataPOAIndex[0].longitud}`}
                    <br />
                    {` Código del Municipio: ${markerDataPOAIndex[0].codigoMunicipio}`}
                    <br />
                    {`Creación de Registro: ${markerDataPOAIndex[0].createAt}`}
                    <br />
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Link to={'/poas/' + markerDataPOAIndex[0].id}>
                    <IconButton aria-label="Ver Más Detalles en Modal" >
                        <FindInPage style={{ fontSize: 20 }} />
                    </IconButton>
                </Link>
                <IconButton
                    className={clsx(props.classes.expand, {
                        [props.classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClickCard}
                    aria-expanded={expanded}
                    aria-label="Ver más"
                >
                    <ExpandMoreIcon style={{ fontSize: 20 }} />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`Código: ${markerDataPOAIndex[0].codigo}`}
                        <br />
                        {`¿Es POMCAS?: ${markerDataPOAIndex[0].esPOMCAS}`}
                        <br />
                        {`Ejecutor POA: ${markerDataPOAIndex[0].ejecutorPOA}`}
                        <br />
                        {`¿Tiene Licencia?: ${markerDataPOAIndex[0].tieneLicencia}`}
                        <br />
                        {`Sector: ${markerDataPOAIndex[0].sector}`}
                        <br />
                        {`Estado: ${markerDataPOAIndex[0].estado}`}
                        <br />
                        {`Departamento: ${markerDataPOAIndex[0].departamento}`}
                        <br />
                        {`Etapa: ${markerDataPOAIndex[0].etapa}`}
                        <br />
                        {`Fecha de Planeación: ${markerDataPOAIndex[0].fechaPlaneacion}`}
                        <br />
                        {`Fecha Real: ${markerDataPOAIndex[0].fechaReal}`}
                        <br />
                        {`Comunidad: ${markerDataPOAIndex[0].comunidad}`}
                        <br />
                        {`Municipio: ${markerDataPOAIndex[0].municipio}`}
                        <br />
                        {`Región: ${markerDataPOAIndex[0].region}`}
                        <br />
                    </Typography>
                </CardContent>
            </Collapse>
        </>
    )
}

export default MarkerPopupOneItem