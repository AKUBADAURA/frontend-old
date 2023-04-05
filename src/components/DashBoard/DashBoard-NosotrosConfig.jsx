import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import { Button, IconButton, TextField } from '@material-ui/core';
import { typesNosotrosValue } from '../../types/types';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

const DashBoardNosotrosConfig = () => {
    //Vars and const
    const url= process.env.REACT_APP_BACKEND_API_URL
    let config ={
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }

    let responseOwnerId
    //useStyles
    const classes = useStyles();

    //useState
    const [expanded, setExpanded] = useState(false)
    const [somos, setSomos] = useState(typesNosotrosValue)
    const [mision, setMision] = useState(typesNosotrosValue)
    const [vision, setVision] = useState(typesNosotrosValue)  
    const [preguntasFrecuentes, setPreguntasFrecuentes] = useState(typesNosotrosValue)
    const [historia, setHistoria] = useState(typesNosotrosValue)
    const [principios, setPrincipios] = useState(typesNosotrosValue)


    //useEffect
    useEffect(() => {
        getNosotros()            
    }, []);


    
    //functions
    const getNosotros= async ()=> {
        try {
            const response = await axios.get(`${url}/nosotros`,config)
            response.data.map((item)=> item.id==='somos'?setSomos(item):'')
            response.data.map((item)=> item.id==='mision'?setMision(item):'')
            response.data.map((item)=> item.id==='vision'?setVision(item):'')
            response.data.map((item)=> item.id==='preguntasFrecuentes'?setPreguntasFrecuentes(item):'')
            response.data.map((item)=> item.id==='historia'?setHistoria(item):'')
            response.data.map((item)=> item.id==='principios'?setPrincipios(item):'')
        }
        catch (error) {
            console.log(error.response)
        }    
    }  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    }
    const handleChangeSomos = (e) => { 
            setSomos({...somos, [e.target.name]: e.target.value})
    }
    const handleChangeMision = (e) => { 
            setMision({...mision, [e.target.name]: e.target.value})
    }
    const handleChangeVision = (e) => { 
            setVision({...vision, [e.target.name]: e.target.value})
    }
    const handleChangeHistoria = (e) => { 
            setHistoria({...historia, [e.target.name]: e.target.value})
    }
    const handleChangePreguntasFrecuentes = (e) => { 
            setPreguntasFrecuentes({...preguntasFrecuentes, [e.target.name]: e.target.value})
    }
    const handleChangePrincipios = (e) => { 
            setPrincipios({...principios, [e.target.name]: e.target.value})
    }
        //   setHistoria({...historia, [e.target.name]: e.target.value})
    
        const save =async (e)=>{
            e.preventDefault();
            try {
                responseOwnerId = await axios.get(`${url}/whoAmI`,config)
                const promise1 = axios.patch(`${url}/nosotros/somos`, somos,config)
                const promise2 = axios.patch(`${url}/nosotros/mision`, mision,config)
                const promise3 = axios.patch(`${url}/nosotros/vision`, vision,config)
                const promise4 = axios.patch(`${url}/nosotros/preguntasFrecuentes`, preguntasFrecuentes,config)
                const promise5 = axios.patch(`${url}/nosotros/historia`, historia,config)
                const promise6 = axios.patch(`${url}/nosotros/principios`, principios,config)
                await Promise.all([promise1, promise2, promise3, promise4, promise5, promise6])
                await getNosotros()                
                alert('Cambios almacenados con éxito')
            }
            catch (error) {
                console.log('An error occurred:', error.response); 
                alert('Hubo un error al subir los cambios, inténtelo de nuevo por favor.')           
            }        
        }   

    return (
        <div id="Profile" className="row mt-1 w-100">
            <div className="row d-flex- justify-content-between mx-4">
                <div className="col-12 d-flex justify-content-between mx-2 mt-1 align-items-between">
                    <h3 className="m-0">Nosotros</h3>
                    <IconButton onClick={save} aria-label="guardar"  size="medium"><SaveIcon fontSize="inherit" /></IconButton>

                </div>
                <hr className="d-flex justify-content-between mt-1 align-items-center divisor"></hr>                            
                <div className="col-12 ">
                    <p>En esta sección podrá modificar los valores visualizados en la sección "Nosotros". Para ajustar los estilos de presentación recuerde hacer uso de las etiquetas HTML, evite hacer uso de las comillas dobles y saltos de linea.</p>
                    <div className={classes.root}>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                                <Typography component="span" className={classes.heading}>Somos</Typography>
                                <Typography component="span" className={classes.secondaryHeading}>(máximo 20.000 caracteres)</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="d-flex flex-row">
                                <TextField className="col-12 mt-2 px-1" id="outlined-textarea"  onChange={handleChangeSomos} name="descripcion" value={somos.descripcion?somos.descripcion:''} multiline variant="outlined" />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                                <Typography component="span" className={classes.heading}>Visión</Typography>
                                <Typography component="span" className={classes.secondaryHeading}>(máximo 20.000 caracteres)</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="d-flex flex-row">
                                <TextField className="col-12 mt-2 px-1" id="outlined-textarea"  onChange={handleChangeVision} name="descripcion" value={vision.descripcion?vision.descripcion:''} multiline variant="outlined" />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
                                <Typography component="span" className={classes.heading}>Misión</Typography>
                                <Typography component="span" className={classes.secondaryHeading}>(máximo 20.000 caracteres)</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="d-flex flex-row">
                                <TextField className="col-12 mt-2 px-1" id="outlined-textarea"  onChange={handleChangeMision} name="descripcion" value={mision.descripcion?mision.descripcion:''} multiline variant="outlined" />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                                <Typography component="span" className={classes.heading}>Preguntas Frecuentes</Typography>
                                <Typography component="span" className={classes.secondaryHeading}>(máximo 20.000 caracteres)</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="d-flex flex-row">
                                <TextField className="col-12 mt-2 px-1" id="outlined-textarea"  onChange={handleChangePreguntasFrecuentes} name="descripcion" value={preguntasFrecuentes.descripcion?preguntasFrecuentes.descripcion:''} multiline variant="outlined" />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5bh-content" id="panel5bh-header">
                                <Typography component="span" className={classes.heading}>Principios</Typography>
                                <Typography component="span" className={classes.secondaryHeading}>(máximo 20.000 caracteres)</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="d-flex flex-row">
                                <TextField className="col-12 mt-2 px-1" id="outlined-textarea"  onChange={handleChangePrincipios} name="descripcion" value={principios.descripcion?principios.descripcion:''} multiline variant="outlined" />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6bh-content" id="panel6bh-header">
                                <Typography component="span" className={classes.heading}>Historia</Typography>
                                <Typography component="span" className={classes.secondaryHeading}>(máximo 20.000 caracteres)</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="d-flex flex-row">
                                <TextField className="col-12 mt-2 px-1" id="outlined-textarea"  onChange={handleChangeHistoria} name="descripcion" value={historia.descripcion?historia.descripcion:''} multiline variant="outlined" />
                            </AccordionDetails>
                        </Accordion>
                    </div>

                </div>
            </div>
    </div> 
    )




}

export default DashBoardNosotrosConfig

