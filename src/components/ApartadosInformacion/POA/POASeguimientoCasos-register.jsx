import React, { useContext, useState, useEffect,  } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import RadioButtonsGroup from '../../../logic/RadioButtonsGroup';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import SelectFunction from '../../../logic/SelectFunction';
import CheckboxFunction from '../../../logic/CheckboxFunction';
import MapViewDraw from '../../MapView/MapViewDraw';
import { POAContext } from '../../../context/POAContext';
import MapDrawer from '../../MapView/MapDrawer';
import SelectMultipleDB from '../../../logic/SelectMultipleDB';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import POASeguimientoCasosRegisterFiles from './POASeguimientoCasos-registerFiles';
import {
  typesNewSeguimientoCasos,
  typesNewSeguimientoCasos1,
  typesNewSeguimientoCasos2,
  typesNewSeguimientoCasos2b,
  typesNewSeguimientoCasos3,
  typesNewSeguimientoCasos4,
  typesNewSeguimientoCasos5,
  typesNewSeguimientoCasos6,
  typesNewSeguimientoCasos7,
  typesNewSeguimientoCasos8,
  typesNewSeguimientoCasos9,
  typesNewSeguimientoCasos10,
  typesNewSeguimientoCasos11,
  typesNewSeguimientoCasos12,
  typesNewSeguimientoCasos13,
  typesNewSeguimientoCasos14,
  typesNewSeguimientoCasos15,
  typesNewSeguimientoCasos16,
  typesNewSeguimientoCasos17,
  typesNewSeguimientoCasos18,
  typesNewSeguimientoCasos19
} from '../../../types/types';

