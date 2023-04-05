import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

import SelectFunction from "../../logic/SelectFunction";
import Header from '../header/Header';
import NavbarApp from '../NavBar/NavbarApp';
import RadioButtonsGroup from '../../logic/RadioButtonsGroup';
import { typesFinalidadRegistro, typesNewProfile } from '../../types/types';


const Profile = () => {

    //variables
    const url = process.env.REACT_APP_BACKEND_API_URL
    let config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }
    let response, responseOwnerId;

    //useState


    const [perfil, setPerfil] = useState(typesNewProfile)


    //useContext


    //useEffect

    useEffect(() => {

        getProfile();

    }, []);

    useEffect(() => {
        console.log(perfil)
    }, [perfil])




    //functions 

    const handleChangeProfile = (e) => {
        //console.log(POA)
        e.persist();
        setPerfil({
            ...perfil, [e.target.name]: e.target.value
        })
    }
    const saveProfile = async (e) => {
        e.preventDefault();
        try {
            response = await axios.get(`${url}/whoAmI`, config)
            console.log('response who is me: ', response.data)
            await axios.patch(`${url}/perfil/${response.data}`, {
                nombres: perfil.nombres,
                fechaNacimiento: perfil.fechaNacimiento,
                sexo: perfil.sexo,
                descripcion: perfil.descripcion,
                tipoDocumento: perfil.tipoDocumento,
                documento: perfil.documento,
                telefono: perfil.telefono,
                direccion: perfil.direccion,
                departamento: perfil.departamento,
                municipio: perfil.municipio,
                fin: perfil.fin

            }, config)
            alert('Cambios almacenados con éxito')
        }
        catch (error) {
            console.log('An error occurred:', error.response);
        }
    }

    const getProfile = async () => {
        try {
            responseOwnerId = await axios.get(`${url}/whoAmI`, config)
            console.log('response id ', responseOwnerId)
            response = await axios.get(`${url}/perfil/${responseOwnerId.data}`, config)
            setPerfil(response.data)
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
                            <h3 className="m-0">Perfil</h3>
                            <Button variant="contained" color="primary" size="small" onClick={saveProfile} startIcon={<SaveIcon />}>Guardar Cambios</Button>
                        </div>
                        <hr className="d-flex justify-content-between mt-5 align-items-center divisor"></hr>
                        <div className="col-6 columnaA">
                            <div className="row d-flex justify-content-center align-items-center m-0 mb-3 mt-2">
                                <div className="profilePhoto d-flex justify-content-center align-items-center">
                                    <img className="w-75" src="/img/userLogoB.png" alt="" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 form-group">
                                    <TextField className="w-100" id="outlined-textarea" label="Nombres y Apellidos" onChange={handleChangeProfile} value={perfil.nombres ? perfil.nombres : ''} name="nombres" multiline variant="outlined" />
                                </div>
                                {/* <div className="col-12 form-group">
                                    <TextField className="w-100" id="date" type="date"  label="Fecha de Nacimiento" onChange={handleChangeProfile} value={perfil.fechaNacimiento?perfil.fechaNacimiento:''} name="fechaNacimiento"/>
                                </div>
                                <div className="col-12 form-group">
                                    <SelectFunction  
                                        nameShow="Sexo" 
                                        nameSelect="sexo" 
                                        urlSelect="sexo" 
                                        //controller="perfil" 
                                        value={perfil.sexo?perfil.sexo:''}
                                        setObject={setPerfil}
                                        object={perfil}
                                        />
                                </div> */}
                                <div className="col-12 form-group">
                                    <TextField className="w-100" id="outlined-textarea" label="Correo Electrónico" value={perfil.email ? perfil.email : ''} name="email" multiline variant="outlined" />
                                </div>
                                <div className="col-12 form-group">
                                    <TextField className="w-100" id="outlined-textarea" label="Descripción / Resumen" onChange={handleChangeProfile} value={perfil.descripcion ? perfil.descripcion : ''} name="descripcion" multiline variant="outlined" />
                                </div>
                                <div className="col-12 form-group">
                                    <TextField className="w-100" id="outlined-textarea" label="Rol" value={perfil.rol ? perfil.rol : ''} name="rol" multiline variant="outlined" />
                                </div>

                            </div>
                        </div>
                        <div className="col-6 columnaB">
                            <div className="row">
                                <div className="col-12 form-group">
                                    <RadioButtonsGroup label="¿Finalidad de acceso al SNICPLI de Akubadaura?" name="fin" options={typesFinalidadRegistro} value={perfil.fin} handleChange={handleChangeProfile} />
                                </div>
                                {/* 
                                <div className="col-12 form-group">
                                    <SelectFunction  
                                        nameShow="Tipo de Documento" 
                                        nameSelect="tipoDocumento" 
                                        urlSelect="tipo-documento" 
                                        //controller="perfil" 
                                        value={perfil.tipoDocumento?perfil.tipoDocumento:''}
                                        setObject={setPerfil}
                                        object={perfil}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <TextField className="w-100" id="outlined-textarea" label="Documento de Identidad" onChange={handleChangeProfile} value={perfil.documento?perfil.documento:''} name="documento" multiline variant="outlined"/>
                                </div>
                                <div className="col-12 form-group">
                                    <TextField className="w-100" id="outlined-textarea" label="Teléfono" onChange={handleChangeProfile} value={perfil.telefono?perfil.telefono:''} name="telefono" multiline variant="outlined"/>
                                </div>
                                <div className="col-12 form-group">
                                    <TextField className="w-100" id="outlined-textarea" label="Dirección" onChange={handleChangeProfile} value={perfil.direccion?perfil.direccion:''} name="direccion" multiline variant="outlined"/>
                                </div> 
                                <div className="col-12 form-group">
                                    <SelectFunction  
                                        nameShow="Departamento" 
                                        nameSelect="departamento" 
                                        urlSelect="departamento" 
                                        //controller="perfil" 
                                        value={perfil.departamento?perfil.departamento:''}
                                        setObject={setPerfil}
                                        object={perfil}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <SelectFunction  
                                        nameShow="Municipio" 
                                        nameSelect="municipio" 
                                        urlSelect="municipio" 
                                        //controller="perfil" 
                                        value={perfil.municipio?perfil.municipio:''}
                                        setObject={setPerfil}
                                        object={perfil}
                                        />
                                </div>  */}

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default Profile
