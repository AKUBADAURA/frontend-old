import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DashBoardSpeedDialDetailsUser from './DashBoard-SpeedDial-DetailsUser'
import SelectMultipleFunction from '../../logic/SelectMultipleFunction';
import CustomGridPanel from '../../logic/CustomGridPanel';
import { TextField } from '@material-ui/core';
import SelectFunction from '../../logic/SelectFunction';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import validatePassword from '../../logic/validatePassword';
import { typesDetailsProfileDashboard, typesColumnsUsersDashboard } from '../../types/types';

///config Modal 

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


//config Datagrid




const DashBoardUsers = () => {

    //vars&Const
    const url = process.env.REACT_APP_BACKEND_API_URL
    let config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }

    //useState
    const [perfiles, setPerfiles] = useState([])
    const [newPass, setNewPass] = useState(false)
    const [detailsPerfil, setDetailsPerfil] = useState(typesDetailsProfileDashboard)

    const [openModalDetailsUser, setOpenModalDetailsUser] = useState(false)
    //useContext

    ///useStyles 
    const classes = useStyles();

    //useEffect
    useEffect(() => {
        getUsers()
    }, [])

    //functions


    useEffect(() => {
        if (openModalDetailsUser === false) {
            setNewPass(false)
        }
    }, [openModalDetailsUser])

    const handleChangeDetailsPerfil = (e) => {
        //console.log(newPOA)
        e.persist();
        setDetailsPerfil({
            ...detailsPerfil, [e.target.name]: e.target.value
        })

    }

    const savePass = async () => {
        if (validatePassword(detailsPerfil.newPass, detailsPerfil.repeatNewPass) === true) {
            try {
                await axios.patch(`${url}/change-pass-user/${detailsPerfil.id}`, {
                    'password': detailsPerfil.newPass
                }, config)
                alert('Contraseña cambiada con éxito')
            }
            catch (e) {
                alert('Problemas al almacenar la nueva contraseña')
                console.log(e.response)
            }
        }
    }


    const handleCloseModalDetailsUser = () => {
        setOpenModalDetailsUser(false);
    };

    const detailsUser = (GridCellParams) => {
        setDetailsPerfil(GridCellParams.row)
        setOpenModalDetailsUser(true)
    }

    const changePass = () => {
        setNewPass(true)
      }

    const getUsers = async () => {
        try {
            let responseUsers = await axios.get(`${url}/perfil?filter=%7B%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22id%22%3A%20true%2C%0A%20%20%20%20%22nombres%22%3A%20true%2C%0A%20%20%20%20%22fechaNacimiento%22%3A%20true%2C%0A%20%20%20%20%22sexo%22%3A%20true%2C%0A%20%20%20%20%22email%22%3A%20true%2C%0A%20%20%20%20%22descripcion%22%3A%20true%2C%0A%20%20%20%20%22tipoDocumento%22%3A%20true%2C%0A%20%20%20%20%22documento%22%3A%20true%2C%0A%20%20%20%20%22telefono%22%3A%20true%2C%0A%20%20%20%20%22direccion%22%3A%20true%2C%0A%20%20%20%20%22departamento%22%3A%20true%2C%0A%20%20%20%20%22municipio%22%3A%20true%2C%0A%20%20%20%20%22rol%22%3A%20true%2C%0A%20%20%20%20%22userId%22%3A%20false%0A%20%20%7D%0A%7D`, config)
            let newData = []
            responseUsers.data.map((item) => {
                let itemPrev = item
                itemPrev.rol.join(",")
                newData.push(itemPrev)
                // 'id':item.id,
                // 'email':item.email,
                // 'nombres':item.nombres,
                // 'fechaNacimiento':item.fechaNacimiento,
                // 'sexo': item.sexo,
                // 'descripcion': item.descripcion,
                // 'tipoDocumento': item.tipoDocumento,
                // 'documento': item.documento,
                // 'telefono': item.telefono,
                // 'direccion': item.direccion,
                // 'departamento': item.departamento,
                // 'municipio': item.municipio,
                // 'rol': item.rol.join(",")            
            })
            setPerfiles(newData)

            console.log('array users modify')
            console.log(newData)
        }
        catch (error) {
            console.log(error.response)
        }

    }

    const deleteUser = async (e) => {
        e.preventDefault();
        try {
            if (window.confirm("¿Estás seguro de eliminar el registro del usuario?")) {
                await axios.delete(`${url}/user/${detailsPerfil.id}`, config)
                handleCloseModalDetailsUser()
                setDetailsPerfil(typesDetailsProfileDashboard)
                await getUsers()
                alert('Usuario eliminado con éxito')
            }
        }
        catch (error) {
            alert('El usuario no pudo ser eliminado con éxito, inténtelo de nuevo')
            console.log('An error occurred:', error.response);
        }
    }

    const printUserDetails = () => {
        window.print();
    }


    const saveUser = async () => {
        //simplificar json a detalles de perfil a subir eliminando algunos datos no editables

        let detailsPerfilShort = detailsPerfil
        let id= detailsPerfilShort.id
        console.log('detailsPerfilin function: ', detailsPerfil.id);
        delete detailsPerfilShort.id
        delete detailsPerfilShort.email
        delete detailsPerfilShort.rol
        try {
            await axios.patch(`${url}/perfil/${id}`, detailsPerfilShort, config)
            setDetailsPerfil(typesDetailsProfileDashboard)
            await getUsers()
            alert('Cambios Almacenados con éxito')
        }
        catch (e) {
            alert('Problemas al guardar cambios, recargue la página por favor')
            console.log(e.response)
        }

    }

    useEffect(() => {
        console.log('detailsPerfil: ', detailsPerfil)
    }, [detailsPerfil])

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={perfiles}
                columns={typesColumnsUsersDashboard}
                pageSize={5}
                onRowDoubleClick={(GridCellParams) => detailsUser(GridCellParams)}
                components={{
                    Toolbar: GridToolbar,
                    Panel: CustomGridPanel
                }}
            />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModalDetailsUser}
                onClose={handleCloseModalDetailsUser}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalDetailsUser} id="dashBoardModalUser">
                    <div className={classes.paper}>
                        <div className="row d-flex- justify-content-between" id="modalDetailsUser" data-spy="scroll">
                            <div className="col-12 d-flex justify-content-between mx-2 align-items-center">
                                <h3 className="m-0">Detalles del Usuario</h3>
                                <DashBoardSpeedDialDetailsUser
                                    saveUser={saveUser}
                                    deleteUser={deleteUser}
                                    changePass={changePass}
                                    printUserDetails={printUserDetails}
                                />
                            </div>
                            <hr className="d-flex justify-content-between align-items-center divisor"></hr>
                            <div className="col-6 columnaA">
                                <div className="row">
                                    <div className="col-12 form-group ">
                                        <TextField
                                            disabled
                                            className="w-100"
                                            id="outlined-textarea"
                                            label="Id"
                                            //onChange={handleChangeDetailsPerfil} 
                                            name="id"
                                            value={detailsPerfil.id ? detailsPerfil.id : ''}
                                            multiline variant="outlined"
                                        />
                                    </div>
                                    <div className="col-12 form-group ">
                                        <TextField
                                            disabled
                                            className="w-100"
                                            id="outlined-textarea"
                                            label="Email"
                                            //onChange={handleChangeDetailsPerfil} 
                                            name="email"
                                            value={detailsPerfil.email ? detailsPerfil.email : ''}
                                            multiline variant="outlined"
                                        />
                                    </div>
                                    <div className="col-12 form-group ">
                                        <TextField
                                            className="w-100"
                                            id="outlined-textarea"
                                            label="Nombres"
                                            onChange={handleChangeDetailsPerfil}
                                            name="nombres"
                                            value={detailsPerfil.nombres ? detailsPerfil.nombres : ''}
                                            multiline variant="outlined"
                                        />
                                        {/* <label htmlFor="nombres">Nombres</label>
                                        <span className="form-control">{detailsPerfil.nombres?detailsPerfil.nombres:''} </span> */}
                                    </div>
                                    <div className="col-12 form-group  ">
                                        <TextField
                                            id="date"
                                            type="date"
                                            InputLabelProps={{ shrink: true, }}
                                            className="w-100"
                                            label="Fecha de Nacimiento"
                                            onChange={handleChangeDetailsPerfil}
                                            name="fechaNacimiento"
                                            value={detailsPerfil.fechaNacimiento ? detailsPerfil.fechaNacimiento : ''}
                                        />
                                    </div>
                                    <div className="col-12 form-group  ">
                                        <TextField
                                            className="w-100"
                                            id="outlined-textarea"
                                            label="Sexo"
                                            onChange={handleChangeDetailsPerfil}
                                            name="sexo"
                                            value={detailsPerfil.sexo ? detailsPerfil.sexo : ''}
                                            multiline variant="outlined"
                                        />
                                    </div>
                                    <div className="col-12 form-group  ">
                                        <TextField
                                            className="w-100"
                                            id="outlined-textarea"
                                            label="Descripción"
                                            onChange={handleChangeDetailsPerfil}
                                            name="descripcion"
                                            value={detailsPerfil.descripcion ? detailsPerfil.descripcion : ''}
                                            multiline variant="outlined"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 columnaB">
                                <div className="row">
                                    <div className="col-12 form-group ">
                                        <SelectFunction
                                            nameShow="Tipo de Documento"
                                            urlSelect="tipo-documento"
                                            nameSelect="tipoDocumento"
                                            value={detailsPerfil.tipoDocumento}
                                            setObject={setDetailsPerfil}
                                            object={detailsPerfil}
                                        />
                                    </div>
                                    <div className="col-12 form-group ">
                                        <TextField
                                            className="w-100"
                                            id="outlined-textarea"
                                            label="Documento"
                                            onChange={handleChangeDetailsPerfil}
                                            name="documento"
                                            value={detailsPerfil.documento ? detailsPerfil.documento : ''}
                                            multiline variant="outlined"
                                        />
                                    </div>
                                    <div className="col-12 form-group ">
                                        <TextField
                                            className="w-100"
                                            id="outlined-textarea"
                                            label="Teléfono"
                                            onChange={handleChangeDetailsPerfil}
                                            name="telefono"
                                            value={detailsPerfil.telefono ? detailsPerfil.telefono : ''}
                                            multiline variant="outlined"
                                        />
                                    </div>
                                    <div className="col-12 form-group ">
                                        <TextField
                                            className="w-100"
                                            id="outlined-textarea"
                                            label="Dirección"
                                            onChange={handleChangeDetailsPerfil}
                                            name="direccion"
                                            value={detailsPerfil.direccion ? detailsPerfil.direccion : ''}
                                            multiline variant="outlined"
                                        />
                                    </div>
                                    <div className="col-12 form-group ">
                                        <SelectFunction
                                            nameShow="Departamento"
                                            urlSelect="departamento"
                                            nameSelect="departamento"
                                            value={detailsPerfil.departamento}
                                            setObject={setDetailsPerfil}
                                            object={detailsPerfil}
                                        />
                                    </div>
                                    <div className="col-12 form-group ">
                                        <SelectFunction
                                            nameShow="Municipio"
                                            urlSelect="municipio"
                                            nameSelect="municipio"
                                            value={detailsPerfil.municipio}
                                            setObject={setDetailsPerfil}
                                            object={detailsPerfil}
                                            departamento={detailsPerfil.departamento}
                                        />
                                    </div>
                                    <div className="col-12 form-group ">
                                        <TextField
                                            disabled
                                            className="w-100"
                                            id="outlined-textarea"
                                            label="Rol"
                                            //onChange={handleChangeDetailsPerfil} 
                                            name="rol"
                                            value={detailsPerfil.rol ? detailsPerfil.rol : ''}
                                            multiline variant="outlined"
                                        />
                                    </div>
                                </div>
                            </div>
                            {
                                newPass === true
                                    ? <div className="col-12 justify-content center align-items-center">
                                        <div className="col-12 d-flex justify-content-between mx-2 align-items-center">
                                            <h3 className="m-0">Nueva Contraseña</h3>
                                        </div>
                                        <hr className="d-flex justify-content-between align-items-center divisor"></hr>
                                        <div className="col-12 form-group ">
                                            <TextField
                                                className="w-100"
                                                id="outlined-password-input"
                                                label="Nueva Contraseña"
                                                type="password"
                                                onChange={handleChangeDetailsPerfil}
                                                name="newPass"
                                                value={detailsPerfil.newPass ? detailsPerfil.newPass : ''}
                                                variant="outlined"
                                            />
                                        </div>
                                        <div className="col-12 form-group ">
                                            <TextField
                                                className="w-100"
                                                id="outlined-password-input"
                                                label="Repetir Nueva Contraseña"
                                                type="password"
                                                onChange={handleChangeDetailsPerfil}
                                                name="repeatNewPass"
                                                value={detailsPerfil.repeatNewPass ? detailsPerfil.repeatNewPass : ''}
                                                variant="outlined"
                                            />
                                        </div>
                                        <Button
                                            className="col-12 mt-2"
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={savePass}
                                            startIcon={<SaveIcon />}
                                        >
                                            Guardar Contraseña
                                        </Button>
                                    </div>
                                    : ''
                            }
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default DashBoardUsers



