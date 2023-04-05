import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Equalizer, FilterList } from '@material-ui/icons';
import { POAContext } from '../../../context/POAContext';
import Graphics from './POAindex-tabsFilter-graphics';
import POAindexTabsFilterFilter from './POAindex-tabsFilter-filter';
import '../../../css/poas.css'
import POAindexTabsFilterMaps from './POAindex-tabsFilter-maps';
import TerrainIcon from '@material-ui/icons/Terrain';
import NavBarAppToolTip from '../../NavBar/NavBarApp-Tooltip';
import POAindexTabsfilterTooltip from './Poaindex-tabsfilter-tooltip';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
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
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    minWidth: 200, // a number of your choice
    width: 200, // a number of your choice
  }
}));

export default function POAIndexTabsFilter(props) {

  //vars and const
  //useStyles
  const classes = useStyles();
  //useContext
  const { POAS, setPOAS, POASFiltered, setPOASFiltered } = useContext(POAContext)
  //useState
  const [valueTab, setValueTab] = useState(0);
  const [filters, setFilters] = useState()
  //functions

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={valueTab}
          onChange={handleChange}
        // variant="scrollable"
        // scrollButtons="on"
        // indicatorColor="primary"
        // textColor="primary"
        // className="tabsHeader"

        // variant="scrollable"
        // scrollButtons="off"
        // scrollButtons="auto"
        >

          <div
            className='m-0 p-0 w-100 h-100 d-flex justify-content-center'
            onClick={() => { setValueTab(0) }}
          >
            <POAindexTabsfilterTooltip
              children={
                <Tab style={{ minWidth: "33%" }} label="Filtros" icon={<FilterList />} {...a11yProps(0)} >
                </Tab>
              }
              text={'Podrá cruzar la información de las consultas por...'}
            />
          </div>
          <div
            className='m-0 p-0 w-100 h-100 d-flex justify-content-center'
            onClick={() => { setValueTab(1) }}
          >
            <POAindexTabsfilterTooltip
              children={
                <Tab style={{ minWidth: "33%" }} label="Gráficas" icon={<Equalizer />} {...a11yProps(1)} >
                </Tab>
              }
              text={'Genera tortas estadísticas sobre procesos de consulta previa por...'}
            />
          </div>
          <div
            className='m-0 p-0 w-100 h-100 d-flex justify-content-center'
            onClick={() => { setValueTab(2) }}
          >
            <POAindexTabsfilterTooltip
              children={
                <Tab style={{ minWidth: "33%" }} label="Mapas" icon={<TerrainIcon />} {...a11yProps(2)} >
                </Tab>
              }
              text={'Visualice los POAS agrupados en departamentos, municipios y marcadores'}
            />
          </div>
        </Tabs>
      </AppBar>
      <TabPanel value={valueTab} index={0} className="tabPanel">
        <POAindexTabsFilterFilter
        /* setLoadingMap={props.setLoadingMap} */
        />
      </TabPanel>
      <TabPanel value={valueTab} index={1} className="tabPanel">
        <Graphics
          getPOASGraphic={props.getPOASGraphic}
        />
      </TabPanel>
      <TabPanel value={valueTab} index={2} className="tabPanel">
        <POAindexTabsFilterMaps
        />
      </TabPanel>
    </div>
  );
}
