import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import NavbarApp from '../NavBar/NavbarApp'
import Button from '@material-ui/core/Button';
import CallMadeIcon from '@material-ui/icons/CallMade';

const Historia = () => {

    //Vars and const
    const url = process.env.REACT_APP_BACKEND_API_URL

    //useState
    const [historia, setHistoria] = useState('')

    //useEffect
    useEffect(() => {
        getHistoria()
    }, []);

    useEffect(() => {
        console.log(historia)
    }, [historia]);


    //functions 
    const getHistoria = async () => {
        try {
            const response = await axios.get(`${url}/nosotros/historia`)
            setHistoria(response.data)
        }
        catch (error) {
            console.log(error.response)
        }
    }


    return (
        <div className="row m-0">
            <Header />
            <NavbarApp />
            <div id="" className="row mt-4 w-100">
                <form className="container card-body" id="formPOAcreate">
                    <div className="row d-flex- justify-content-between mx-4">
                        <div className="col-12 d-flex justify-content-between mx-2 mt-5 align-items-center">
                            <h3 className="m-0">Historia</h3>
                        </div>
                        <hr className="d-flex justify-content-between mt-5 align-items-center divisor"></hr>
                        <div className="col-12 ">
                            <div dangerouslySetInnerHTML={{ __html: historia.descripcion }}></div>
                            <a href="https://akubadaura.org/" target="_blank" rel="noopener noreferrer">
                                <Button color="primary" variant="outlined" startIcon={<CallMadeIcon />}>
                                    Más Información
                                </Button>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Historia