const Accordion = withStyles({
  root: {
    padding: '0px',
    margin: '0px',
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function POASeguimientoCasosRegister(props) {
  let dataletS2territorio = {
    type: 'FeatureCollection',
    features: []
  };
  let dataletS2areaProtegida = {
    type: 'FeatureCollection',
    features: []
  };
  let dataletS2areaReservaforestal = {
    type: 'FeatureCollection',
    features: []
  };
  let dataletS2areaBaldios = {
    type: 'FeatureCollection',
    features: []
  };
  // function onChangeS2territorio(data) { dataletS2territorio = data }
  // const onChangeS2areaProtegida=(data)=> { dataletS2areaProtegida = data }
  // const onChangeS2areaReservaforestal=(data)=> { dataletS2areaReservaforestal = data }
  // const onChangeS2areaBaldios=(data)=> { dataletS2areaBaldios = data }


  //useRef



  //useContext

  const {
    POA,
    anexos, setAnexos,
    newSeguimientoCasos, setNewSeguimientoCasos,
    newSeguimientoCasos1, setNewSeguimientoCasos1,
    newSeguimientoCasos2, setNewSeguimientoCasos2,
    newSeguimientoCasos2b, setNewSeguimientoCasos2b,
    newSeguimientoCasos3, setNewSeguimientoCasos3,
    newSeguimientoCasos4, setNewSeguimientoCasos4,
    newSeguimientoCasos5, setNewSeguimientoCasos5,
    newSeguimientoCasos6, setNewSeguimientoCasos6,
    newSeguimientoCasos7, setNewSeguimientoCasos7,
    newSeguimientoCasos8, setNewSeguimientoCasos8,
    newSeguimientoCasos9, setNewSeguimientoCasos9,
    newSeguimientoCasos10, setNewSeguimientoCasos10,
    newSeguimientoCasos11, setNewSeguimientoCasos11,
    newSeguimientoCasos12, setNewSeguimientoCasos12,
    newSeguimientoCasos13, setNewSeguimientoCasos13,
    newSeguimientoCasos14, setNewSeguimientoCasos14,
    newSeguimientoCasos15, setNewSeguimientoCasos15,
    newSeguimientoCasos16, setNewSeguimientoCasos16,
    newSeguimientoCasos17, setNewSeguimientoCasos17,
    newSeguimientoCasos18, setNewSeguimientoCasos18,
    newSeguimientoCasos19, setNewSeguimientoCasos19,
  } = useContext(POAContext)


  //vars&Const

  const url = process.env.REACT_APP_BACKEND_API_URL
  let config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
  }
  //useStyles
  const classes = useStyles();
  //useState

  const [expandedCasos, setExpandedCasos] = useState('');
  //////////////////-map---//////////////////////////////
  const [centerMap, setCenterMap] = useState({ 'lat': POA.latitud ? POA.latitud : 4.6501730300, 'lng': POA.longitud ? POA.longitud : -74.1073590000 })
  const [zoom, setZoom] = useState(9)
  const [venues, setVenues] = useState([])

  //////////////////-map new implementation---//////////////////////////////
  const [center, setCenter] = useState([POA.latitud ? POA.latitud : 4.6501730300, POA.longitud ? POA.longitud : -74.1073590000])
  const drawConfig = {
    edit: true,
    delete: true,
    rectangle: true,
    line: true,
    polygon: true,
    circle: false,
    polyline: false,
    marker: false,
    circlemarker: false,
  }

  ///////////////files
  const [show, setShow] = useState(false) //state que controla renderizado de herramientas de dibujo de poligono en mapas


  //useEffect
  useEffect(() => {
    addPOAId()//agregar el poaId al nuevo caso de seguimiento
    setVenues([{
      id: POA.id,
      nombre: POA.nombrePOA ? POA.nombrePOA : 'marker',
      ubicacion: [POA.latitud ? POA.latitud : 4.6501730300, POA.longitud ? POA.longitud : -74.1073590000],
      description: POA.estado ? POA.estado : 'No hay ubicación del POA registrada'
    }])
  }, [])



  useEffect(() => {
    console.log('newSeguimientoCasos2: ', newSeguimientoCasos2)
  }, [newSeguimientoCasos2])

  useEffect(() => {
    if (expandedCasos === 'panel2') {
      setShow(true)
    }
    else {
      setShow(false)
    }
  }, [expandedCasos])


  // useEffect(() => { console.log(newSeguimientoCasos) }, [newSeguimientoCasos]);
  // useEffect(() => { console.log(newSeguimientoCasos1) }, [newSeguimientoCasos1]);
  // useEffect(() => { console.log(newSeguimientoCasos2) }, [newSeguimientoCasos2]);
  useEffect(() => { console.log(newSeguimientoCasos2b) }, [newSeguimientoCasos2b]);
  // useEffect(() => { console.log(newSeguimientoCasos3) }, [newSeguimientoCasos3]);
  // useEffect(() => { console.log(newSeguimientoCasos4) }, [newSeguimientoCasos4]);
  // useEffect(() => { console.log(newSeguimientoCasos5) }, [newSeguimientoCasos5]);
  // useEffect(() => { console.log(newSeguimientoCasos6) }, [newSeguimientoCasos6]);
  // useEffect(() => { console.log(newSeguimientoCasos7) }, [newSeguimientoCasos7]);
  // useEffect(() => { console.log(newSeguimientoCasos8) }, [newSeguimientoCasos8]);
  // useEffect(() => { console.log(newSeguimientoCasos9) }, [newSeguimientoCasos9]);
  // useEffect(() => { console.log(newSeguimientoCasos10) }, [newSeguimientoCasos10]);
  // useEffect(() => { console.log(newSeguimientoCasos11) }, [newSeguimientoCasos11]);
  // useEffect(() => { console.log(newSeguimientoCasos12) }, [newSeguimientoCasos12]);
  // useEffect(() => { console.log(newSeguimientoCasos13) }, [newSeguimientoCasos13]);
  // useEffect(() => { console.log(newSeguimientoCasos14) }, [newSeguimientoCasos14]);
  // useEffect(() => { console.log(newSeguimientoCasos15) }, [newSeguimientoCasos15]);
  // useEffect(() => { console.log(newSeguimientoCasos16) }, [newSeguimientoCasos16]);
  // useEffect(() => { console.log(newSeguimientoCasos17) }, [newSeguimientoCasos17]);
  // useEffect(() => { console.log(newSeguimientoCasos18) }, [newSeguimientoCasos18]);
  // useEffect(() => { console.log(newSeguimientoCasos19) }, [newSeguimientoCasos19]);



  //functions

  const handleChangeAccordion = (panel) => (event, newExpanded) => {
    setExpandedCasos(newExpanded ? panel : false);
  };


  const addPOAId = async () => {
    try {
      let poaId = { 'poaId': POA.id }
      setNewSeguimientoCasos({
        ...newSeguimientoCasos, ...poaId
      })
    }
    catch (error) {
      console.log(error.response)
    }
  }

  const uploadAnexos = async (idSeguimientoCasos) => {
    //set de carga de archivos en ejecución
    //setUploadingFiles(true)
    //verificar que archivos y tipo de archivo esté OK
    if (verifyAnexos() === 'problem') { return }


    try {
      await Promise.all(
        anexos.map(async (anexo) => {
          let file = new FormData(anexo.file.target.form);
          //subir los archivos
          await axios.post(`${url}/files`, file)
          // subir registro de archivo publico
          await axios.post(`${url}/archivo-publico`, {
            name: anexo.fileName,
            route: anexo.route,
            type: anexo.type,
            seguimientoCasoId: idSeguimientoCasos,
            poaId: anexo.poaId,
          }, config)  

        })
      )

      //alert('Archivos subidos OK')
    }
    catch (e) {
      console.log('error: ', e.response);
      alert('Error al cargar archivos')
    }
    // setUploadingFiles(false)

  }

  const verifyAnexos = () => {
    for (let [i, anexo] of anexos.entries()) {
        if (anexo.type === null) {
            // setUploadingFiles(false)
            alert(`Tipo de anexo no especificado en el Anexo ${i + 1}.`)
            return 'problem'
            break;
        }
        if (anexo.file === null) {
            // setUploadingFiles(false)
            alert(`Archivo no seleccionado en el Anexo ${i + 1}.`)
            return 'problem'
            break;
        }
    }
}

//set 0 in s2nombreCOmunidad if this is null because its a number



  const saveNewSeguimientoCasos = async (e) => {
    e.preventDefault();
    setShow(false)
    if (verifyAnexos() === 'problem') { return }

    try {

      //upload registro seguimiento Casos
      let newSeguimientoCasosTotal = { ...newSeguimientoCasos, ...newSeguimientoCasos1, ...newSeguimientoCasos2, ...newSeguimientoCasos2b, ...newSeguimientoCasos3, ...newSeguimientoCasos4, ...newSeguimientoCasos5, ...newSeguimientoCasos6, ...newSeguimientoCasos7, ...newSeguimientoCasos8, ...newSeguimientoCasos9, ...newSeguimientoCasos10, ...newSeguimientoCasos11, ...newSeguimientoCasos12, ...newSeguimientoCasos13, ...newSeguimientoCasos14, ...newSeguimientoCasos15, ...newSeguimientoCasos16, ...newSeguimientoCasos17, ...newSeguimientoCasos18, ...newSeguimientoCasos19 }
      console.log('newSeguimientoCasos Total: ', newSeguimientoCasosTotal)
      const responseSeguimientoCaso = await axios.post(`${url}/seguimiento-casos`, newSeguimientoCasosTotal, config)
      console.log('responseSeguimientoCaso: ', responseSeguimientoCaso);

      ///Upload Anexos y registro DB archivos- publicos
      await uploadAnexos(responseSeguimientoCaso.data.id)

      //seting defaultvalues 
      alert('Seguimiento al Caso registrado con éxito')
      props.setValuePestanaSuperior(0) //set pestaña superior (0) (lista de resgistros)
      setAnexos([])
      setNewSeguimientoCasos(typesNewSeguimientoCasos) //set registro vacio
      setNewSeguimientoCasos1(typesNewSeguimientoCasos1) //set registro vacio
      setNewSeguimientoCasos2(typesNewSeguimientoCasos2) //set registro vacio
      setNewSeguimientoCasos2b(typesNewSeguimientoCasos2b) //set registro vacio
      setNewSeguimientoCasos3(typesNewSeguimientoCasos3) //set registro vacio
      setNewSeguimientoCasos4(typesNewSeguimientoCasos4) //set registro vacio
      setNewSeguimientoCasos5(typesNewSeguimientoCasos5) //set registro vacio
      setNewSeguimientoCasos6(typesNewSeguimientoCasos6) //set registro vacio
      setNewSeguimientoCasos7(typesNewSeguimientoCasos7) //set registro vacio
      setNewSeguimientoCasos8(typesNewSeguimientoCasos8) //set registro vacio
      setNewSeguimientoCasos9(typesNewSeguimientoCasos9) //set registro vacio
      setNewSeguimientoCasos10(typesNewSeguimientoCasos10) //set registro vacio
      setNewSeguimientoCasos11(typesNewSeguimientoCasos11) //set registro vacio
      setNewSeguimientoCasos12(typesNewSeguimientoCasos12) //set registro vacio
      setNewSeguimientoCasos13(typesNewSeguimientoCasos13) //set registro vacio
      setNewSeguimientoCasos14(typesNewSeguimientoCasos14) //set registro vacio
      setNewSeguimientoCasos15(typesNewSeguimientoCasos15) //set registro vacio
      setNewSeguimientoCasos16(typesNewSeguimientoCasos16) //set registro vacio
      setNewSeguimientoCasos17(typesNewSeguimientoCasos17) //set registro vacio
      setNewSeguimientoCasos18(typesNewSeguimientoCasos18) //set registro vacio
      setNewSeguimientoCasos19(typesNewSeguimientoCasos19) //set registro vacio
    }
    catch (error) {
      console.log('An error occurred:', error.response);
    }
  }

  const handleChangeNewSeguimientoCasos = (e) => { e.persist(); setNewSeguimientoCasos({ ...newSeguimientoCasos, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos1 = (e) => { e.persist(); setNewSeguimientoCasos1({ ...newSeguimientoCasos1, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos2 = (e) => { e.persist(); setNewSeguimientoCasos2({ ...newSeguimientoCasos2, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos2b = (e) => { e.persist(); setNewSeguimientoCasos2b({ ...newSeguimientoCasos2b, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos3 = (e) => { e.persist(); setNewSeguimientoCasos3({ ...newSeguimientoCasos3, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos4 = (e) => { e.persist(); setNewSeguimientoCasos4({ ...newSeguimientoCasos4, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos5 = (e) => { e.persist(); setNewSeguimientoCasos5({ ...newSeguimientoCasos5, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos6 = (e) => { e.persist(); setNewSeguimientoCasos6({ ...newSeguimientoCasos6, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos7 = (e) => { e.persist(); setNewSeguimientoCasos7({ ...newSeguimientoCasos7, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos8 = (e) => { e.persist(); setNewSeguimientoCasos8({ ...newSeguimientoCasos8, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos9 = (e) => { e.persist(); setNewSeguimientoCasos9({ ...newSeguimientoCasos9, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos10 = (e) => { e.persist(); setNewSeguimientoCasos10({ ...newSeguimientoCasos10, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos11 = (e) => { e.persist(); setNewSeguimientoCasos11({ ...newSeguimientoCasos11, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos12 = (e) => { e.persist(); setNewSeguimientoCasos12({ ...newSeguimientoCasos12, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos13 = (e) => { e.persist(); setNewSeguimientoCasos13({ ...newSeguimientoCasos13, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos14 = (e) => { e.persist(); setNewSeguimientoCasos14({ ...newSeguimientoCasos14, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos15 = (e) => { e.persist(); setNewSeguimientoCasos15({ ...newSeguimientoCasos15, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos16 = (e) => { e.persist(); setNewSeguimientoCasos16({ ...newSeguimientoCasos16, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos17 = (e) => { e.persist(); setNewSeguimientoCasos17({ ...newSeguimientoCasos17, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos18 = (e) => { e.persist(); setNewSeguimientoCasos18({ ...newSeguimientoCasos18, [e.target.name]: e.target.value }) }
  const handleChangeNewSeguimientoCasos19 = (e) => { e.persist(); setNewSeguimientoCasos19({ ...newSeguimientoCasos19, [e.target.name]: e.target.value }) }


  const optionsBinary = [
    { value: 'Sí', label: 'Sí' },
    { value: 'No', label: 'No' }
  ]
  const optionsS3EstadoConsulta = [
    { value: 'Pre-consulta', label: 'Pre-consulta' },
    { value: 'Consulta', label: 'Consulta' },
    { value: 'Post-consulta', label: 'Post-consulta' }
  ]

  const optionsS4ParticipantesComunidad = [
    { value: 'Asamblea en pleno', label: 'Asamblea en pleno' },
    { value: 'Algunas autoridades', label: 'Algunas autoridades' },
    { value: 'Solo representante legal', label: 'Solo representante legal' }
  ]
  const optionsS5DocumentosPrevioConsulta = [
    { value: 'Todos los solicitados', label: 'Todos los solicitados' },
    { value: 'Algunos', label: 'Algunos' },
    { value: 'Ninguno', label: 'Ninguno' }
  ]
  const optionsS11ConsultaConcertada = [
    { value: 'Concertada', label: 'Concertada' },
    { value: 'Acuerdo Parcial', label: 'Acuerdo Parcial' },
    { value: 'Sin Acuerdo', label: 'Sin Acuerdo' }
  ]
  const optionsTrinary = [
    { value: 'Parcial', label: 'Parcial' },
    { value: 'Total', label: 'Total' },
    { value: 'Ninguna', label: 'Ninguna' }
  ]
  const optionsS12CumplimientoAcuerdos = [
    { value: 'Total', label: 'Total' },
    { value: 'Parcial', label: 'Parcial' },
    { value: 'Sin avance', label: 'Sin avance' }

  ]
  const optionsTipoAnexo = [
    { value: 'Sentencia', label: 'Sentencia' },
    { value: 'Auto de Seguimiento', label: 'Auto de Seguimiento' },
    { value: 'Comunicados', label: 'Comunicados' },
    { value: 'Actas', label: 'Actas' },
    { value: 'Documentos Relacionados al POA', label: 'Documentos Relacionados al POA' },
    { value: 'Otro', label: 'Otro' }
  ]

  const optionss4participantesEntesControl = ['Defensoría', 'Procuraduría']
  const optionss4participantesGobierno = ['Min Interior', 'CAR', 'ANLA', 'ANM', 'ANH', 'ANI', 'ANT', 'INVIAS']
  const optionss4participantesOrganizaciones = ['Organizaciones Nacionales', 'Organizaciones Regionales', 'Organizaciones no Gubernamentales', 'Organismos Internacionales', 'Organismos Académicos']
  const optionss15tipoAfectaciones = ['Ambientales', 'Culturales-Espirituales', 'Socio-económicas']
  const optionss16tipoBeneficios = ['Ambientales', 'Culturales-Espirituales', 'Socio-económicas']
  const optionss17conflictosGenerados = ['Estigmatización', 'Prevendas', 'Criminalización', 'Otros conflictos']
  const optionss18defensaTerritorial = ['Mingas y movilización', 'Acciones Jurídicas', 'Cabildeo', 'Gestión Internacional', 'Otros procesos']

  return (
    <>

      <div className="col-12 d-flex justify-content-between mt-2 align-items-center">
        <h3 className="m-0">Nuevo registro</h3>
        <Button variant="contained" color="primary" size="small" onClick={(e) => saveNewSeguimientoCasos(e)} startIcon={<SaveIcon />}>
          Guardar
        </Button>
      </div>
      <hr className="d-flex justify-content-between align-items-center divisor"></hr>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <Accordion square expanded={expandedCasos === 'panel1'} onChange={handleChangeAccordion('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <span className="text-right w-100">Naturaleza del Proyecto</span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <TextField className="col-12 mt-2 px-1" id="outlined-textarea" label="Nombre del Proyecto" onChange={handleChangeNewSeguimientoCasos1} name="s1nombreProyecto" value={newSeguimientoCasos1.s1nombreProyecto} multiline variant="outlined" />
          <TextField className="col-12 mt-2 px-1" id="outlined-textarea" label="Responsable" onChange={handleChangeNewSeguimientoCasos1} name="s1responsable" value={newSeguimientoCasos1.s1responsable} multiline variant="outlined" />
          <div className="col-12 mt-2 px-1">
            <SelectFunction
              nameShow="Reglón económico"
              nameSelect="s1reglonEconomico"
              urlSelect="sector"
              value={newSeguimientoCasos1.s1reglonEconomico}

              //controller="newSeguimientoCasos1" 

              setObject={setNewSeguimientoCasos1}
              object={newSeguimientoCasos1}
            />

          </div>
          <TextField className="col-12 mt-2 px-1" id="outlined-textarea" label="Operador" onChange={handleChangeNewSeguimientoCasos1} name="s1operador" value={newSeguimientoCasos1.s1operador} multiline variant="outlined" />
          <TextField className="col-12 mt-2 px-1" id="outlined-textarea" label="Financiador" onChange={handleChangeNewSeguimientoCasos1} name="s1financiador" value={newSeguimientoCasos1.s1financiador} multiline variant="outlined" />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <Accordion square expanded={expandedCasos === 'panel2'} onChange={handleChangeAccordion('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <span className="text-right w-100">
            Comunidad, Resguardo U Organización Afectada
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <div className="col-12 mt-2 px-1">
            <SelectMultipleDB
              label='Comunidad'
              className="w-100"
              urlSelect="comunidad"
              nameSelect="s2nombreComunidad"
              value={newSeguimientoCasos2.s2nombreComunidad}
              setObject={setNewSeguimientoCasos2}
              object={newSeguimientoCasos2}
            />
          </div>
          {/* <TextField
            className="col-12 mt-2 px-1"
            id="outlined-textarea"
            label="Nombre de la Comunidad"
            onChange={handleChangeNewSeguimientoCasos2}
            name="s2nombreComunidad"
            value={newSeguimientoCasos2.s2nombreComunidad}
            multiline variant="outlined"
          /> */}

          <TextField className="col-12 mt-2 px-1" id="outlined-textarea" label="Pueblo" onChange={handleChangeNewSeguimientoCasos2} name="s2pueblo" value={newSeguimientoCasos2.s2pueblo} multiline variant="outlined" />
          <TextField className="col-12 mt-2 px-1" id="outlined-textarea" label="Número de Habitantes" onChange={handleChangeNewSeguimientoCasos2} name="s2numeroHabitantes" value={newSeguimientoCasos2.s2numeroHabitantes} multiline variant="outlined" />
          {/* ubicacion geografica */}
          <span className="col-12 mt-2">Situación jurídica de la comunidad:</span>
          <RadioButtonsGroup label="¿Cuenta con reconocimiento?" name="s2reconocimiento" options={optionsBinary} value={newSeguimientoCasos2.s2reconocimiento} handleChange={handleChangeNewSeguimientoCasos2} />
          <RadioButtonsGroup label="¿Existe desplazamiento?" name="s2desplazamiento" options={optionsBinary} value={newSeguimientoCasos2.s2desplazamiento} handleChange={handleChangeNewSeguimientoCasos2} />
          <div className="col-12 w-100 containerMapSeguimientoCasos mb-5 px-1">
            <MapDrawer
              drawConfig={drawConfig}
              center={center}
              label='Mapa del territorio - Baldíos - Área Protegida - Reserva Forestal'
              zoom={zoom}
              type='drawing'
              //type='showing'
              //onChange={onChangeS2territorio}
              dataLet={dataletS2territorio}
              venues={venues}
              simpleVenues={true}
              object={newSeguimientoCasos2b}
              nameSelect='s2territorio'
              setObject={setNewSeguimientoCasos2b}
              selectOptions={newSeguimientoCasos2b.s2territorio}
            />
          </div>
          {/*           <div className="col-12 w-100 containerMapSeguimientoCasos mb-5 px-1">         
            <MapDrawer
              drawConfig={drawConfig}
              center={center}
              label='Área Protegida'
              zoom={zoom}
              type='drawing'
              //type='showing'
              //onChange={onChangeS2areaProtegida}
              dataLet = {dataletS2areaProtegida}
              venues={venues}
              simpleVenues={true}
              object={newSeguimientoCasos2}
              nameSelect='s2areaProtegida'
              setObject={setNewSeguimientoCasos2}
              selectOptions={newSeguimientoCasos2.s2areaProtegida}
            />              
          </div> 
          <div className="col-12 w-100 containerMapSeguimientoCasos mb-5 px-1">
            <MapDrawer
              drawConfig={drawConfig}
              center={center}
              label='Área Reserva Forestal'
              zoom={zoom}
              type='drawing'
              //type='showing'
              dataLet = {dataletS2areaReservaforestal}
              venues={venues}
              simpleVenues={true}
              object={newSeguimientoCasos2}
              nameSelect='s2areaReservaforestal'
              setObject={setNewSeguimientoCasos2}
              selectOptions={newSeguimientoCasos2.s2areaReservaforestal}
            />
          </div>
          <div className="col-12 w-100 containerMapSeguimientoCasos mb-5 px-1">
            <MapDrawer
              drawConfig={drawConfig}
              center={center}
              label='Baldíos'
              zoom={zoom}
              type='drawing'
              //type='showing'
              dataLet = {dataletS2areaBaldios}
              venues={venues}
              simpleVenues={true}
              object={newSeguimientoCasos2}
              nameSelect='s2areaBaldios'
              setObject={setNewSeguimientoCasos2}
              selectOptions={newSeguimientoCasos2.s2areaBaldios}
            />  
          </div> */}
          <RadioButtonsGroup label="¿En riesgo de extinción?" name="s2riesgoExtincion" options={optionsBinary} value={newSeguimientoCasos2.s2riesgoExtincion} handleChange={handleChangeNewSeguimientoCasos2} />
          <RadioButtonsGroup label="¿En fragilidad demográfica?" name="s2fragilidadDemografica" options={optionsBinary} value={newSeguimientoCasos2.s2fragilidadDemografica} handleChange={handleChangeNewSeguimientoCasos2} />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <Accordion square expanded={expandedCasos === 'panel3'} onChange={handleChangeAccordion('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <span className="text-right w-100">
            Proceso De Consulta
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <RadioButtonsGroup label="¿Hubo proceso de consulta?" name="s3procesoConsulta" options={optionsBinary} value={newSeguimientoCasos3.s3procesoConsulta} handleChange={handleChangeNewSeguimientoCasos3} />
          <RadioButtonsGroup label="Estado actual" name="s3estadoConsulta" options={optionsS3EstadoConsulta} value={newSeguimientoCasos3.s3estadoConsulta} handleChange={handleChangeNewSeguimientoCasos3} />
          <RadioButtonsGroup label="¿Ruta de consulta concertada?" name="s3consultaConcertada" options={optionsBinary} value={newSeguimientoCasos3.s3consultaConcertada} handleChange={handleChangeNewSeguimientoCasos3} />
          <TextField className="col-12 mt-2 px-1" id="outlined-textarea" label="¿Por qué?" onChange={handleChangeNewSeguimientoCasos3} name="s3porqueConsultaConcertada" value={newSeguimientoCasos3.s3porqueConsultaConcertada} multiline variant="outlined" />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <Accordion square expanded={expandedCasos === 'panel4'} onChange={handleChangeAccordion('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <span className="text-right w-100">
            Participantes
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <RadioButtonsGroup className='col-12' label="Por la comunidad" name="s4participantesComunidad" options={optionsS4ParticipantesComunidad} value={newSeguimientoCasos4.s4participantesComunidad} handleChange={handleChangeNewSeguimientoCasos4} />
          <CheckboxFunction
            label="Por los entes de control"
            listOptions={optionss4participantesEntesControl}
            object={newSeguimientoCasos4}
            nameSelect='s4participantesEntesControl'
            selectOptions={newSeguimientoCasos4.s4participantesEntesControl}
            setObject={setNewSeguimientoCasos4}
          />
          <CheckboxFunction
            label="Por el gobierno"
            listOptions={optionss4participantesGobierno}
            object={newSeguimientoCasos4}
            nameSelect='s4participantesGobierno'
            selectOptions={newSeguimientoCasos4.s4participantesGobierno}
            setObject={setNewSeguimientoCasos4}
          />
          <CheckboxFunction
            label="Por las organizaciones asesoras u observadoras"
            listOptions={optionss4participantesOrganizaciones}
            object={newSeguimientoCasos4}
            nameSelect='s4participantesOrganizaciones'
            selectOptions={newSeguimientoCasos4.s4participantesOrganizaciones}
            setObject={setNewSeguimientoCasos4}
          />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <Accordion square expanded={expandedCasos === 'panel5'} onChange={handleChangeAccordion('panel5')}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <span className="text-right w-100">
            Acceso A Información
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <RadioButtonsGroup className='col-12' label="¿Se realizó entrega de documentos del proyecto de manera previa al inicio de la consulta?" name="s5documentosPrevioConsulta" options={optionsS5DocumentosPrevioConsulta} value={newSeguimientoCasos5.s5documentosPrevioConsulta} handleChange={handleChangeNewSeguimientoCasos5} />
          <RadioButtonsGroup className='col-12' label="¿Se dio información sobre Fuentes de financiación del proceso?" name="s5fuentesFinanciacion" options={optionsBinary} value={newSeguimientoCasos5.s5fuentesFinanciacion} handleChange={handleChangeNewSeguimientoCasos5} />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <Accordion square expanded={expandedCasos === 'panel6'} onChange={handleChangeAccordion('panel6')}>
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <span className="text-right w-100">
            Financiación Del Proceso
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <RadioButtonsGroup className='col-12' label="¿La comunidad contó con garantía para tener equipo técnico propio?" name="s6garantiaEquipoTecnico" options={optionsBinary} value={newSeguimientoCasos6.s6garantiaEquipoTecnico} handleChange={handleChangeNewSeguimientoCasos6} />
          <RadioButtonsGroup className='col-12' label="¿Se garantizó y financió la logística?" name="s6financiacionLogistica" options={optionsTrinary} value={newSeguimientoCasos6.s6financiacionLogistica} handleChange={handleChangeNewSeguimientoCasos6} />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <Accordion square expanded={expandedCasos === 'panel7'} onChange={handleChangeAccordion('panel7')}>
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <span className="text-right w-100">
            Comunicación
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <RadioButtonsGroup className='col-12' label="¿Claridad de lenguaje y oportunidad en la información?" name="s7claridadInformacion" options={optionsBinary} value={newSeguimientoCasos7.s7claridadInformacion} handleChange={handleChangeNewSeguimientoCasos7} />
          <RadioButtonsGroup className='col-12' label="¿Se respondió a las preguntas de la comunidad?" name="s7preguntasComunidad" options={optionsBinary} value={newSeguimientoCasos7.s7preguntasComunidad} handleChange={handleChangeNewSeguimientoCasos7} />
          <RadioButtonsGroup className='col-12' label="¿Se expusieron los alcances reales del proyecto?" name="s7exposicionalcances" options={optionsBinary} value={newSeguimientoCasos7.s7exposicionalcances} handleChange={handleChangeNewSeguimientoCasos7} />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <Accordion square expanded={expandedCasos === 'panel8'} onChange={handleChangeAccordion('panel8')}>
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <span className="text-right w-100">
            Estudio De Impacto Ambiental
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <RadioButtonsGroup className='col-12' label="¿Hubo estudio de impacto ambiental?" name="s8estudioImpactoAmbiental" options={optionsBinary} value={newSeguimientoCasos8.s8estudioImpactoAmbiental} handleChange={handleChangeNewSeguimientoCasos8} />
          <RadioButtonsGroup className='col-12' label="¿Concertados?" name="s8concertadoEstudio" options={optionsBinary} value={newSeguimientoCasos8.s8concertadoEstudio} handleChange={handleChangeNewSeguimientoCasos8} />
          <RadioButtonsGroup className='col-12' label="¿Se plasmó en el estudio lo concertado?" name="s8plasmaConcertado" options={optionsTrinary} value={newSeguimientoCasos8.s8plasmaConcertado} handleChange={handleChangeNewSeguimientoCasos8} />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <Accordion square expanded={expandedCasos === 'panel9'} onChange={handleChangeAccordion('panel9')}>
        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
          <span className="text-right w-100">
            Planes De Manejo Ambiental
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <RadioButtonsGroup className='col-12' label="¿Hubo plan de manejo ambiental?" name="s9planManejoAmbiental" options={optionsBinary} value={newSeguimientoCasos9.s9planManejoAmbiental} handleChange={handleChangeNewSeguimientoCasos9} />
          <RadioButtonsGroup className='col-12' label="¿Concertado?" name="s9concertadoPlan" options={optionsBinary} value={newSeguimientoCasos9.s9concertadoPlan} handleChange={handleChangeNewSeguimientoCasos9} />
          <RadioButtonsGroup className='col-12' label="¿Se plasmó en el estudio lo concertado?" name="s9plasmaConcertado" options={optionsTrinary} value={newSeguimientoCasos9.s9plasmaConcertado} handleChange={handleChangeNewSeguimientoCasos9} />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <Accordion square expanded={expandedCasos === 'panel10'} onChange={handleChangeAccordion('panel10')}>
        <AccordionSummary aria-controls="panel10d-content" id="panel10d-header">
          <span className="text-right w-100">
            Planes De Compensación
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <RadioButtonsGroup className='col-12' label="¿Hubo planes de compensación?" name="s10planCompensacion" options={optionsBinary} value={newSeguimientoCasos10.s10planCompensacion} handleChange={handleChangeNewSeguimientoCasos10} />
          <RadioButtonsGroup className='col-12' label="¿Concertados?" name="s10concertadoCompensacion" options={optionsBinary} value={newSeguimientoCasos10.s10concertadoCompensacion} handleChange={handleChangeNewSeguimientoCasos10} />
          <RadioButtonsGroup className='col-12' label="¿Se plasmó en el plan lo concertado con la comunidad?" name="s10plasmaConcertado" options={optionsTrinary} value={newSeguimientoCasos10.s10plasmaConcertado} handleChange={handleChangeNewSeguimientoCasos10} />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <Accordion square expanded={expandedCasos === 'panel11'} onChange={handleChangeAccordion('panel11')}>
        <AccordionSummary aria-controls="panel11d-content" id="panel11d-header">
          <span className="text-right w-100">
            Protocolización De La Consulta
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <RadioButtonsGroup className='col-12' label="¿La consulta fue concertada?" name="s11consultaConcertada" options={optionsS11ConsultaConcertada} value={newSeguimientoCasos11.s11consultaConcertada} handleChange={handleChangeNewSeguimientoCasos11} />
          <RadioButtonsGroup className='col-12' label="¿Hay relación o diálogo con respeto a planes de vida?" name="s11relacionPlanVida" options={optionsTrinary} value={newSeguimientoCasos11.s11relacionPlanVida} handleChange={handleChangeNewSeguimientoCasos11} />
          <RadioButtonsGroup className='col-12' label="¿Hay relación o diálogo con respeto a plan de salvaguarda?" name="s11relacionPlanSalvaguarda" options={optionsTrinary} value={newSeguimientoCasos11.s11relacionPlanSalvaguarda} handleChange={handleChangeNewSeguimientoCasos11} />
          <RadioButtonsGroup className='col-12' label="¿Hay relación o diálogo con respeto a protocolos bioculturales?" name="s11relacionProtocolosBioculturales" options={optionsTrinary} value={newSeguimientoCasos11.s11relacionProtocolosBioculturales} handleChange={handleChangeNewSeguimientoCasos11} />
          <RadioButtonsGroup className='col-12' label="¿Hay relación o diálogo con respeto a protocolos de consulta previa?" name="s11relacionProtocolosCP" options={optionsTrinary} value={newSeguimientoCasos11.s11relacionProtocolosCP} handleChange={handleChangeNewSeguimientoCasos11} />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <Accordion square expanded={expandedCasos === 'panel12'} onChange={handleChangeAccordion('panel12')}>
        <AccordionSummary aria-controls="panel12d-content" id="panel12d-header">
          <span className="text-right w-100">
            Cumplimiento De Acuerdos Post-Consulta
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <RadioButtonsGroup className='col-12' label="¿Hay cumplimiento?" name="s12cumplimientoAcuerdos" options={optionsS12CumplimientoAcuerdos} value={newSeguimientoCasos12.s12cumplimientoAcuerdos} handleChange={handleChangeNewSeguimientoCasos12} />
          <TextField className="col-12 mt-2 px-1" id="outlined-textarea" label="Observaciones" onChange={handleChangeNewSeguimientoCasos12} name="s12observaciones" value={newSeguimientoCasos12.s12observaciones} multiline variant="outlined" />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <Accordion square expanded={expandedCasos === 'panel13'} onChange={handleChangeAccordion('panel13')}>
        <AccordionSummary aria-controls="panel13d-content" id="panel13d-header">
          <span className="text-right w-100">
            ¿Se Conformó Comité De Seguimiento A Los Acuerdos?
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <RadioButtonsGroup className='col-12' label="¿Se conformó comité de seguimiento a los acuerdos?" name="s13comiteSeguimientoAcuerdos" options={optionsBinary} value={newSeguimientoCasos13.s13comiteSeguimientoAcuerdos} handleChange={handleChangeNewSeguimientoCasos13} />
          <RadioButtonsGroup className='col-12' label="¿se reune el comité de seguimiento?" name="s13comiteReunido" options={optionsBinary} value={newSeguimientoCasos13.s13comiteReunido} handleChange={handleChangeNewSeguimientoCasos13} />
          <TextField className="col-12 mt-2 px-1" id="outlined-textarea" label="Integrantes Comité" onChange={handleChangeNewSeguimientoCasos13} name="s13integrantesComite" value={newSeguimientoCasos13.s13integrantesComite} multiline variant="outlined" />
          <RadioButtonsGroup className='col-12' label="¿Pueblos indígenas como garante tienen asiento allí?" name="s13garantesIndigenas" options={optionsBinary} value={newSeguimientoCasos13.s13garantesIndigenas} handleChange={handleChangeNewSeguimientoCasos13} />
          <RadioButtonsGroup className='col-12' label="¿Gobierno como garante tiene asiento allí?" name="s13garantesGobierno" options={optionsBinary} value={newSeguimientoCasos13.s13garantesGobierno} handleChange={handleChangeNewSeguimientoCasos13} />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <Accordion square expanded={expandedCasos === 'panel14'} onChange={handleChangeAccordion('panel14')}>
        <AccordionSummary aria-controls="panel14d-content" id="panel14d-header">
          <span className="text-right w-100">
            Monitoreo Ambiental
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <RadioButtonsGroup className='col-12' label="¿Existe monitoreo ambiental?" name="s14monitoreoAmbiental" options={optionsBinary} value={newSeguimientoCasos14.s14monitoreoAmbiental} handleChange={handleChangeNewSeguimientoCasos14} />
          <TextField className="col-12 mt-2 px-1" id="outlined-textarea" label="¿Con qué periodicidad se realiza?" onChange={handleChangeNewSeguimientoCasos14} name="s14PeriodicidadMonitoreo" value={newSeguimientoCasos14.s14PeriodicidadMonitoreo} multiline variant="outlined" />
          <TextField className="col-12 mt-2 px-1" id="outlined-textarea" label="¿Quiénes participan?" onChange={handleChangeNewSeguimientoCasos14} name="s14participantesMonitoreo" value={newSeguimientoCasos14.s14participantesMonitoreo} multiline variant="outlined" />
          <RadioButtonsGroup className='col-12' label="¿La comunidad participa del monitoreo?" name="s14participacionComunidad" options={optionsBinary} value={newSeguimientoCasos14.s14participacionComunidad} handleChange={handleChangeNewSeguimientoCasos14} />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <Accordion square expanded={expandedCasos === 'panel15'} onChange={handleChangeAccordion('panel15')}>
        <AccordionSummary aria-controls="panel15d-content" id="panel15d-header">
          <span className="text-right w-100">
          </span>
          Afectaciones
        </AccordionSummary>
        <AccordionDetails className="row">
          <CheckboxFunction
            label="¿Qué tipo de afectaciones ha generado el desarrollo del proyecto o de la consulta?"
            listOptions={optionss15tipoAfectaciones}
            object={newSeguimientoCasos15}
            nameSelect='s15tipoAfectaciones'
            selectOptions={newSeguimientoCasos15.s15tipoAfectaciones}
            setObject={setNewSeguimientoCasos15}
          />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <Accordion square expanded={expandedCasos === 'panel16'} onChange={handleChangeAccordion('panel16')}>
        <AccordionSummary aria-controls="panel16d-content" id="panel16d-header">
          <span className="text-right w-100">
            Beneficios
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <CheckboxFunction
            label="¿Qué tipo de beneficios ha generado el desarrollo del proyecto o de la consulta?"
            listOptions={optionss16tipoBeneficios}
            object={newSeguimientoCasos16}
            nameSelect='s16tipoBeneficios'
            selectOptions={newSeguimientoCasos16.s16tipoBeneficios}
            setObject={setNewSeguimientoCasos16}
          />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <Accordion square expanded={expandedCasos === 'panel17'} onChange={handleChangeAccordion('panel17')}>
        <AccordionSummary aria-controls="panel17d-content" id="panel17d-header">
          <span className="text-right w-100">
            Conflictos Generados
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <CheckboxFunction
            listOptions={optionss17conflictosGenerados}
            object={newSeguimientoCasos17}
            nameSelect='s17conflictosGenerados'
            selectOptions={newSeguimientoCasos17.s17conflictosGenerados}
            setObject={setNewSeguimientoCasos17}
          />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <Accordion square expanded={expandedCasos === 'panel18'} onChange={handleChangeAccordion('panel18')}>
        <AccordionSummary aria-controls="panel18d-content" id="panel18d-header">
          <span className="text-right w-100">
            Procesos De Defensa Territorial Con Ocasión De Los Proyectos A Consultar
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          <CheckboxFunction
            listOptions={optionss18defensaTerritorial}
            object={newSeguimientoCasos18}
            nameSelect='s18defensaTerritorial'
            selectOptions={newSeguimientoCasos18.s18defensaTerritorial}
            setObject={setNewSeguimientoCasos18}
          />
        </AccordionDetails>
      </Accordion>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <Accordion square expanded={expandedCasos === 'panel19'} onChange={handleChangeAccordion('panel19')}>
        <AccordionSummary aria-controls="panel19d-content" id="panel19d-header">
          <span className="text-right w-100">
            Anexos y Comentarios adicionales
          </span>
        </AccordionSummary>
        <AccordionDetails className="row">
          {/* Anexos */}
          <POASeguimientoCasosRegisterFiles  />
          {/* comentarios adicionales */}
          <TextField className="col-12 mt-2 px-1" id="outlined-textarea" label="Comentarios Adicionales" onChange={handleChangeNewSeguimientoCasos19} name="s19comentarios" value={newSeguimientoCasos19.s19comentarios} multiline variant="outlined" />

        </AccordionDetails>
      </Accordion>
    </>
  );
}
