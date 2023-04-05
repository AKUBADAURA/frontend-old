import React, { useEffect,  useState } from 'react'
import { useParams } from "react-router";

import { Redirect } from "react-router-dom";
import Plantilla from '../ui/plantilla';
import SaveIcon from '@material-ui/icons/Save';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { typesEmailVerified } from '../../types/types';


const EmailVerified = () => {

    //use params

    const { emailVerifiedKey } = useParams()   
    
    
    //vars and const 

    const url = process.env.REACT_APP_BACKEND_API_URL
    let config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }
    //useContext
    //useState
    const [emailVerified, setEmailVerified] = useState(typesEmailVerified)

    const [redirect, setRedirect] = useState()
    //useEffect
    useEffect(async () => {

        //condicional si viene con reset key en url
        if (emailVerifiedKey) {
            setEmailVerified({
                ...emailVerified, 'emailVerifiedKey': emailVerifiedKey
            })
            await saveEmailVerified(emailVerifiedKey)
        }
        else {
            setRedirect(true)
        }
    }, []);

    useEffect(() => {
        console.log('emailVerified: ', emailVerified)
    }, [emailVerified])


    //functions

    const saveEmailVerified = async(key)=> {

        try {
            const response = await axios.put(`${url}/email-verified`, {
                emailVerifiedKey:key
            }, config)
            //setRedirect(true)
            alert('La cuenta fue verificada con éxito')
        }
        catch (error) {
            setRedirect(true)
            alert('No es posible verificar su cuenta. ' + error.response.data.error.message + ' Si persiste el problema comuníquese con nosotros.')
            console.log('error: ', error.response)
        }


    }

    return (<>
        {redirect === true
            ? <Redirect to= {{
                pathname: "/home", 
                state: {from:'emailVerified'}
            }} />
            : ''
        }
        <Plantilla title={'Verificación de correo electrónico'} navBar={true} className="d-flex justify-content-center align-items-center">
            <Card sx={{ maxWidth: 345 }} className="container">
                <CardMedia
                    component="img"
                    alt="header reset key"
                    className="w-100"
                    image={process.env.PUBLIC_URL + '/img/header-reset-key.png'}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        ¡Verificación realizada con éxito!
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Su cuenta ha sido verificada exitosamente, ya puede hacer uso de su cuenta en el SNICPLI de Akubadaura.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        startIcon={<SaveIcon />}
                        onClick={()=>setRedirect(true)}
                    >
                        Ir a la vista principal.
                    </Button>
                </CardActions>
            </Card>

        </Plantilla>
    </>
    )
}

export default EmailVerified
