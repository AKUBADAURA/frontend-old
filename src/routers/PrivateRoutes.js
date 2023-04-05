import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import POAcreate from '../components/ApartadosInformacion/POA/POAcreate';
import POAedit from '../components/ApartadosInformacion/POA/POAedit';
import DashBoard from '../components/DashBoard/DashBoard';
import Profile from '../components/profile/Profile';
import CalendarApp from '../components/calendar/calendarApp';
import Observancia from '../components/Observancia/Observancia';
import Home from '../components/Home/Home';
import RolValidation from '../logic/RolValidation';
import MensajeriaIndex from '../components/mensajes/MensajeIndex';
import { MensajeriaProvider } from '../context/MensajeriaContext';

export const PrivateRoutes = () => {

    return (
        <>
            <Switch>
                {/* <Route 
                    exact path="/mensajeria" 
                    component={
                        RolValidation([2, 3, 4, 5, 6, 7, 8]) 
                        ? (MensajeriaIndex)
                        : Home
                    }
                /> */}
                <Route exact path="/mensajeria" >
                    {
                        RolValidation([2, 3, 4, 5, 6, 7, 8]) 
                        ? (<MensajeriaProvider><MensajeriaIndex/></MensajeriaProvider>)
                        : <Home />
                    }
                </Route>




                <Route exact path="/calendario" component={RolValidation([4, 6, 7, 8]) ? CalendarApp : Home} />
                <Route exact path="/observancia" component={Observancia} />
                <Route exact path="/perfil" component={Profile} />
                <Route exact path="/dashboard" component={RolValidation([4, 5, 6, 7, 8]) ? DashBoard : Home} />
                <Route exact path="/poa-create" component={RolValidation([3, 4, 7, 8]) ? POAcreate : Home} />
                <Route exact path="/poa-edit" component={RolValidation([3, 4, 7, 8]) ? POAedit : Home} />
                <Redirect to="/home" />
            </Switch>
        </>
    )
}
