import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

import { PrivateRoute } from './PrivateRoute';
import { OnlyPublicRoute } from './OnlyPublicRoute';
import { PrivateRoutes } from './PrivateRoutes';

import { LoginScreen } from '../components/login/LoginScreen';

import Home from '../components/Home/Home';
import CategoriesIndex from '../components/noticias/Categories-index';
import NoticiasIndex from '../components/noticias/Noticias-index';
import Contact from '../components/contact/Contact';
import POAindexTrial from '../components/ApartadosInformacion/POA/POAindexTrial';
import POAindex from '../components/ApartadosInformacion/POA/POAindex';
import Vision from '../components/Nosotros/Vision';
import Somos from '../components/Nosotros/Somos';
import Mision from '../components/Nosotros/Mision';
import Historia from '../components/Nosotros/Historia';
import PreguntasFrecuentes from '../components/Nosotros/PreguntasFrecuentes';
import Principios from '../components/Nosotros/Principios';
import MapImplementation from '../components/ApartadosInformacion/POA/mapImplementation';
import POASeguimientoCasos from '../components/ApartadosInformacion/POA/POASeguimientoCasos';
import BoletinesReportes from '../components/BoletinesReportes/BoletinesReportes';
import Reporte from '../components/BoletinesReportes/Reporte';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import EmailVerified from '../components/emailVerified/emailVerified';
import Didactica from '../components/didactica/Didactica';



export const AppRouter = () => {
    
    const { user } = useContext(AuthContext);
    
    return (
        <Router>
            <Switch>
                <Route exact path="/didactica" component={Didactica}/>
                <Route exact path="/home" component={Home}/> 
                <Route exact path="/poa-trial" component={POAindexTrial}/>
                <Route exact path="/noticias-cpli" component={NoticiasIndex}/> 
                <Route exact path="/mapimplementation" component={MapImplementation}/>                
                <Route exact path="/escribanos" component={Contact}/>
                <Route exact path="/categoria-noticias-cpli/:id" component={CategoriesIndex}/> 
                <Route exact path="/poas" component={POAindex}/>
                <Route exact path="/poas/:idExterno" component={POAindex}/>
                <Route exact path="/somos" component={Somos}/>
                <Route exact path="/vision" component={Vision}/>
                <Route exact path="/mision" component={Mision}/>
                <Route exact path="/historia" component={Historia}/>
                <Route exact path="/preguntas-frecuentes" component={PreguntasFrecuentes}/>
                <Route exact path="/principios" component={Principios}/>
                <Route exact path="/poa-seguimiento-casos" component={POASeguimientoCasos}/>
                <Route exact path="/boletines-reportes" component={BoletinesReportes}/>
                <Route exact path="/reporte" component={Reporte}/>
                <Route exact path="/reset-password/:resetKey" component={ResetPassword}/>
                <Route exact path="/email-verified/:emailVerifiedKey" component={EmailVerified}/>
                
                <OnlyPublicRoute 
                    exact 
                    path="/login" 
                    component={ LoginScreen } 
                    isAuthenticated={ user.logged }
                />

                <PrivateRoute 
                    path="/" 
                    component={ PrivateRoutes } 
                    isAuthenticated={ user.logged }
                />
            </Switch>
        </Router>
    )
}
