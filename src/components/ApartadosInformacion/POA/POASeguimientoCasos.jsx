import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
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
import { Policy } from '@material-ui/icons';
import '../../../css/poas.css'
import SelectFunction from '../../../logic/SelectFunction';
import Header from '../../header/Header';
import NavbarApp from '../../NavBar/NavbarApp';
import POASeguimientoCasostabOptions from './POASeguimientoCasos-tabOptions'
import { POAContext } from '../../../context/POAContext';
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

const POASeguimientoCasos = (props) => {
    //useContext

    const { POA } = useContext(POAContext)

    //variables
    const url = process.env.REACT_APP_BACKEND_API_URL
    let config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }




    //useStyles
    const classes = useStyles();

    //useState

    const [valueTab, setValueTab] = useState(5);
    const [redirect, setRedirect] = useState(false)

    //props

    //useEffect

    useEffect(() => {
        if (!POA.id) {
            setRedirect(true)
        }

        console.log('el poa a intervenir en seguimiento a casos', POA)
    }, [])




    //functions 
    const handleChangeTabs = (event, newValueTab) => {
        setValueTab(newValueTab);
    };

    return (
        <div className="row m-0">
            <Header />
            <NavbarApp />
            {redirect === true ? (<Redirect to='/poas' />) : ('')}
            <div id="POASeguimientoCasos" className="row col-12 mt-4 d-flex justify-content-between">
                <div className="col-12 d-flex justify-content-between mt-2 align-items-center">
                    <h3 className="m-0">Seguimiento a casos (POA)</h3>
                </div>
                <hr className="d-flex justify-content-between align-items-center divisor"></hr>
                <div className={classes.root + " row d-flex"}>
                    <div className="col-2 p-0">
                        <Tabs
                            orientation="vertical"
                            variant="fullWidth"
                            indicatorColor="secondary"
                            textColor="secondary"
                            value={valueTab}
                            onChange={handleChangeTabs}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            <Tab icon={<Assignment />} label="DETALLES GENERALES" {...a11yProps(0)} />
                            <Tab icon={<EventNote />} label="FECHAS" {...a11yProps(1)} />
                            <Tab icon={<PeopleAlt />} label="POBLACION" {...a11yProps(2)} />
                            <Tab icon={<PinDrop />} label="UBICACION" {...a11yProps(3)} />
                            <Tab icon={<BarChart />} label="ESTADO" {...a11yProps(4)} />
                            <Tab icon={<Policy />} label="SEGUIMIENTO" {...a11yProps(5)} />
                        </Tabs>
                    </div>
                    <div className="col-10" id="menuVerticalSeguimiento">
                        <TabPanel className="row tabPanelRow" value={valueTab} index={0}> {/* detalles generales */}
                            <div className="row d-flex justify-content-between">
                                <div className="col-6 form-group mt-4">
                                    <TextField disabled className="w-100" id="outlined-textarea" label="Código del POA" name="codigo" value={POA.codigo ? POA.codigo : ''} multiline variant="outlined" />
                                </div>
                                <div className="col-6 form-group  mt-4">
                                    <SelectFunction
                                        disabled
                                        nameShow="Nombre del sector"
                                        nameSelect="sector"
                                        urlSelect="sector"
                                        value={POA.sector ? POA.sector : ''}
                                    />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <TextField disabled className="w-100" id="outlined-textarea" label="Nombre del POA" name="nombrePOA" value={POA.nombrePOA ? POA.nombrePOA : ''} multiline variant="outlined" />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <TextField disabled className="w-100" id="outlined-textarea" label="¿Es POMCAS?" name="esPOMCAS" value={POA.esPOMCAS ? POA.esPOMCAS : ''} multiline variant="outlined" />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <TextField disabled className="w-100" id="outlined-textarea" label="¿Tiene licencia?" name="tieneLicencia" value={POA.tieneLicencia ? POA.tieneLicencia : ''} multiline variant="outlined" />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <TextField disabled className="w-100" id="outlined-textarea" label="Nombre del ejecutor" name="ejecutorPOA" value={POA.ejecutorPOA ? POA.ejecutorPOA : ''} multiline variant="outlined" />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <SelectFunction
                                        disabled
                                        nameShow="PINE"
                                        nameSelect="pine"
                                        urlSelect="pine"
                                        value={POA.pine ? POA.pine : ''}
                                    />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <TextField disabled className="w-100" id="outlined-textarea" label="Número de Acto Administrativo" name="numActoAdmin" value={POA.numActoAdmin ? POA.numActoAdmin : ''} multiline variant="outlined" />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel className="row tabPanelRow" value={valueTab} index={1}>{/* FECHAS */}
                            <div className="row d-flex justify-content-between">
                                <div className="col-6 form-group mt-4">
                                    <TextField
                                        disabled
                                        className="w-100"
                                        id="date"
                                        type="date"
                                        InputLabelProps={{ shrink: true, }}
                                        label="Fecha de Acto Administrativo"
                                        name="fechaActoAdmin"
                                        value={POA.fechaActoAdmin ? POA.fechaActoAdmin : ''}
                                    />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <TextField
                                        disabled
                                        className="w-100"
                                        id="date"
                                        type="date"
                                        InputLabelProps={{ shrink: true, }}
                                        label="Fecha Real"
                                        name="fechaReal"
                                        value={POA.fechaReal ? POA.fechaReal : ''}
                                    />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <TextField
                                        disabled
                                        className="w-100"
                                        id="date"
                                        type="date"
                                        InputLabelProps={{ shrink: true, }}
                                        label="Fecha de planeación"
                                        name="fechaPlaneacion"
                                        value={POA.fechaPlaneacion ? POA.fechaPlaneacion : ''}
                                    />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel className="row tabPanelRow" value={valueTab} index={2}>{/* POBLACION */}
                            <div className="row d-flex justify-content-between">
                                <div className="col-6 form-group mt-4">
                                    <TextField
                                        disabled
                                        className="w-100"
                                        id="outlined-textarea"
                                        label="Total de comunidades"
                                        name="totalComunidades"
                                        value={POA.totalComunidades ? POA.totalComunidades : ''} multiline variant="outlined"
                                    />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <TextField
                                        disabled
                                        className="w-100"
                                        id="outlined-textarea"
                                        label="Pueblo"
                                        name="pueblo"
                                        value={POA.pueblo ? POA.pueblo : ''}
                                        multiline variant="outlined"
                                    />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <SelectFunction
                                        disabled
                                        nameShow="Tipo de Comunidad"
                                        nameSelect="tipoComunidad"
                                        urlSelect="tipo-comunidad"
                                        value={POA.tipoComunidad ? POA.tipoComunidad : ''}
                                    />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <TextField disabled className="w-100" id="outlined-textarea" label="Comunidad" name="comunidad" value={POA.comunidad ? POA.comunidad : ''} multiline variant="outlined" />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel className="row tabPanelRow" value={valueTab} index={3}>{/* UBICACIÓN */}
                            <div className="row d-flex justify-content-between">
                                <div className="col-6 form-group mt-4">
                                    <TextField
                                        disabled
                                        className="w-100"
                                        id="outlined-textarea"
                                        label="Región"
                                        name="region"
                                        value={POA.region ? POA.region : ''}
                                        multiline variant="outlined"
                                    />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <SelectFunction
                                        disabled
                                        nameShow="Departamento"
                                        nameSelect="departamento"
                                        urlSelect="departamento"
                                        value={POA.departamento ? POA.departamento : ''}
                                    />
                                </div>
                                <div className="col-6 form-group mt-4 ">
                                    <SelectFunction
                                        disabled
                                        nameShow="Municipio"
                                        nameSelect="municipio"
                                        urlSelect="municipio"
                                        value={POA.municipio ? POA.municipio : ''}
                                    />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel className="row tabPanelRow" value={valueTab} index={4}>{/* ESTADO */}
                            <div className="row d-flex justify-content-between">
                                <div className="col-6 form-group  mt-4">
                                    <SelectFunction
                                        disabled
                                        nameShow="Estado"
                                        nameSelect="estado"
                                        urlSelect="estado"
                                        value={POA.estado ? POA.estado : ''}
                                    />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <SelectFunction
                                        disabled
                                        nameShow="Estado de gestión"
                                        nameSelect="estadoGestion"
                                        urlSelect="estado-gestion"
                                        value={POA.estadoGestion ? POA.estadoGestion : ''}
                                    />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <SelectFunction
                                        disabled
                                        nameShow="¿Etapa Finalizada?"
                                        nameSelect="etapaFinalizada"
                                        urlSelect="etapa-finalizada"
                                        value={POA.etapaFinalizada ? POA.etapaFinalizada : ''}
                                    />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <SelectFunction
                                        disabled
                                        nameShow="Etapa"
                                        nameSelect="etapa"
                                        urlSelect="etapa"
                                        value={POA.etapa ? POA.etapa : ''}
                                    />
                                </div>
                                <div className="col-6 form-group mt-4">
                                    <SelectFunction
                                        disabled
                                        nameShow="¿Es con acuerdos?"
                                        nameSelect="esConAcuerdos"
                                        urlSelect="es-con-acuerdos"
                                        value={POA.esConAcuerdos ? POA.esConAcuerdos : ''}
                                    />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel className="row tabSeguimientoCasos" value={valueTab} index={5}>{/* SEGUIMIENTO */}
                            <POASeguimientoCasostabOptions state={props.location.state} />
                        </TabPanel>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default POASeguimientoCasos
