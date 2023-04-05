import React, { useState, useContext, useEffect } from 'react'
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import Backdrop from '@material-ui/core/Backdrop';
import { POAContext } from '../../../context/POAContext';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import POAindexModalDetailsTabPOA from './POAindex-ModalDetails-TabPOA';
import POAindexModalDetailsTabCasos from './POAindex-ModalDetails-TabCasos';
import POAindexModalDetailsTabDocumentos from './POAindex-ModalDetails-TabDocumentos';
import MapView from '../../MapView/MapView';
import POAindexModalDetailsTabHistorico from './POAindex-ModalDetails-TabHistorico';
import RolValidation from '../../../logic/RolValidation';
import POAindexModalDetailsTabEtapas from './POAindex-ModalDetails-TabEtapas';
import POAindexModalDetailsTabComunidades from './POAindex-ModalDetails-TabComunidades';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const POAIndexModalDetails = (props) => {
    //usetheme and useStyles
    const classes = useStyles();
    const theme = useTheme();
    //lets and const 

    //usestate
    const [value, setValue] = useState(0); //value of pestaña

    //useContext
    const { POA } = useContext(POAContext)
    //useeffect
    useEffect(() => {
        setValue(0) //default de pestaña en 0 (Detalles del POA)
    }, [])

    useEffect(() => {
        // console.log('POA: ', POA)
        setValue(0) //default de pestaña en 0 (Detalles del POA)
    }, [POA])


    //use Props
    const {
        openModalDetailPOA,
        handleCloseModalDetailPOA,
        handleCloseSpeedDial,
        handleOpenSpeedDial,
        optionsActionsDetailsPOA,
        openSpeedDial,
        venues,
        centerMap,
        zoom
    } = props;

    //functions 
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                //className={classes.modal}
                className="overflow-auto w-75 mx-auto"
                open={openModalDetailPOA}
                onClose={() => {
                    // setValue(0)
                    handleCloseModalDetailPOA()

                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalDetailPOA}>
                    <div className={classes.paper}>
                        <div className="row d-flex justify-content-between" id="modalDetailPOA" data-spy="scroll">
                            <div className="col-12 d-flex justify-content-between mx-2 align-items-center">
                                <h3 className="m-0 title-section">Detalles Proyecto, Obra o Actividad (POA)</h3>
                                <SpeedDial
                                    id="speedDialPOADetails"
                                    ariaLabel="SpeedDial"
                                    hidden={false}
                                    icon={<SpeedDialIcon />}
                                    onClose={handleCloseSpeedDial}
                                    onOpen={handleOpenSpeedDial}
                                    open={openSpeedDial}
                                    direction="left"
                                >
                                    {optionsActionsDetailsPOA.map((action) => (
                                        <SpeedDialAction
                                            key={action.name}
                                            icon={action.icon}
                                            tooltipTitle={action.name}
                                            onClick={action.function}
                                        />
                                    ))}
                                </SpeedDial>
                            </div>
                            <hr className="d-flex justify-content-between align-items-center divisor"></hr>
                            <div className={classes.root + " col-12"}>
                                <AppBar id="appBarPOAdetails" position="static" color="default">
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        {/* <Tab label="POA" icon={<Public />} {...a11yProps(0)} />
                                        <Tab label="Casos de seguimiento" icon={<AccountTree />} {...a11yProps(1)} />
                                        <Tab label="Documentos relacionados" icon={<FileCopy />} {...a11yProps(2)} /> */}
                                        <Tab label="POA"  {...a11yProps(0)} />
                                        <Tab label="Comunidades"  {...a11yProps(1)} />
                                        <Tab label="Etapas"  {...a11yProps(2)} />
                                        <Tab label="Casos de seguimiento" {...a11yProps(3)} />
                                        <Tab label="Documentos relacionados" {...a11yProps(4)} />
                                        {RolValidation([3, 4, 7, 8]) === true ? <Tab label="Histórico de modificaciones" {...a11yProps(5)} /> : ''}
                                    </Tabs>
                                </AppBar>
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value}
                                    onChangeIndex={handleChangeIndex}
                                >
                                    <TabPanel value={value} index={0} dir={theme.direction}>
                                        <POAindexModalDetailsTabPOA
                                            venues={venues}
                                            centerMap={centerMap}
                                            zoom={zoom}
                                            POA={POA}
                                        />
                                    </TabPanel>
                                    <TabPanel value={value} index={1} dir={theme.direction}>
                                        <POAindexModalDetailsTabComunidades
                                            POA={POA}
                                        />
                                    </TabPanel>
                                    <TabPanel value={value} index={2} dir={theme.direction}>
                                        <POAindexModalDetailsTabEtapas
                                            POA={POA}
                                        />
                                    </TabPanel>
                                    <TabPanel value={value} index={3} dir={theme.direction}>
                                        <POAindexModalDetailsTabCasos
                                            POA={POA}
                                        />
                                    </TabPanel>
                                    <TabPanel value={value} index={4} dir={theme.direction}>
                                        <POAindexModalDetailsTabDocumentos
                                            POA={POA}
                                        />
                                    </TabPanel>
                                    <TabPanel value={value} index={5} dir={theme.direction}>
                                        <POAindexModalDetailsTabHistorico
                                            POA={POA}
                                        />
                                    </TabPanel>
                                </SwipeableViews>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>

    )
}

export default POAIndexModalDetails
