import React, { useEffect,  useState } from 'react'
import { useParams } from "react-router";

import { Redirect } from "react-router-dom";
import Plantilla from '../ui/plantilla';
import SaveIcon from '@material-ui/icons/Save';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { typesResetPassword } from '../../types/types';


const ResetPassword = () => {

    //use params

    const { resetKey } = useParams()   
    
    
    //vars and const 
    const url = process.env.REACT_APP_BACKEND_API_URL
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }
    //useContext
    //useState
    const [password, setPassword] = useState(typesResetPassword)

    const [redirect, setRedirect] = useState()
    //useEffect
    useEffect(() => {

        //condicional si viene con reset key en url
        if (resetKey) {
            console.log('el reset key es: ' + resetKey)
            setPassword({
                ...password, 'resetKey': resetKey
            })
        }
        else {
            setRedirect(true)
        }
    }, []);

    useEffect(() => {
        console.log('password: ', password)
    }, [password])


    //functions

    const handleChangePassword = (e) => {
        e.persist();
        setPassword({
            ...password, [e.target.name]: e.target.value
        })
    }
    const savePassword = async(e)=> {
        e.persist()
        try {
            const responseResetPass = await axios.put(`${url}/reset-password/finish`, {
                resetKey: password.resetKey,
                password:password.password,
                confirmPassword: password.confirmPassword
            }, config)
            console.log('responseResetPass: ', responseResetPass)
            setRedirect(true)
            alert('la contraseña se cambió satisfactoriamente')
        }
        catch (error) {
            alert('No es posible cambiar la contraseña en estos momentos. ' + error.response.data.error.message + '. Si persiste el problema comuníquese con nosotros.')
            console.log('error: ', error.response)
        }


    }

    return (<>
        {redirect === true
            ? <Redirect to="/home" />
            : ''
        }
        <Plantilla title={'Restablecer contraseña'} navBar={true} className="d-flex justify-content-center align-items-center">
            <Card sx={{ maxWidth: 345 }} className="container">
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
                        Por favor digite su nueva contraseña, es importante que esta tenga una longitud mínima de 8 caracteres,
                        una combinación de letras minúsculas, mayúsculas, números y caracteres especiales. Recuerde tomar las
                        precauciones de seguridad debidas.
                    </Typography>
                    <TextField
                        className="w-100"
                        type="password"
                        label="Nueva contraseña"
                        onChange={handleChangePassword}
                        name="password"
                        value={password.password ? password.password : ''}
                        id="outlined-password-input"
                    />
                    <br></br>
                    <br></br>
                    <TextField
                        className="w-100"
                        type="password"
                        id="outlined-password-input"
                        label="Repita la nueva contraseña"
                        onChange={handleChangePassword}
                        name="confirmPassword"
                        value={password.confirmPassword ? password.confirmPassword : ''}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        startIcon={<SaveIcon />}
                        onClick={savePassword}
                    >
                        Guardar contraseña
                    </Button>
                </CardActions>
            </Card>

        </Plantilla>
    </>
    )
}

export default ResetPassword
