import React, { useContext, useEffect } from 'react'
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import RadioButtonsGroup from '../../../logic/RadioButtonsGroup';
import { typesEtapasDefaultConfigReporte } from '../../../types/types';
import { TextField } from '@material-ui/core';
import { POAContext } from '../../../context/POAContext';
import Button from '@material-ui/core/Button';




const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        width:'100%'
    },
    media: {
        height: 100,
        // paddingTop: '56.25%', // 16:9
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
        backgroundColor: theme.palette.secondary,
    },
}));

const POAindexModalPreGenerateReporte = (props) => {


    //vars & Const

    const optionsBinary = [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' }
    ]

    const optionsBinaryBCKUP = [
        { value: true, label: 'Sí' },
        { value: false, label: 'No' }
    ]

    const optionsEtapas = [
        { value: typesEtapasDefaultConfigReporte.todasLasEtapas, label: typesEtapasDefaultConfigReporte.todasLasEtapas },
        { value: typesEtapasDefaultConfigReporte.ultimaEtapa, label: typesEtapasDefaultConfigReporte.ultimaEtapa }
    ]


    //useStyles
    const classes = useStyles();
    //useContext
    const {
        configReporte, setConfigReporte
    } = useContext(POAContext)
    //useState

    const [expanded, setExpanded] = React.useState(false);
    //useeffect

    useEffect(() => {
      console.log('configReporte: ', configReporte)
    
      return () => {        
      }
    }, [configReporte])
    
    
    //functions

    const handleChange = (e) => {
        e.persist();
        setConfigReporte({
            ...configReporte,
            [e.target.name]: e.target.value
        })
    }
    return (
        <Card className={classes.root} >
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        C
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Obtén un reporte adaptado a tus necesidades"
                subheader="Administra los parámetros a configurar y/o da click en 'Generar Reporte' para finalizar."
            />
            <CardMedia
                className={classes.media}
                image={`${process.env.PUBLIC_URL}/img/Background-Pre-Configure-Reporte.png`}
                title="Pre Configuración de Reporte"
            />
            <CardContent>
                {/* <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography> */}
                <div className="row">
                    <div className="col-6">
                        {/* <span className="col-12 mt-2">:</span> */}
                        <RadioButtonsGroup
                            label="¿Incluir casos de seguimiento?"
                            name="casosSeguimiento"
                            options={optionsBinary}
                            value={configReporte.casosSeguimiento}
                            handleChange={handleChange}
                        />
                        <RadioButtonsGroup
                            label="¿Incluir etapas?"
                            name="etapas"
                            options={optionsEtapas}
                            value={configReporte.etapas}
                            handleChange={handleChange}
                        />
                        <RadioButtonsGroup
                            label="¿Incluir gráficas?"
                            name="graficas"
                            options={optionsBinary}
                            value={configReporte.graficas}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="col-6">
                        <RadioButtonsGroup
                            label="¿Incluir notas?"
                            name="notas"
                            options={optionsBinary}
                            value={configReporte.notas}
                            handleChange={handleChange}
                        />
                        <TextField
                            className="col-12 mt-2 px-1"
                            id="outlined-textarea"
                            label="Notas a pie de página"
                            onChange={handleChange}
                            name="cuerpoNota"
                            value={configReporte.cuerpoNota}
                            multiline variant="outlined"
                        />
                    </div>
                </div>
            </CardContent>
            <CardActions disableSpacing className="mt-2 d-flex justify-content-end mr-2">
                <Button
                    name="buttonReporte"
                    id="buttonReporte"
                    onClick={() => { props.generateReporte() }}
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<PictureAsPdfIcon />}
                >
                    Generar Reporte
                </Button>
            </CardActions>
        </Card>
    )
}

export default POAindexModalPreGenerateReporte

