import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BarChart from '@material-ui/icons/BarChart';
import EventNote from '@material-ui/icons/EventNote';
import PinDrop from '@material-ui/icons/PinDrop';
import Assignment from '@material-ui/icons/Assignment';
import PeopleAlt from '@material-ui/icons/PeopleAlt';


import SelectFunction from '../../../logic/SelectFunction';
import Header from '../../header/Header';
import NavbarApp from '../../NavBar/NavbarApp';



import PropTypes from 'prop-types';
import MapView from '../../MapView/MapView';
import SelectMultipleDB from '../../../logic/SelectMultipleDB';
import { centerMapDefault, typesPOA, venuesDefault, zoomDefault } from '../../../types/types';
import SelectFunctionDepartamentoMunicipio from '../../../logic/SelectFunctionDepartamentoMunicipio';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component="span">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100vh',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

const POAcreate = (props) => {
    //variables
    const url = process.env.REACT_APP_BACKEND_API_URL
    let config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }
    let responseCodeMunicipio;



    //useStyles
    const classes = useStyles();

    //useState

    const [redirect, setRedirect] = useState(false)
    const [valueTab, setValueTab] = useState(0);
    const [newPOA, setNewPOA] = useState(typesPOA)



    //////////////////-map---//////////////////////////////
    const [centerMap, setCenterMap] = useState(centerMapDefault)
    const [zoom, setZoom] = useState(zoomDefault)
    const [venues, setVenues] = useState(venuesDefault)

    //useContext

    //useEffect
    useEffect(() => {
        setMarker()

    }, [newPOA.municipio])

    useEffect(() => {
        //cuando el Select de departamento cambia se setean valores por defecto para municipio,
        //latitud y longitud, codigo de municipio.
        setNewPOA({
            ...newPOA,
            'municipio': typesPOA.municipio,
            'latitud': typesPOA.latitud,
            'longitud': typesPOA.longitud,
            'codigoMunicipio': typesPOA.codigoMunicipio
        })
        setVenues(venuesDefault)

    }, [newPOA.departamento])



    useEffect(() => {
        console.log('newPOA: ', newPOA)
    }, [newPOA])



    //functions 
    const handleChange = (event, newValueTab) => {
        setValueTab(newValueTab);
    };

    const setCodigoMunicipio = async (codigo) => {
        if (codigo) {
            setNewPOA({
                ...newPOA,
                'codigoMunicipio': codigo
            })
        }
        else {
            // try {
            //     responseCodeMunicipio = await axios.get(`${url}/municipio?filter[where][name]=${newPOA.municipio}`,config)
            //     setNewPOA({            
            //         ...newPOA,
            //         'codigoMunicipio':responseCodeMunicipio.data[0].id,
            //     })
            // }
            // catch (error) {
            //     console.log(error.response)
            // }
        }
    }

    const handleChangeNewPOA = (e) => {
        e.persist();
        setNewPOA({
            ...newPOA, [e.target.name]: e.target.value
        })

    }

    const saveNewPOA = async (e) => {
        e.preventDefault();
        try {
            if (newPOA.municipio !== '') {
                setNewPOA({
                    ...newPOA,
                    'codigoMunicipio': 0,
                })
            }
            setTimeout(() => { }, 300);
            await axios.post(`${url}/poa`, newPOA, config)
            setRedirect(true)
            alert('Registro hecho con éxito')
        }
        catch (error) {
            console.log('An error occurred:', error.response);
        }
    }

    const setMarker = async () => {
        try {
            let departamentoIdResponse = await axios.get(`${url}/departamento?filter[where][name]=${newPOA.departamento}`)
            let coordinatesResponse = await axios.get(`${url}/municipio?filter[where][name]=${newPOA.municipio}&filter[where][departamentoId]=${departamentoIdResponse.data[0].id}`)
            setNewPOA({
                ...newPOA,
                'latitud': coordinatesResponse.data[0].latitud,
                'longitud': coordinatesResponse.data[0].longitud,
                'codigoMunicipio': coordinatesResponse.data[0].id
            })
            //setCodigoMunicipio(coordinatesResponse.data[0].id)
            setVenues([{
                id: new Date(),
                nombre: newPOA.nombrePOA ? newPOA.nombrePOA : 'marker',
                ubicacion: [coordinatesResponse.data[0].latitud, coordinatesResponse.data[0].longitud],
                description: newPOA.estado ? newPOA.estado : 'El nuevo marcador'
            }])
            setCenterMap({ 'lat': coordinatesResponse.data[0].latitud, 'lng': coordinatesResponse.data[0].longitud })
            setZoom(11)

        }
        catch (error) {
            console.log(error.response)
        }
    }

    return (
        <div className="row m-0">
            <Header />
            <NavbarApp />
            {redirect === true ? (<Redirect to='/poas' />) : ('')}
            <div id="POAcreate" className="col-12 mt-4">
                <div className="row d-flex justify-content-between card-body" id="formPOAcreate">
                    <div className="col-12 d-flex justify-content-between mt-2 align-items-center">
                        <h3 className="m-0">Nuevo Proyecto o Actividad (POA)</h3>
                        <Button variant="contained" color="default" startIcon={<SaveIcon />} onClick={saveNewPOA}>Guardar cambios</Button>
                    </div>
                    <hr className="d-flex justify-content-between mt-5 align-items-center divisor"></hr>
                    <div className={classes.root + " col-12 d-flex"}>
                        <div className="col-3">
                            <Tabs
                                orientation="vertical"
                                variant="fullWidth"
                                indicatorColor="secondary"
                                textColor="secondary"
                                value={valueTab}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                className={classes.tabs}
                            >
                                <Tab icon={<Assignment />} label="DETALLES GENERALES" {...a11yProps(0)} />
                                <Tab icon={<EventNote />} label="FECHAS" {...a11yProps(1)} />
                                <Tab icon={<PeopleAlt />} label="POBLACION" {...a11yProps(2)} />
                                <Tab icon={<PinDrop />} label="UBICACION" {...a11yProps(3)} />
                                <Tab icon={<BarChart />} label="ESTADO" {...a11yProps(4)} />
                            </Tabs>
                        </div>
                        <div className="col-9">
                            <TabPanel value={valueTab} index={0}> {/* detalles generales */}
                                <div className="row d-flex justify-content-between">
                                    <div className="col-6 form-group mt-4">
                                        <TextField className="w-100" id="outlined-textarea" label="Código del POA" onChange={handleChangeNewPOA} name="codigo" value={newPOA.codigo ? newPOA.codigo : ''} multiline variant="outlined" />
                                    </div>
                                    <div className="col-6 form-group  mt-4">
                                        <SelectFunction
                                            nameShow="Nombre del sector"
                                            nameSelect="sector"
                                            urlSelect="sector"
                                            //controller="newPOA" 
                                            value={newPOA.sector ? newPOA.sector : ''}
                                            setObject={setNewPOA}
                                            object={newPOA}
                                        />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <TextField className="w-100" id="outlined-textarea" label="Nombre del POA" onChange={handleChangeNewPOA} name="nombrePOA" value={newPOA.nombrePOA ? newPOA.nombrePOA : ''} multiline variant="outlined" />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <TextField className="w-100" id="outlined-textarea" label="¿Es POMCAS?" onChange={handleChangeNewPOA} name="esPOMCAS" value={newPOA.esPOMCAS ? newPOA.esPOMCAS : ''} multiline variant="outlined" />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <TextField className="w-100" id="outlined-textarea" label="¿Tiene licencia?" onChange={handleChangeNewPOA} name="tieneLicencia" value={newPOA.tieneLicencia ? newPOA.tieneLicencia : ''} multiline variant="outlined" />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <TextField className="w-100" id="outlined-textarea" label="Nombre del ejecutor" onChange={handleChangeNewPOA} name="ejecutorPOA" value={newPOA.ejecutorPOA ? newPOA.ejecutorPOA : ''} multiline variant="outlined" />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <SelectFunction
                                            nameShow="PINE"
                                            nameSelect="pine"
                                            urlSelect="pine"
                                            //controller="newPOA"
                                            value={newPOA.pine ? newPOA.pine : ''}
                                            setObject={setNewPOA}
                                            object={newPOA}
                                        />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <TextField className="w-100" id="outlined-textarea" label="Número de Acto Administrativo" onChange={handleChangeNewPOA} name="numActoAdmin" value={newPOA.numActoAdmin ? newPOA.numActoAdmin : ''} multiline variant="outlined" />
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value={valueTab} index={1}>{/* FECHAS */}
                                <div className="row d-flex justify-content-between">
                                    <div className="col-6 form-group mt-4">
                                        <TextField
                                            className="w-100"
                                            id="date"
                                            type="date"
                                            InputLabelProps={{ shrink: true, }}
                                            label="Fecha de Acto Administrativo"
                                            onChange={handleChangeNewPOA}
                                            name="fechaActoAdmin"
                                            value={newPOA.fechaActoAdmin ? newPOA.fechaActoAdmin : ''}
                                        />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <TextField
                                            className="w-100"
                                            id="date"
                                            type="date"
                                            InputLabelProps={{ shrink: true, }}
                                            label="Fecha Real"
                                            onChange={handleChangeNewPOA}
                                            name="fechaReal"
                                            value={newPOA.fechaReal ? newPOA.fechaReal : ''}
                                        />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <TextField
                                            className="w-100"
                                            id="date"
                                            type="date"
                                            InputLabelProps={{ shrink: true, }}
                                            label="Fecha de planeación"
                                            onChange={handleChangeNewPOA}
                                            name="fechaPlaneacion"
                                            value={newPOA.fechaPlaneacion ? newPOA.fechaPlaneacion : ''}
                                        />
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value={valueTab} index={2}>{/* POBLACION */}
                                <div className="row d-flex justify-content-between">
                                    <div className="col-6 form-group mt-4">
                                        <TextField className="w-100" id="outlined-textarea" label="Total de comunidades" onChange={handleChangeNewPOA} name="totalComunidades" value={newPOA.totalComunidades ? newPOA.totalComunidades : ''} multiline variant="outlined" />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <TextField
                                            className="w-100"
                                            id="outlined-textarea"
                                            label="Pueblo"
                                            onChange={handleChangeNewPOA}
                                            name="pueblo"
                                            value={newPOA.pueblo ? newPOA.pueblo : ''}
                                            multiline variant="outlined"
                                        />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <SelectFunction
                                            nameShow="Tipo de Comunidad"
                                            nameSelect="tipoComunidad"
                                            urlSelect="tipo-comunidad"
                                            //controller="newPOA" 
                                            value={newPOA.tipoComunidad ? newPOA.tipoComunidad : ''}
                                            setObject={setNewPOA}
                                            object={newPOA}
                                        />
                                    </div>
                                    <div className="col-12 form-group mt-4">
                                        <SelectMultipleDB
                                            label='Comunidad'
                                            className="w-100"
                                            urlSelect="comunidad"
                                            nameSelect="comunidad"
                                            value={newPOA.comunidad}
                                            setObject={setNewPOA}
                                            object={newPOA}
                                        />
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value={valueTab} index={3}>{/* UBICACIÓN */}
                                <div className="row d-flex justify-content-between">

                                    <div className="col-6 form-group mt-4">
                                        <TextField
                                            className="w-100"
                                            id="outlined-textarea"
                                            label="Región"
                                            onChange={handleChangeNewPOA}
                                            name="region"
                                            value={newPOA.region ? newPOA.region : ''}
                                            multiline variant="outlined"
                                        />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <SelectFunctionDepartamentoMunicipio
                                            nameShow="Departamento"
                                            nameSelect="departamento"
                                            urlSelect="departamento"
                                            value={newPOA.departamento ? newPOA.departamento : ''}
                                            //controller="newPOA"
                                            setObject={setNewPOA}
                                            object={newPOA}
                                        />
                                    </div>
                                    <div className="col-6 form-group mt-4 ">
                                        <SelectFunctionDepartamentoMunicipio
                                            nameShow="Municipio"
                                            nameSelect="municipio"
                                            urlSelect="municipio"
                                            //controller="newPOA" 
                                            value={newPOA.municipio ? newPOA.municipio : ''}
                                            setObject={setNewPOA}
                                            object={newPOA}
                                            departamento={newPOA.departamento}
                                        />
                                    </div>
                                    {/* <div className="col-6 form-group mt-4">
                                        <TextField className="w-100" id="outlined-textarea" label="Código del Municipio" onChange={handleChangeNewPOA} name="codigoMunicipio"  value={newPOA.codigoMunicipio?newPOA.codigoMunicipio:''}  multiline variant="outlined"/>
                                    </div> */}
                                    <div className="col-12 w-100" id="containerMapCreatePOA">
                                        <MapView
                                            venues={venues}
                                            center={centerMap}
                                            zoom={zoom}
                                            simpleVenues={true}
                                        />
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value={valueTab} index={4}>{/* ESTADO */}
                                <div className="row d-flex justify-content-between">
                                    <div className="col-6 form-group  mt-4">
                                        <SelectFunction
                                            nameShow="Estado"
                                            nameSelect="estado"
                                            urlSelect="estado"
                                            //controller="newPOA" 
                                            value={newPOA.estado ? newPOA.estado : ''}
                                            setObject={setNewPOA}
                                            object={newPOA}
                                        />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <SelectFunction
                                            nameShow="Estado de gestión"
                                            nameSelect="estadoGestion"
                                            urlSelect="estado-gestion"
                                            //controller="newPOA" 
                                            value={newPOA.estadoGestion ? newPOA.estadoGestion : ''}
                                            setObject={setNewPOA}
                                            object={newPOA}
                                        />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <SelectFunction
                                            nameShow="¿Etapa Finalizada?"
                                            nameSelect="etapaFinalizada"
                                            urlSelect="etapa-finalizada"
                                            //controller="newPOA" 
                                            value={newPOA.etapaFinalizada ? newPOA.etapaFinalizada : ''}
                                            setObject={setNewPOA}
                                            object={newPOA}
                                        />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <SelectFunction
                                            nameShow="Etapa"
                                            nameSelect="etapa"
                                            urlSelect="etapa"
                                            //controller="newPOA" 
                                            value={newPOA.etapa ? newPOA.etapa : ''}
                                            setObject={setNewPOA}
                                            object={newPOA}
                                        />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <SelectFunction
                                            nameShow="¿Es con acuerdos?"
                                            nameSelect="esConAcuerdos"
                                            urlSelect="es-con-acuerdos"
                                            //controller="newPOA" 
                                            value={newPOA.esConAcuerdos ? newPOA.esConAcuerdos : ''}
                                            setObject={setNewPOA}
                                            object={newPOA}
                                        />
                                    </div>
                                </div>
                            </TabPanel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default POAcreate
