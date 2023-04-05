import React, {useContext} from "react";
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
import MarkerPopupMultipleItems from "./MarkerPopupMultipleItems";
import MarkerPopupOneItem from "./MarkerPopupOneItem";
import { useEffect } from "react";
import { useState } from "react";


const useStyles = makeStyles((theme) => ({
  root: {
    //maxWidth: 400,
    maxWidth: 800,
    width:800
    // maxHeight:800
  },
  media: {
    height: 0,
    //paddingTop: '56.25%', // 16:9
    //paddingTop: '5%', // 16:9
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
}));




const MarkerPopup = (props) => {

  const classes = useStyles();
  const { 
    markerDataPOAIndex,
    openPopupMarker, setOpenPopupMarker
  } = useContext(POAContext)

  const [isMultiple, setIsMultiple] = useState(false)

  useEffect(() => {
    return () => {
    }
  }, [markerDataPOAIndex])

  const renderTypePopUp = () => {
    if (Array.isArray(markerDataPOAIndex) && markerDataPOAIndex.length>1){
      return <MarkerPopupMultipleItems classes/>
    }
    else if (Array.isArray(markerDataPOAIndex) && markerDataPOAIndex.length===1){
      return <MarkerPopupOneItem classes/>
    }
    else {
      return <span>No hay Registro de Proyectos, Obras o Actividades en esta Ubicación</span>
    }
  }


  


  return (
    <Popup
      onClose={()=>{setOpenPopupMarker(false); console.log('on close')}}
      className={classes.root +  ' popupPrincipal'}
    >
      {renderTypePopUp()}
    </Popup>
  );
};

export default MarkerPopup;
