import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Equalizer, FilterList, Inbox, Send } from '@material-ui/icons';
// import { POAContext } from '../../../context/POAContext';
// import '../../../css/poas.css'
import '../../css/mensajeria.css'
import MensajeriaIndexTabsIN from './MensajeriaIndex-Tabs-IN';
import MensajeriaIndexTabsOUT from './MensajeriaIndex-Tabs-OUT';

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
}));

export default function MensajeriaIndexTabs(props) {

    //vars and const
    //useStyles
    const classes = useStyles();
    //useContext
    //useState
    const [valueTab, setValueTab] = useState(0);
    const [filters, setFilters] = useState()
    //functions

    const handleChange = (event, newValue) => {
        console.log('newvaluetab: ', newValue)
        setValueTab(newValue);
        // if(newValue ===0){ props.getMessagesIN()}
        // if(newValue ===1){ props.getMessagesOUT()}
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="static"
                color="transparent"
            >
                <Tabs
                    value={valueTab}
                    onChange={handleChange}
                    //variant="scrollable"
                    //scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                    className="tabsHeaderMessage"
                >
                    <Tab label="Recibidos" icon={<Inbox />} {...a11yProps(0)} />
                    <Tab label="Enviados" icon={<Send />} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={valueTab} index={0} className="tabPanel">
            <MensajeriaIndexTabsIN/>
            </TabPanel>
            <TabPanel value={valueTab} index={1} className="tabPanel">
            <MensajeriaIndexTabsOUT/>
            </TabPanel>
        </div>
    );
}
