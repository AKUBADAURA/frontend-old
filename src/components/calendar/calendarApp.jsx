import React, {  useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'

//icons and buttons 
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

/////modals
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import Header from '../header/Header';
import NavbarApp from '../NavBar/NavbarApp';
import { TextField } from '@material-ui/core';
import { typesEvent } from '../../types/types';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

////end modals








const locales = {
  'es': require('date-fns/locale/es'),
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const CalendarApp = props => {

  //lets and const
  const url= process.env.REACT_APP_BACKEND_API_URL
  let config ={
      headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }

  //usestate
  const [eventType, setEventType] = useState('')
  const [events, setEvents] = useState([])
  const [openModalEvent, setOpenModalEvent] = useState(false);  
  const [event, setEvent] = useState(typesEvent)
  //useStyles
  const classes = useStyles();
  //useContext
  //useEffect
  useEffect(() => {
    console.log(event)

  }, [event])

  useEffect(() => {
    getEvents()
  }, [])
  //functions
  const getEvents =async ()=>{
    try {
      const responseEvents = await axios.get(`${url}/agenda`,config)
      setEvents(responseEvents.data)
    }
    catch (error) {
      alert('Error al cargar eventos de la agenda, recargue la página e inténtelo de nuevo')
      console.log('An error occurred:', error.response);            
    } 
  }


  const handleChangeEvent=(e)=>{
    e.persist();
    setEvent({            
            ...event,[e.target.name]:e.target.value
        })
    
}

  const handleCloseModalEvent = () => {
    setOpenModalEvent(false);
  };


  const handleNewEvent = ({ start, end }) => {
    setEventType('create')
    
    setEvent({
      ...event,
      'start':start.toISOString().slice(0,16),
      'end':end.toISOString().slice(0,16)
    })
    setOpenModalEvent(true);
  }

  const saveChangesEvent =async(e)=>{
    e.preventDefault();
    if (eventType ==='edit') {
      try {
        await axios.patch(`${url}/agenda/${event.id}`, {
          title: event.title,
          start: event.start,
          end: event.end,
          description: event.description,
          ownerId: event.ownerId
        },config)
        setOpenModalEvent(false);
        setEvent(typesEvent)
        await getEvents()
        alert('Modificación realizada con éxito')
      }
      catch (error) {
        console.log('An error occurred:', error.response);            
      } 
    }
    else if (eventType==='create') {
      try {
        await axios.post(`${url}/agenda`, {
          title: event.title,
          start: event.start,
          end: event.end,
          description: event.description,
          ownerId: event.ownerId
        },config)
        setOpenModalEvent(false);
        setEvent(typesEvent)
        await getEvents()
        alert('Evento almacenado con éxito')
      }
      catch (error) {
        console.log('An error occurred:', error.response);            
      }  
    }
  }

  const deleteEvent =async (e)=>{
    e.preventDefault();
    try {
      if (window.confirm("¿Estás seguro de eliminar el evento?")) {        
        await axios.delete(`${url}/agenda/${event.id}`,config)
        setOpenModalEvent(false)
        setEvent(typesEvent)
        await getEvents()
        alert('Evento eliminado con éxito')
      }
    }
    catch (error) {
      alert('Error al tratar de eliminar el evento, inténtelo de nuevo.')
      console.log('An error occurred:', error.response);            
    } 

  }


  const handleSelectEvent = (event)=>{
    setEventType('edit')
    setEvent(event)
    console.log(event)
    setOpenModalEvent(true);
  }


  return (
    <div className="row m-0" >    
      <Header />
      <NavbarApp />  
      <div className="w-100 mt-4">
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width:'100%' }}
          onSelectEvent={event => handleSelectEvent(event)}
          onSelectSlot={handleNewEvent}
        />
      </div>
      {/* Modal  event */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        //className={classes.modal}        
        className="w-75 mx-auto my-auto d-flex justify-content-center align-items-center"
        open={openModalEvent}
        onClose={handleCloseModalEvent}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalEvent}>
          <div className={classes.paper}>
            <div className="row d-flex justify-content-between overflow-hidden">
              <div className="col-12 d-flex justify-content-between mx-2 align-items-center">
                <h3 className="m-0">{eventType==='create'?'Registro de nuevo evento':'Detalles del evento'}</h3>                  
              </div>
              <hr className="d-flex justify-content-between align-items-center divisor"></hr>
              <div className="col-12">  
                <div className="row">
                    <div className="col-12 form-group ">
                      <label htmlFor="title">Título</label>
                      <TextField className="w-100" id="outlined-textarea"  label="" name="title" onChange={handleChangeEvent} value={event.title}  multiline variant="outlined"/> 
                    </div>
                    <div className="col-12 form-group ">
                      <label htmlFor="start">Inicio del evento</label>
                      <TextField className="w-100" id="date" type="datetime-local" label="" name="start" onChange={handleChangeEvent}  value={event.start}  InputLabelProps={{shrink: true,}}/> 
                    </div>
                    <div className="col-12 form-group ">
                      <label htmlFor="end">Fin del evento</label>
                      <TextField className="w-100" id="date" type="datetime-local" label="" name="end" onChange={handleChangeEvent} value={event.end}  InputLabelProps={{shrink: true,}}/> 
                    </div>
                    <div className="col-12 form-group ">
                      <label htmlFor="end">Descripción:</label>
                      <TextField className="w-100" id="outlined-textarea"  label="" name="description" onChange={handleChangeEvent} value={event.description}  multiline variant="outlined"/> 
                    </div>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-between align-items-center">
                <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={saveChangesEvent} > {eventType==='create'?'Guardar Nuevo Evento':'Guardar Modificaciones'} </Button>
                {eventType==='create'
                ? ''
                : <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={deleteEvent} > Borrar</Button>
                }  
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
)}

export default CalendarApp