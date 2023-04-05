import React, { useContext, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import BarChart from "@material-ui/icons/BarChart";
import PeopleAlt from "@material-ui/icons/PeopleAlt";
import { PermMedia, Receipt, Security, Timelapse } from "@material-ui/icons";
import Header from "../header/Header";
import NavbarApp from "../NavBar/NavbarApp";
import DashBoardUsers from "./DashBoard-Users";
import DashBoardConfig from "./DashBoard-Config";
import DashBoardStadisticRepo from "./DashBoard-StadisticRepo";
import "../../css/dashBoard.css";
import DashBoardContact from "./DashBoard-Contact";
import DashBoardNosotrosConfig from "./DashBoard-NosotrosConfig";
import DashboardNoticiasCPLI from "./Dashboard-NoticiasCPLI";
import RolValidation from "../../logic/RolValidation";
import DashboardDidactica from "./Dashboard-Didactica";

///config tab panel
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
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100vh",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const DashBoard = (props) => {
  //useLocation & useHistory
  const location = useLocation();
  const history = useHistory();

  //useStyles
  const classes = useStyles();

  //useState

  const [redirect, setRedirect] = useState(false);
  const [valueTab, setValueTab] = useState(0);

  //useContext

  //useEffect

  //variables

  //functions
  const handleChange = (event, newValueTab) => {
    setValueTab(newValueTab);
  };

  return (
    <div className="row m-0">
      <Header />
      <NavbarApp />
      {redirect === true ? <Redirect to="/poas" /> : ""}
      <div id="DashBoard" className="col-12 mt-1">
        <form className="row card-body" id="formDashBoard">
          <div className="col-12 d-flex justify-content-between mt-1 align-items-center">
            <h3 className="m-0">Panel de control</h3>
          </div>
          <hr className="d-flex justify-content-between mt-1 align-items-center divisor"></hr>
          <div className={classes.root + " col-12 d-flex"}>
            <div className="col-2">
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
                {RolValidation([7, 8]) === true ? (
                  <Tab
                    icon={<PeopleAlt />}
                    label="USUARIOS"
                    {...a11yProps(0)}
                  />
                ) : (
                  <Tab
                    disabled={true}
                    icon={<PeopleAlt />}
                    label="USUARIOS"
                    {...a11yProps(0)}
                  />
                )}
                {RolValidation([7, 8]) === true ? (
                  <Tab
                    icon={<Security />}
                    label="REGISTROS DE CONTACTO"
                    {...a11yProps(1)}
                  />
                ) : (
                  <Tab
                    disabled={true}
                    icon={<Security />}
                    label="REGISTROS DE CONTACTO"
                    {...a11yProps(1)}
                  />
                )}
                {RolValidation([4, 6, 7, 8]) === true ? (
                  <Tab
                    icon={<Timelapse />}
                    label="NOSOTROS"
                    {...a11yProps(2)}
                  />
                ) : (
                  <Tab
                    disabled={true}
                    icon={<Timelapse />}
                    label="NOSOTROS"
                    {...a11yProps(2)}
                  />
                )}
                {RolValidation([5, 6, 7, 8]) === true ? (
                  <Tab
                    icon={<Receipt />}
                    label="NOTICIAS CPLI"
                    {...a11yProps(3)}
                  />
                ) : (
                  <Tab
                    disabled={true}
                    icon={<Receipt />}
                    label="NOTICIAS CPLI"
                    {...a11yProps(3)}
                  />
                )}
                {RolValidation([3, 4, 7, 8]) === true ? (
                  <Tab
                    icon={<PermMedia />}
                    label="DIDACTICA"
                    {...a11yProps(4)}
                  />
                ) : (
                  <Tab
                    disabled={true}
                    icon={<PermMedia />}
                    label="DIDACTICA"
                    {...a11yProps(4)}
                  />
                )}
                {/* {RolValidation([7,8])===true
                                    ?   <Tab icon={<BarChart />} label="ESTADÍSTICAS & REPORTES" {...a11yProps(4)} />
                                    :   <Tab disabled={true} icon={<BarChart />} label="ESTADÍSTICAS & REPORTES" {...a11yProps(4)} />  
                                }
                                {RolValidation([7,8])===true
                                    ?   <Tab icon={<Build />} label="CONFIGURACIONES" {...a11yProps(5)} />
                                    :   <Tab disabled={true} icon={<Build />} label="CONFIGURACIONES" {...a11yProps(5)} />
                                }     */}
              </Tabs>
            </div>
            <div className="col-10">
              <TabPanel value={valueTab} index={0}>
                {" "}
                {/* USUARIOS*/}
                <div className="row d-flex- justify-content-between">
                  <DashBoardUsers />
                </div>
              </TabPanel>
              <TabPanel value={valueTab} index={1}>
                {/* FORMULARIOS DE CONTACTO */}
                <div className="row d-flex- justify-content-between">
                  <DashBoardContact />
                </div>
              </TabPanel>
              <TabPanel value={valueTab} index={2}>
                {/* NOSOTROS */}
                <div className="row d-flex- justify-content-between">
                  <DashBoardNosotrosConfig />
                </div>
              </TabPanel>
              <TabPanel value={valueTab} index={3}>
                {/* NOTICIAS CPLI */}
                <div className="row d-flex- justify-content-between">
                  <DashboardNoticiasCPLI />
                </div>
              </TabPanel>
              <TabPanel value={valueTab} index={4}>
                {/* DIDACTICA */}
                <div className="row d-flex- justify-content-between">
                  <DashboardDidactica />
                </div>
              </TabPanel>
              <TabPanel value={valueTab} index={5}>
                {/* ESTADÍSTICAS & REPORTES */}
                <div className="row d-flex- justify-content-between">
                  <DashBoardStadisticRepo />
                </div>
              </TabPanel>
              <TabPanel value={valueTab} index={6}>
                {/* CONFIGURACIONES */}
                <div className="row d-flex- justify-content-between">
                  <DashBoardConfig />
                </div>
              </TabPanel>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashBoard;
