import React, { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ButtonBase from '@material-ui/core/ButtonBase';
import { POAContext } from '../../../context/POAContext';
import { typesMapaIndex } from '../../../types/types';
import GeneralTooltip from '../../Tooltip';



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
  rootButton: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: '/img/Boton-tipo-Mapa-ubicacion.svg',
    title: typesMapaIndex.marcadores,
    width: '100%',
    textTooltip: 'De click sobre los marcadores para obtener los POAS presentes en una ubicación precisa'
  },
  {
    url: '/img/Boton-tipo-Mapa-departamentos.svg',
    title: typesMapaIndex.departamentos,
    width: '100%',
    textTooltip: 'De click sobre el área del departamento de interés para obtener los POAS presentes allí'
  },
  {
    url: '/img/Boton-tipo-Mapa-municipios.svg',
    title: typesMapaIndex.municipios,
    width: '100%',
    textTooltip: 'De click sobre el área del municipio de interés para obtener los POAS presentes allí'
  },
];

// image={process.env.PUBLIC_URL + '/img/departamentos/' + markerDataPOAIndex[0].departamento + '.jpg'}

const POAindexTabsFilterMaps = () => {


  //let & const

  const url = process.env.REACT_APP_BACKEND_API_URL

  //useStyles

  const classes = useStyles();

  //usecontext 

  const { typesViewMapaIndex, setTypesViewMapaIndex } = useContext(POAContext)



  //useStates

  //useeffect



  //functions


  const setMapa = (e, title) => {
    console.log('title en setMap: ', title)
    var letTitle = title

    switch (letTitle) {
      case typesMapaIndex.departamentos:
        console.log('type departamentos');
        setTypesViewMapaIndex(typesMapaIndex.departamentos);
        break;
      case typesMapaIndex.municipios:
        console.log('type municipios');
        setTypesViewMapaIndex(typesMapaIndex.municipios)
        break;
      case typesMapaIndex.marcadores:
        console.log('type marcadores');
        setTypesViewMapaIndex(typesMapaIndex.marcadores);
        break;
      default:
        setTypesViewMapaIndex(typesMapaIndex.marcadores)
        break;
    }

  }


  return (

    <div className="row">
      <div className="col-12 p-0">
        <Card className={classes.root}>
          <CardContent>
            <div className="col-12 p-0">
              <h5 className='mb-0'>Tipo de mapa</h5>
              <hr className="d-flex mt-0 justify-content-between  align-items-center divisor"></hr>
            </div>
            <div className={classes.rootButton + ' rootButtonClass'}>
              {images.map((image) => (
                <GeneralTooltip
                  placement='right'
                  children={
                    <ButtonBase
                      onClick={(e, title) => { setMapa(e, image.title) }}
                      name={image.title}
                      focusRipple
                      key={image.title}
                      className={classes.image + ' buttonBaseClass'}
                      focusVisibleClassName={classes.focusVisible}
                      style={{
                        width: '100%',
                        // width: image.width,
                      }}
                    >
                      <span
                        className={classes.imageSrc}
                        style={{
                          backgroundImage: `url(${image.url})`,
                        }}
                      />
                      <span className={classes.imageBackdrop} />
                      <span className={classes.imageButton}>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          className={classes.imageTitle}
                        >
                          {image.title}
                          <span className={classes.imageMarked} />
                        </Typography>
                      </span>
                    </ButtonBase>
                  }
                  text={image.textTooltip}
                />
              ))}
            </div>

          </CardContent>
          {/* <CardActions disableSpacing>
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
              <Typography align="justify" variant="body2" color="textSecondary" component="p">
                Reporte de presencia de POAS, sus casos de seguimiento asociados, documentos anexos y mapas de comunidades afectadas para uno o un grupo de  municipios o departamentos seleccionados.
              </Typography>
            </CardContent>
          </Collapse> */}
        </Card>
      </div>

    </div>

  )
}

export default POAindexTabsFilterMaps
