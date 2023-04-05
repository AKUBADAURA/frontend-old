import React, { useContext, useEffect, useState } from 'react';
import { faAddressCard, faBars, faCalendarAlt, faChevronRight, faDoorOpen, faEnvelopeOpenText, faExternalLinkAlt, faEye, faFilePdf, faFileSignature, faHome, faLink, faNewspaper, faPhotoVideo, faSpinner, faTimes, faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Link, Redirect, useHistory } from 'react-router-dom';
import '../../css/home.css';
import { Button, CircularProgress } from '@material-ui/core';
import { AuthContext } from '../../auth/AuthContext';
import Alert from '../../logic/Alert';
import MenuSomos from './MenuSomos';
import RolValidation from '../../logic/RolValidation';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { GridSaveAltIcon } from '@material-ui/data-grid';

import { typesCredentialsForgetPass, types, typesAlertElement, typesUserLogin, typesUserRegister } from '../../types/types';
import NavBarAppToolTip from './NavBarApp-Tooltip';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

//export default function NavbarApp({ history }) {
export default function NavbarApp(props) {

    //usestyles
    const classes = useStyles();

    // vars & const
    let config;
    let userResponseRegister;
    let responseLogin;
    let responseOwnerId;
    let perfil;
    const url = process.env.REACT_APP_BACKEND_API_URL

    //useContext
    //const { user:{ name, email }, dispatch } = useContext(AuthContext);
    const { user, dispatch } = useContext(AuthContext);


    ///useHistory
    const history = useHistory();


    //UseState 
    const [openModalForgetPass, setOpenModalForgetPass] = useState(false);
    const [alertElement, setAlertElement] = useState(typesAlertElement)
    const [loginState, setloginState] = useState('close') //can be close - open - login or register - logged
    const [userRegister, setUserRegister] = useState(typesUserRegister)
    const [credentialsForgetPass, setCredentialsForgetPass] = useState(typesCredentialsForgetPass)
    const [userLogin, setUserLogin] = useState(typesUserLogin)
    const [redirect, setRedirect] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const timer = setTimeout(
            function () {
                setAlertElement({
                    ...alertElement,
                    'state': false
                });
            }, 6000);

        return () => {
            clearTimeout(timer)
        }

    }, [alertElement.state === true])

    useEffect(() => {
        if (props.origin) {
            if (props.origin.from === "emailVerified") {
                //toogleMenu()
                //setloginState('open')
                setloginState('login')
            }
        }
    }, [])

    //functions
    const handleOpenModalForgetPass = () => {
        setOpenModalForgetPass(true);
    };

    const handleCloseModalForgetPass = () => {
        setOpenModalForgetPass(false);
    };

    const toogleMenu = () => {
        if (localStorage.getItem('JWT')) {
            loginState === 'close' ? setloginState('logged') : setloginState('close')
        }
        else {
            loginState === 'close' ? setloginState('open') : setloginState('close')
        }
    }
    const toogleView = (typeView) => {
        if (typeView === 'login') {
            setloginState(typeView)
        }
        else if (typeView === 'register') {
            setloginState(typeView)
        }
        else if (typeView === 'open') {
            setloginState(typeView)
        }
        else {

        }
    }
    const ValidateEmail = (email) => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return (true)
        }
        setAlertElement({ state: true, severity: 'warning', message: 'Debe diligenciar un correo electrónico válido', time: 6000 })
        //alert('Debe diligenciar un correo electrónico válido')
        return (false)
    }
    const validatePassword = (password) => {
        if (password.length >= 8) {
            let mayuscula = false;
            let minuscula = false;
            let numero = false;
            let caracter_raro = false;

            for (var i = 0; i < password.length; i++) {
                if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
                    mayuscula = true;
                }
                else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
                    minuscula = true;
                }
                else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
                    numero = true;
                }
                else {
                    caracter_raro = true;
                }
            }
            if (mayuscula === true && minuscula === true && caracter_raro === true && numero === true) {
                return true;
            }
        }
        setAlertElement({ state: true, severity: 'warning', message: 'La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales', time: 6000 })
        //alert('La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales');
        return false;
    }
    const statusResponseRegister = (response) => {
        if (response.status === 200) {
            setAlertElement({ state: true, severity: 'success', message: 'Bienvenido, Se ha registrado su cuenta de manera exitosa. Un email de verificación ha sido enviado a su bandeja de entrada para confirmar la cuenta antes de poder ingresar al sistema.', time: 10000 })
            //alert('Bienvenido, haz registrado tus datos en el portal de manera correcta')
        }
        else if (response.status === 422) {
            setAlertElement({ state: true, severity: 'warning', message: 'Ya existe una cuenta asociada a tu email en la plataforma', time: 6000 })
            //alert('Ya existe una cuenta asociada a tu email en la plataforma')
            setLoading(false)
            return
        }
        else if (response.status === 500) {
            setAlertElement({ state: true, severity: 'warning', message: 'Se presentó un error al registrar sus datos, inténtelo de nuevo por favor.', time: 6000 })
            //alert('Ya existe una cuenta asociada a tu email en la plataforma')
            setLoading(false)
            return
        }
        else {
            setLoading(false)
            return
        }
    }
    const statusResponseLogin = async (response) => {
        console.log('response login: ', response)
        if (response.status === 200) {
            localStorage.setItem('JWT', response.data.token)
            //localStorage.setItem('user', JSON.stringify(parseJwt(response.data.token)))
            //setuser(parseJwt(response.data.token))
            config = { headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` } }
            setloginState('logged')
            await getRol()
            handleLogin()
        }
        if (response.status === 422) {
            setAlertElement({ state: true, severity: 'warning', message: 'La contraseña debe ser de al menos 8 caracteres', time: 6000 })
            //alert('la contraseña debe ser de al menos 8 caracteres')
        }
        if (response.status === 401) {
            setAlertElement({ state: true, severity: 'warning', message: 'Email o contraseña inválidos', time: 9000 })
            //alert('Email o contraseña inválidos')
        }
        if (response.status === 412) {
            setAlertElement({ state: true, severity: 'warning', message: "No es posible iniciar sesión hasta validar el correo electrónico.", time: 9000 })
        }
        if (response.status === 413) {
            setAlertElement({ state: true, severity: 'warning', message: 'No es posible iniciar sesión debido a que su contraseña tiene más de un mes de antiguedad, debe reestablecer su contraseña.', time: 9000 })
            setOpenModalForgetPass(true)
            setloginState('close')
        }
        else {

        }
    }
    const registerUser = async (e) => {
        e.preventDefault();
        //validaciones 
        if (userRegister.emailRegister === '') {
            alert('debe diligenciar un correo electrónico')
            return
        }
        if (ValidateEmail(userRegister.emailRegister) === false) {
            return
        }
        if (!userRegister.passwordRegister) {
            setAlertElement({ state: true, severity: 'warning', message: 'Debe diligenciar una contraseña', time: 6000 })
            //alert('debe diligenciar una contraseña')

            return
        }
        if (!userRegister.repeatPasswordRegister) {
            setAlertElement({ state: true, severity: 'warning', message: 'Debe repetir la contraseña', time: 6000 })
            //alert('debe repetir la contraseña')
            return
        }
        if (userRegister.passwordRegister !== userRegister.repeatPasswordRegister) {
            setAlertElement({ state: true, severity: 'warning', message: 'Las contraseñas deben ser iguales', time: 6000 })
            //alert('las contraseñas deben ser iguales')
            return
        }
        if (validatePassword(userRegister.passwordRegister) === false) {
            return
        }
        // //post API  
        setLoading(true)
        await postRegister()
        //await postLogin('register')            
        //await postProfileRegister(userResponseRegister.data.email, userResponseRegister.data.id)



    }
    const loginUser = async (e) => {
        e.preventDefault();

        if (ValidateEmail(userLogin.emailLogin) === false) {
            return
        }

        if (userLogin.emailLogin === '') {
            setAlertElement({ state: true, severity: 'warning', message: 'Debe diligenciar un correo electrónico', time: 6000 })
            //alert('debe diligenciar un correo electrónico')
            return
        }

        if (!userLogin.passwordLogin) {
            setAlertElement({ state: true, severity: 'warning', message: 'Debe diligenciar una contraseña', time: 6000 })
            //alert('debe diligenciar una contraseña')
            return
        }
        setLoading(true)
        await postLogin('login')

    }
    const logoutUser = (e) => {
        e.preventDefault();
        setloginState('close')
        localStorage.removeItem('JWT')
        handleLogout()
        setRedirect(true)
    }
    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };
    const handleChangeRegister = (e) => {
        e.persist();
        setUserRegister({
            ...userRegister,
            [e.target.name]: e.target.value
        })
        console.log(userRegister)
    }
    const handleChangeLogin = (e) => {
        e.persist();
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }
    const postRegister = async () => {
        try {
            userResponseRegister = await axios.post(`${url}/signup`, {
                email: userRegister.emailRegister,
                password: userRegister.passwordRegister
            })
            statusResponseRegister(userResponseRegister)
            setUserRegister(typesUserRegister)
            setloginState('close')
            setLoading(false)
            //Alert('Se ha registrado su cuenta de manera exitosa. Un email de verificación ha sido enviado antes de poder ingresar al sistema.')
        }
        catch (error) {
            // Handle error.      
            statusResponseRegister(error.response)
            console.log('An error occurred:', error.response)
        }
    }
    const postProfileRegister = async (email, id) => {
        console.log('inside profile function post')
        try {
            await axios.post(`${url}/perfil`, {
                id: id,
                email: email,
                userId: id,
            }, config)
            console.log('postProfileRegister ok')
        }
        catch (error) {
            console.log('An error occurred:', error.response)
            setLoading(false)
        }
        setLoading(false)
    }
    const getRol = async () => {
        console.log('en function getrol')
        try {
            responseOwnerId = await axios.get(`${url}/whoAmI`, config)
            console.log('responseOwnerId: ', responseOwnerId)
            perfil = await axios.get(`${url}/perfil/${responseOwnerId.data}`, config)
            console.log('perfil: ', perfil)
        }
        catch (error) {
            console.log('An error occurred:', error.response)
            setLoading(false)
        }

    }
    const postLogin = async (origin) => {
        try {
            responseLogin = await axios.post(`${url}/users/login`, {
                email: (origin === 'register' ? userRegister.emailRegister : userLogin.emailLogin),
                password: (origin === 'register' ? userRegister.passwordRegister : userLogin.passwordLogin)
            })

            statusResponseLogin(responseLogin)
            setLoading(false)
        }
        catch (error) {
            statusResponseLogin(error.response)
            console.log('An error occurred:', error.response);
            setLoading(false)
        }
    }

    const handleLogin = () => {
        const lastPath = localStorage.getItem('lastPath') || '/';
        dispatch({
            type: types.login,
            payload: {
                name: '',
                email: userLogin.emailLogin ? userLogin.emailLogin : userRegister.emailRegister,
                rol: perfil.data.rol
            }
        });
        history.replace(lastPath);
    }
    const handleLogout = () => {

        history.replace('/home');

        dispatch({
            type: types.logout
        });
    }

    const handleChangeCredentials = (e) => {
        e.persist();
        console.log('credentialsForgetPass: ', credentialsForgetPass)
        setCredentialsForgetPass({
            ...credentialsForgetPass, [e.target.name]: e.target.value
        })
    }
    const saveChangeCredentials = async (e) => {
        //e.persist()
        try {
            const responseResetPass = await axios.post(`${url}/reset-password/init`, {
                email: credentialsForgetPass.email
            }, config)
            console.log('responseResetPass: ', responseResetPass)
            handleCloseModalForgetPass()
            alert('Verifique su correo y siga las instrucciones')
        }
        catch (error) {
            alert(error.response.data.error.message)
            console.log('error: ', error.response.data.error.message)
        }
        setCredentialsForgetPass(typesCredentialsForgetPass)


    }

    const forgetPass = () => {
        setloginState('close')
        handleOpenModalForgetPass()

    }



    //code to render___________________________________________________________________________________________________
    const Menu =
        <div className="menuOpen d-flex flex-column justify-content-center">
            <div className="row d-flex justify-content-center align-items-center m-0 mb-3 mt-2">
                <div className="profilePhoto d-flex justify-content-center align-items-center">
                    <img className="w-75" src="/img/userLogoB.png" alt="" />
                </div>
            </div>
            <div className="row m-0 d-flex">
                <button onClick={() => { toogleView('login') }} className="col-12 btn"><span>INICIAR SESIÓN</span></button>
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <hr className="separadores " /><span className="middleSeparadores">ó</span><hr className=" separadores" />
                </div>
                <button onClick={() => { toogleView('register') }} className="col-12 btn"><span>REGÍSTRATE</span></button>
            </div>
        </div>

    const Login =
        <div className="menuOpenSignIn d-flex flex-column justify-content-top">
            <div className="row d-flex justify-content-center align-items-center m-0 mb-3 mt-2">
                <div className="profilePhoto d-flex justify-content-center align-items-center">
                    <img className="w-75" src="/img/userLogoB.png" alt="" />
                </div>
            </div>
            <div className="row m-0 d-flex h-100 align-items-center flex-row justify-content-center">
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <hr className="separadores" /><span className="middleSeparadores">INICIAR SESIÓN</span><hr className="separadores" />
                </div>
                <form className="col-12 d-flex flex-column align-items-center">
                    <input type="text" className="fadeIn second mb-1" id="emailLogin" name="emailLogin" placeholder="E-mail" value={userLogin ? userLogin.emailLogin : ''} onChange={handleChangeLogin} />
                    <input type="password" className="fadeIn third mb-1" id="passwordLogin" placeholder="Contraseña" name="passwordLogin" value={userLogin ? userLogin.passwordRegister : ''} onChange={handleChangeLogin} />
                    {/* <input type="submit" className="fadeIn fourth mb-1" onClick={loginUser} /> */}
                    <div className="d-flex row justify-content-between align-items-center">
                        <Button className="mt-2 mb-1 d-flex justify-content-center align-items-center" onClick={loginUser} variant="outlined" size="medium" color="primary">Ingresar</Button>
                        {loading === true
                            ? (<CircularProgress color="secondary" />)
                            : ('')
                        }
                    </div>
                </form>
                <div id="formFooter">
                    <span
                        style={{ cursor: "pointer" }}
                        className="underlineHover"
                        onClick={forgetPass}
                    >
                        ¿Olvidaste tu contraseña?
                    </span>
                </div>
            </div>
        </div>

    const Register =
        <div className="menuOpenRegister d-flex flex-column justify-content-top">
            <div className="row d-flex justify-content-center align-items-center m-0 mb-0 mt-2">
                <div className="profilePhoto d-flex justify-content-center align-items-center">
                    <img className="w-75" src="/img/userLogoB.png" alt="" />
                </div>
            </div>
            <div className="row m-0 d-flex h-100 align-items-center flex-row justify-content-center">
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <hr className="separadores" /><span className="middleSeparadores">REGÍSTRATE</span><hr className="separadores" />
                </div>
                <form className="col-12 d-flex flex-column align-items-center">
                    <input type="text" className="fadeIn second mb-1" id="emailRegister" name="emailRegister" placeholder="E-mail" value={userRegister ? userRegister.emailRegister : ''} onChange={handleChangeRegister} />
                    <input type="password" className="fadeIn third mb-1" id="passwordRegister" placeholder="Contraseña" name="passwordRegister" value={userRegister ? userRegister.passwordRegister : ''} onChange={handleChangeRegister} />
                    <input type="password" className="fadeIn third mb-1" id="repeatPasswordRegister" placeholder="Repetir contraseña" name="repeatPasswordRegister" value={userRegister ? userRegister.repeatPasswordRegister : ''} onChange={handleChangeRegister} />
                    {/* <input type="submit" className="fadeIn fourth mb-1" onClick={registerUser} /> */}
                    <Button className="mt-2 mb-1 d-flex justify-content-center align-items-center" onClick={registerUser} variant="outlined" size="medium" color="primary">Registrarse</Button>
                    {loading === true
                        ? (<CircularProgress color="secondary" />)
                        : ('')
                    }
                </form>
            </div>
        </div>

    const Logged =
        <div className="menuOpen d-flex flex-column justify-content-top">
            <div className="row d-flex justify-content-center align-items-center m-0 mb-3 mt-2">
                <div className="profilePhoto d-flex justify-content-center align-items-center">
                    <img className="w-75" src="/img/userLogoB.png" alt="" />
                </div>
                <div className="col-7">
                    <span>¡Hola!</span>
                </div>
            </div>
            <div className="row m-0 d-flex">
                {RolValidation([1, 2, 3, 4, 5, 6, 7, 8]) ? <Link onClick={() => setloginState('close')} to="/perfil" className="col-12 itemLogged"><FontAwesomeIcon icon={faAddressCard} /><span> Perfil</span><FontAwesomeIcon icon={faChevronRight} /></Link> : ''}
                {RolValidation([4, 6, 7, 8]) ? <Link onClick={() => setloginState('close')} to="/calendario" className="col-12 itemLogged"><FontAwesomeIcon icon={faCalendarAlt} /><span> Agenda</span><FontAwesomeIcon icon={faChevronRight} /></Link> : ''}
                {RolValidation([1, 2, 3, 4, 5, 6, 7, 8]) ? <Link onClick={() => setloginState('close')} to="/observancia" className="col-12 itemLogged"><FontAwesomeIcon icon={faEye} /><span> Lista de Observancia</span><FontAwesomeIcon icon={faChevronRight} /></Link> : ''}
                {RolValidation([2, 3, 4, 5, 6, 7, 8]) ? <Link onClick={() => setloginState('close')} to="/mensajeria" className="col-12 itemLogged"><FontAwesomeIcon icon={faEnvelopeOpenText} /><span> Mensajería Interna</span><FontAwesomeIcon icon={faChevronRight} /></Link> : ''}
                {RolValidation([1, 2, 3, 4, 5, 6, 7, 8]) ? <Link onClick={() => setloginState('close')} to="/escribanos" className="col-12 itemLogged"><FontAwesomeIcon icon={faFileSignature} /><span> Escríbanos</span><FontAwesomeIcon icon={faChevronRight} /></Link> : ''}
                <Link onClick={logoutUser} to="/home" className="col-12 itemLogged"><FontAwesomeIcon icon={faDoorOpen} /><span> Salir</span><FontAwesomeIcon icon={faChevronRight} /></Link>
            </div>
        </div>

    return (
        <>
            {/* -----------------------------BARRA NAV ---------------------------------------------- */}

            <nav className="col-12 p-0 navbar navbar-expand-md navbar-light d-flex justify-content-between" id="menuItems">
                {redirect === true ? (<Redirect to='/' />) : ('')}
                <div className="col-8 col-sm-10 navbar-nav d-flex justify-content-around flex-row">
                    <a href="https://akubadaura.org" target="_blank" rel="noreferrer" className="itemsNav nav-link nav-item"><FontAwesomeIcon icon={faExternalLinkAlt} /><span className="titleNavBar"> AKUBADAURA</span></a>
                    <NavLink onClick={() => setloginState('close')} to="/" className="itemsNav nav-link nav-item"><FontAwesomeIcon icon={faHome} /><span className="titleNavBar"> SNICPLI</span></NavLink>
                    <NavLink onClick={() => setloginState('close')} to="/noticias-cpli" className="itemsNav nav-link nav-item" > <FontAwesomeIcon icon={faNewspaper} /><span className="titleNavBar"> NOTICIAS CPLI</span></NavLink>
                    <NavBarAppToolTip
                        children={
                            <NavLink onClick={() => setloginState('close')} to="/poas" className="itemsNav nav-link nav-item"><FontAwesomeIcon icon={faSpinner} /><span className="titleNavBar"> PROGRAMAS, OBRAS Y ACTIVIDADES</span></NavLink>
                        }
                        text={"Encontrará información de iniciativas públicas o privadas que deben tener consulta previa."}
                    />
                    <MenuSomos className="itemsNav nav-link nav-item" onClick={() => setloginState('close')} />
                    {localStorage.getItem('JWT') ? '' : <NavLink onClick={() => setloginState('close')} to="/escribanos" className="itemsNav nav-link nav-item"><FontAwesomeIcon icon={faFileSignature} /><span className="titleNavBar"> ESCRÍBANOS</span></NavLink>}
                    {RolValidation([4, 5, 6, 7, 8])
                        ? <NavLink onClick={() => setloginState('close')} to="/dashboard" className="itemsNav nav-link nav-item"><FontAwesomeIcon icon={faTools} /><span className="titleNavBar"> PANEL DE CONTROL</span></NavLink>
                        : ''
                    }
                    <NavBarAppToolTip
                        children={
                            <NavLink onClick={() => setloginState('close')} to="/boletines-reportes" className="itemsNav nav-link nav-item"><FontAwesomeIcon icon={faFilePdf} /><span className="titleNavBar"> BOLETINES & REPORTES</span></NavLink>
                        }
                        text={'Cruza información de consultas previas por departamentos, municipios o comunidades.'}
                    />
                    <NavLink onClick={() => setloginState('close')} to="/didactica" className="itemsNav nav-link nav-item"><FontAwesomeIcon icon={faPhotoVideo} /><span className="titleNavBar"> DIDACTICA</span></NavLink>
                </div>
                <div className="col-1">
                    <button onClick={toogleMenu} id="menuIcon" className="btn nav-link nav-item">{loginState === "close" ? (<FontAwesomeIcon icon={faBars} />) : (<FontAwesomeIcon icon={faTimes} />)}</button>
                </div>
                {loginState === "open" ? Menu : ''}
                {loginState === "login" ? Login : ''}
                {loginState === 'register' ? Register : ''}
                {loginState === 'logged' ? Logged : ''}
            </nav>
            {/* -----------------------------MODAL FORGET PASS  ------------------------------------------------- */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModalForgetPass}
                onClose={handleCloseModalForgetPass}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalForgetPass}>
                    <div className={classes.paper}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                alt="header reset key"
                                className="w-100"
                                image={process.env.PUBLIC_URL + '/img/header-reset-key.png'}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Restablecimiento de contraseña
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Para verificar su identidad le enviaremos un email
                                    con un link donde podrá actualizar su contraseña. Por favor digite su correo electrónico
                                    a continuación:
                                </Typography>
                                <TextField
                                    className="w-100"
                                    label="Ingrese el e-mail"
                                    onChange={handleChangeCredentials}
                                    name="email"
                                    value={credentialsForgetPass.email ? credentialsForgetPass.email : ''}
                                    required
                                    id="outlined-required"
                                />
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    startIcon={<GridSaveAltIcon />}
                                    onClick={saveChangeCredentials}
                                >
                                    Confirmar Email
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                </Fade>
            </Modal>

            {/* -----------------------------ALERTAS ------------------------------------------------- */}


            {/* {alertElement.state===true? (<Alert severity={alertElement.severity} message={alertElement.message} time={alertElement.time?alertElement.time:6000}/>):('')} */}
            <Alert
                state={alertElement.state}
                severity={alertElement.severity}
                message={alertElement.message}
                time={alertElement.time ? alertElement.time : 6000}
            />

        </>
    )
}





