import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../../css/novedades.css'
import { typesNovedadesDocs, typesNovedadesNoticiasCPLI, typesNovedadesPOA } from '../../types/types';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Fab from '@material-ui/core/Fab';
// import AppBar from '@material-ui/core/AppBar';
// import MenuIcon from '@material-ui/icons/Menu';
// import AddIcon from '@material-ui/icons/Add';
// import SearchIcon from '@material-ui/icons/Search';
// import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  title: {
    top: 'auto',
    padding: theme.spacing(2, 2, 2),
    marginTop: theme.spacing(2),
    display: 'block',
    textAlign: 'start',
    fontSize: 'large'
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  item: {
    fontSize: 'smaller'
  }
}));


const Novedades = () => {

  //vars and const 
  const url = process.env.REACT_APP_BACKEND_API_URL
  let config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
  }
  //useStyles
  const classes = useStyles();
  //useContext
  //useState
  const [novedadesPOA, setNovedadesPOA] = useState(typesNovedadesPOA)
  const [novedadesDocs, setNovedadesDocs] = useState(typesNovedadesDocs)
  const [novedadesNoticiasCPLI, setNovedadesNoticiasCPLI] = useState(typesNovedadesNoticiasCPLI)


  //useEffect

  useEffect(() => {
    getNovedades()
  }, [])
  //functions

  const getNovedades = async () => {
    try {
      const responseNewPOAs = await axios.get(`${url}/poa-unique?filter[order]=createAt%20DESC&filter[limit]=5&filter[fields][departamento]=true&filter[fields][nombrePOA]=true&filter[fields][ejecutorPOA]=true&filter[fields][createAt]=true&filter[fields][municipio]=true&filter[fields][id]=true`)
      const responseNewNoticiasCPLI = await axios.get(`${url}/noticias-cpli?filter[order]=fechaPublicacion%20DESC&filter[limit]=5&filter[fields][titulo]=true&filter[fields][link]=true&filter[fields][fechaPublicacion]=true&filter[fields][imagen]=true&filter[where][status]=Publicado`)
      const responseNewDocs = await axios.get(`${url}/archivo-publico?filter[order]=createAt%20DESC&filter[limit]=5`)
      setNovedadesPOA(responseNewPOAs.data)
      setNovedadesDocs(responseNewDocs.data)
      setNovedadesNoticiasCPLI(responseNewNoticiasCPLI.data)

    }
    catch (error) {
      console.log('An error occurred:', error.response);
    }
  }
  function primeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <>
      <CssBaseline />
      <Paper square className={classes.paper} id="containerNovedades">
        <Typography id="titleNovedades" component="span" className={classes.title} variant="h5" gutterBottom>
          Novedades
        </Typography>
        <List className={classes.list} id="listNovedades">
          {novedadesPOA.map(({ nombrePOA, ejecutorPOA, departamento, municipio, id }, i) => (
            <React.Fragment key={i}>
              {i === 0 ? <ListSubheader className={classes.subheader + ' titleListNovedades'}>Nuevos Proyectos, Obras & Actividades</ListSubheader> : ''}
              <Link to={'/poas/' + id}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      alt="Departamento"
                      src={process.env.PUBLIC_URL + '/img/departamentos/' + departamento + '.jpg'}
                    />
                  </ListItemAvatar>
                  <ListItemText className={classes.item} primary={primeraLetra(nombrePOA)} secondary={`${primeraLetra(municipio)} - ${primeraLetra(ejecutorPOA)}`} />
                </ListItem>
              </Link>
            </React.Fragment>
          ))}
          {novedadesNoticiasCPLI.map(({ titulo, link, imagen, fechaPublicacion }, i) => (
            <React.Fragment key={i}>
              {i === 0 ? <ListSubheader className={classes.subheader + ' titleListNovedades'}>Artículos recientes</ListSubheader> : ''}
              <a href={link} target="_blank" rel="noreferrer">
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar alt="" src={imagen} />
                  </ListItemAvatar>
                  <ListItemText className={classes.item} primary={primeraLetra(titulo)} secondary={fechaPublicacion} />
                </ListItem>
              </a>
            </React.Fragment>
          ))}
          {novedadesDocs.map(({ route, type, createAt, name }, i) => (
            <React.Fragment key={i}>
              {i === 0 ? <ListSubheader className={classes.subheader + ' titleListNovedades'}>Nuevos Documentos</ListSubheader> : ''}
              <a href={route} target="_blank" rel="noreferrer">
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar alt="" src={createAt} />
                  </ListItemAvatar>
                  <ListItemText className={classes.item} primary={primeraLetra(name)} secondary={type} />
                </ListItem>
              </a>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </>
  );
}

export default Novedades



