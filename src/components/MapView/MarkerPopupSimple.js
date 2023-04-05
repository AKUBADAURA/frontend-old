import React from "react";
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


const useStyles = makeStyles((theme) => ({
  root: {
      //maxWidth: 345,
      maxWidth: 400,
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

const vermas = ()=>{
  console.log('ver mas ')
}


const MarkerPopupSimple = (props) => {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Popup className={classes.root}>
        <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
              {` Latitud: ${props.data.ubicacion[0]}`}
              <br/>
              {` Longitud: ${props.data.ubicacion[1]}`}
              <br/>
        </Typography>
        </CardContent>
    </Popup>
  );
};

export default MarkerPopupSimple;
