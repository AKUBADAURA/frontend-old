import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
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

import MapView from '../../MapView/MapView';
import { POAContext } from '../../../context/POAContext';
import SelectMultipleDB from '../../../logic/SelectMultipleDB';
import { centerMapDefault, venuesDefault, zoomDefault } from '../../../types/types';
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

const POAedit = (props) => {

    //variables
    const url = process.env.REACT_APP_BACKEND_API_URL
    let config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }
    //useContext
    const { POA, setPOA } = useContext(POAContext)



    //useLocation & useHistory
    const location = useLocation()
    const history = useHistory()

    //useStyles
    const classes = useStyles()

    //useState

    const [redirect, setRedirect] = useState(false)
    const [valueTab, setValueTab] = useState(0)

    //////////////////-map---//////////////////////////////
    const [centerMap, setCenterMap] = useState(centerMapDefault)
    const [zoom, setZoom] = useState(zoomDefault)
    const [venues, setVenues] = useState(venuesDefault)


    //useEffect

    useEffect(() => {
        console.log('POA en edición: ', POA)
        return () => {

        }
    }, [POA])

    useEffect(() => {
        if (location.POA) {
            setPOA(location.POA)
        }
    }, [location])

    useEffect(() => {
        setMarker()
        //console.log('hay cambios en la consola')

    }, [POA.municipio])

    useEffect(() => {
        console.log('venues: ', venues)

    }, [venues])

    useEffect(() => {
        POA.id ? setRedirect(false) : setRedirect(true)
    }, [])

    //functions 

    const setMarker = async () => {
        try {
            if (POA.municipio) {
                let coordinatesResponse = await axios.get(`${url}/municipio?filter[where][name]=${POA.municipio}`, config)
                setPOA({
                    ...POA,
                    'latitud': coordinatesResponse.data[0].latitud,
                    'longitud': coordinatesResponse.data[0].longitud
                })
                setVenues([{
                    id: POA.id ? POA.id : new Date(),
                    nombre: POA.nombrePOA ? POA.nombrePOA : 'marker',
                    ubicacion: [coordinatesResponse.data[0].latitud, coordinatesResponse.data[0].longitud],
                    description: POA.estado ? POA.estado : 'El nuevo marcador'
                }])
                setCenterMap({ 'lat': coordinatesResponse.data[0].latitud, 'lng': coordinatesResponse.data[0].longitud })
                setZoom(11)
            }

        }
        catch (error) {
            console.log(error.response)
        }
    }

    const handleChange = (event, newValueTab) => {
        setValueTab(newValueTab);
    };

    const handleChangePOA = (e) => {
        e.persist();
        setPOA({
            ...POA, [e.target.name]: e.target.value
        })

    }

    const savePOA = async (e) => {
        e.preventDefault();
        try {
            // await axios.patch(`${url}/poa/${POA.id}`, {
            //     cantidadPoblacionCert: POA.cantidadPoblacionCert,
            //     codigo: POA.codigo,
            //     comunidad: POA.comunidad,
            //     departamento: POA.departamento,
            //     ejecutorPOA: POA.ejecutorPOA,
            //     esConAcuerdos: POA.esConAcuerdos,
            //     estado: POA.estado,
            //     estadoGestion: POA.estadoGestion,
            //     etapa: POA.etapa,
            //     etapaFinalizada: POA.etapaFinalizada,
            //     fechaEjecucion: POA.fechaEjecucion,
            //     fechaPlaneacion: POA.fechaPlaneacion,
            //     fechaRadicado: POA.fechaRadicado,
            //     municipio: POA.municipio,
            //     nombrePOA: POA.nombrePOA,
            //     numeroRadicado: POA.numeroRadicado,
            //     pine: POA.pine,
            //     sector: POA.sector,
            //     sectorOJ: POA.sectorOJ,
            //     tipoComunidad: POA.tipoComunidad,
            //     etnia: POA.etnia,
            //     totalComunidades: POA.totalComunidades,
            //     latitud: POA.latitud,
            //     longitud: POA.longitud,
            //     ownerId: POA.ownerId
            // }, config)
            await axios.patch(`${url}/poa/${POA.id}`, POA, config)
            setRedirect(true)
            alert('Cambios almacenados con éxito')
        }
        catch (error) {
            alert('No se pudo almacenar los cambios correctamente, intente recargar la página')
            console.log('An error occurred:', error.response);
        }
    }

    return (
        <div className="row m-0">
            <Header />
            <NavbarApp />
            {redirect === true ? (<Redirect to='/poas' />) : ('')}
            <div id="POAedit" className="col-12 mt-4">
                <form className="row card-body" id="formPOAedit">
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 d-flex justify-content-between mt-2 align-items-center">
                            <h3 className="m-0">Edición de Proyecto o Actividad (POA)</h3>
                            <Button variant="contained" color="default" startIcon={<SaveIcon />} onClick={savePOA}>Guardar cambios</Button>
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
                                            <TextField className="w-100" id="outlined-textarea" label="Código del POA" onChange={handleChangePOA} name="codigo" value={POA.codigo ? POA.codigo : ''} multiline variant="outlined" />
                                        </div>
                                        <div className="col-6 form-group  mt-4">
                                            <SelectFunction
                                                nameShow="Nombre del sector"
                                                nameSelect="sector"
                                                urlSelect="sector"
                                                //controller="POA" 
                                                value={POA.sector ? POA.sector : ''}
                                                setObject={setPOA}
                                                object={POA}
                                            />
                                        </div>

                                        <div className="col-6 form-group mt-4">
                                            <TextField className="w-100" id="outlined-textarea" label="Nombre del POA" onChange={handleChangePOA} name="nombrePOA" value={POA.nombrePOA ? POA.nombrePOA : ''} multiline variant="outlined" />
                                        </div>
                                        <div className="col-6 form-group mt-4">
                                            <TextField className="w-100" id="outlined-textarea" label="¿Es POMCAS?" onChange={handleChangePOA} name="esPOMCAS" value={POA.esPOMCAS ? POA.esPOMCAS : ''} multiline variant="outlined" />
                                        </div>
                                        <div className="col-6 form-group mt-4">
                                            <TextField className="w-100" id="outlined-textarea" label="¿Tiene licencia?" onChange={handleChangePOA} name="tieneLicencia" value={POA.tieneLicencia ? POA.tieneLicencia : ''} multiline variant="outlined" />
                                        </div>
                                        <div className="col-6 form-group mt-4">
                                            <TextField className="w-100" id="outlined-textarea" label="Nombre del ejecutor" onChange={handleChangePOA} name="ejecutorPOA" value={POA.ejecutorPOA ? POA.ejecutorPOA : ''} multiline variant="outlined" />
                                        </div>
                                        <div className="col-6 form-group mt-4">
                                            <SelectFunction
                                                nameShow="PINE"
                                                nameSelect="pine"
                                                urlSelect="pine"
                                                //controller="POA" 
                                                value={POA.pine ? POA.pine : ''}
                                                setObject={setPOA}
                                                object={POA}
                                            />
                                        </div>
                                        <div className="col-6 form-group mt-4">
                                            <TextField className="w-100" id="outlined-textarea" label="Número de Acto Administrativo" onChange={handleChangePOA} name="numActoAdmin" value={POA.numActoAdmin ? POA.numActoAdmin : ''} multiline variant="outlined" />
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
                                                onChange={handleChangePOA}
                                                name="fechaActoAdmin"
                                                value={POA.fechaActoAdmin ? POA.fechaActoAdmin : ''}
                                            />
                                        </div>
                                        <div className="col-6 form-group mt-4">
                                            <TextField
                                                className="w-100"
                                                id="date"
                                                type="date"
                                                InputLabelProps={{ shrink: true, }}
                                                label="Fecha Real"
                                                onChange={handleChangePOA}
                                                name="fechaReal"
                                                value={POA.fechaReal ? POA.fechaReal : ''}
                                            />
                                        </div>
                                        <div className="col-6 form-group mt-4">
                                            <TextField
                                                className="w-100"
                                                id="date"
                                                type="date"
                                                InputLabelProps={{ shrink: true, }}
                                                label="Fecha de planeación"
                                                onChange={handleChangePOA}
                                                name="fechaPlaneacion"
                                                value={POA.fechaPlaneacion ? POA.fechaPlaneacion : ''}
                                            />
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value={valueTab} index={2}>{/* POBLACION */}
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-6 form-group mt-4">
                                            <TextField className="w-100" id="outlined-textarea" label="Total de comunidades" onChange={handleChangePOA} name="totalComunidades" value={POA.totalComunidades ? POA.totalComunidades : ''} multiline variant="outlined" />
                                        </div>
                                        <div className="col-6 form-group mt-4">
                                            <TextField
                                                className="w-100"
                                                id="outlined-textarea"
                                                label="Pueblo"
                                                onChange={handleChangePOA}
                                                name="pueblo"
                                                value={POA.pueblo ? POA.pueblo : ''}
                                                multiline variant="outlined"
                                            />
                                        </div>
                                        <div className="col-6 form-group mt-4">
                                            <SelectFunction
                                                nameShow="Tipo de Comunidad"
                                                nameSelect="tipoComunidad"
                                                urlSelect="tipo-comunidad"
                                                //controller="POA" 
                                                value={POA.tipoComunidad ? POA.tipoComunidad : ''}
                                                setObject={setPOA}
                                                object={POA}
                                            />
                                        </div>
                                        <div className="col-12 form-group mt-4">
                                            <SelectMultipleDB
                                                label='Comunidad'
                                                className="w-100"
                                                urlSelect="comunidad"
                                                nameSelect="comunidad"
                                                value={POA.comunidad}
                                                setObject={setPOA}
                                                object={POA}
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
                                                onChange={handleChangePOA}
                                                name="region"
                                                value={POA.region ? POA.region : ''}
                                                multiline variant="outlined"
                                            />
                                        </div>
                                        <div className="col-6 form-group mt-4">
                                            <SelectFunctionDepartamentoMunicipio
                                                nameShow="Departamento"
                                                nameSelect="departamento"
                                                urlSelect="departamento"
                                                value={POA.departamento ? POA.departamento : ''}
                                                //controller="POA"
                                                setObject={setPOA}
                                                object={POA}
                                            />
                                        </div>
                                        <div className="col-6 form-group mt-4 ">
                                            <SelectFunctionDepartamentoMunicipio
                                                nameShow="Municipio"
                                                nameSelect="municipio"
                                                urlSelect="municipio"
                                                //controller="POA" 
                                                value={POA.municipio ? POA.municipio : ''}
                                                setObject={setPOA}
                                                object={POA}
                                                departamento={POA.departamento}
                                            />
                                        </div>
                                        {/* <div className="col-6 form-group mt-4">
                                        <TextField className="w-100" id="outlined-textarea" label="Código del Municipio" onChange={handleChangePOA} name="codigoMunicipio"  value={POA.codigoMunicipio?POA.codigoMunicipio:''}  multiline variant="outlined"/>
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

                                </TabPanel>
                                <div className="row d-flex justify-content-between">
                                    <div className="col-6 form-group  mt-4">
                                        <SelectFunction
                                            nameShow="Estado"
                                            nameSelect="estado"
                                            urlSelect="estado"
                                            //controller="POA" 
                                            value={POA.estado ? POA.estado : ''}
                                            setObject={setPOA}
                                            object={POA}
                                        />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <SelectFunction
                                            nameShow="Estado de gestión"
                                            nameSelect="estadoGestion"
                                            urlSelect="estado-gestion"
                                            //controller="POA" 
                                            value={POA.estadoGestion ? POA.estadoGestion : ''}
                                            setObject={setPOA}
                                            object={POA}
                                        />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <SelectFunction
                                            nameShow="¿Etapa Finalizada?"
                                            nameSelect="etapaFinalizada"
                                            urlSelect="etapa-finalizada"
                                            //controller="POA" 
                                            value={POA.etapaFinalizada ? POA.etapaFinalizada : ''}
                                            setObject={setPOA}
                                            object={POA}
                                        />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <SelectFunction
                                            nameShow="Etapa"
                                            nameSelect="etapa"
                                            urlSelect="etapa"
                                            //controller="POA" 
                                            value={POA.etapa ? POA.etapa : ''}
                                            setObject={setPOA}
                                            object={POA}
                                        />
                                    </div>
                                    <div className="col-6 form-group mt-4">
                                        <SelectFunction
                                            nameShow="¿Es con acuerdos?"
                                            nameSelect="esConAcuerdos"
                                            urlSelect="es-con-acuerdos"
                                            //controller="POA" 
                                            value={POA.esConAcuerdos ? POA.esConAcuerdos : ''}
                                            setObject={setPOA}
                                            object={POA}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default POAedit
