import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import NavbarApp from '../NavBar/NavbarApp'

const PreguntasFrecuentes = () => {

    //Vars and const
    const url= process.env.REACT_APP_BACKEND_API_URL

    //useState
    const [preguntasFrecuentes, setPreguntasFrecuentes] = useState('')

    //useEffect
    useEffect(() => {
        getPreguntasFrecuentes()            
    }, []);     

    useEffect(() => {
        console.log(preguntasFrecuentes)            
    }, [preguntasFrecuentes]);


    //functions 
    const getPreguntasFrecuentes= async ()=> {
        try {
            const response = await axios.get(`${url}/nosotros/preguntasFrecuentes`)
            setPreguntasFrecuentes(response.data)
        }
        catch (error) {
            console.log(error.response)
        }    
    } 
    return (
        <div className="row m-0">
            <Header />
            <NavbarApp />
            <div id="Profile" className="row mt-4 w-100">
                <form className="container card-body" id="formPOAcreate">
                    <div className="row d-flex- justify-content-between mx-4">
                        <div className="col-12 d-flex justify-content-between mx-2 mt-5 align-items-center">
                            <h3 className="m-0">Preguntas Frecuentes</h3>
                        </div>
                        <hr className="d-flex justify-content-between mt-5 align-items-center divisor"></hr>                            
                        <div className="col-12 ">
                            <div dangerouslySetInnerHTML={ { __html: preguntasFrecuentes.descripcion } }></div>                          
                        </div>
                    </div>
                </form>
            </div>                    
        </div>
     )
}

export default PreguntasFrecuentes
