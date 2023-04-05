import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


import POASeguimientoCasosList from './POASeguimientoCasos-list';
import POASeguimientoCasosRegister from './POASeguimientoCasos-register';
import RolValidation from '../../../logic/RolValidation';
import POASeguimientoCasosHistorico from './POASeguimientoCasos-historico';
import POASeguimientoCasosDocumentos from './POASeguimientoCasos-documentos';


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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {

    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  tabPanel: {
    padding: 0,
  },
}));


const POASeguimientoCasostabOptions = (props) => {


  //vars & const
  //useStyles
  const classes = useStyles();
  const theme = useTheme();
  //useContext
  //useState
  const [valuePestanaSuperior, setValuePestanaSuperior] = React.useState(props.state.state);
  //useEffect

  useEffect(() => {
    console.log('props.state: ', props.state)

  }, [])
  //functions
  const handleChange = (event, newValue) => {
    setValuePestanaSuperior(newValue);
  };

  const handleChangeIndex = (index) => {
    setValuePestanaSuperior(index);
  };



  return (
    <div className={classes.root + " w-100"}>
      <AppBar position="static" color="default">
        <Tabs
          value={valuePestanaSuperior}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="Seguimiento a casos Tabs"
        >
          <Tab label="Lista de Registros" {...a11yProps(0)} />
          {RolValidation([3, 4, 7, 8]) === true ? <Tab label="Nuevo Registro" {...a11yProps(1)} /> : ''}
          {RolValidation([3, 4, 7, 8]) === true ? <Tab label="Histórico de modificaciones" {...a11yProps(2)} /> : ''}
          <Tab label="Documentos Anexos" {...a11yProps(3)} />

        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={valuePestanaSuperior}
        onChangeIndex={handleChangeIndex}

      >
        <TabPanel
          value={valuePestanaSuperior}
          index={0}
          dir={theme.direction}
        >
          <POASeguimientoCasosList id="swipeableviewsss" />
        </TabPanel>
        <TabPanel value={valuePestanaSuperior} index={1} dir={theme.direction} >
          <POASeguimientoCasosRegister setValuePestanaSuperior={setValuePestanaSuperior} />
        </TabPanel>
        <TabPanel value={valuePestanaSuperior} index={2} dir={theme.direction}>
          <POASeguimientoCasosHistorico />
        </TabPanel>
        <TabPanel value={valuePestanaSuperior} index={3} dir={theme.direction}>
          <POASeguimientoCasosDocumentos />
        </TabPanel>

        </SwipeableViews>
    </div>
      )
}

      export default POASeguimientoCasostabOptions