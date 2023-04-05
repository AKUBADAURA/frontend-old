import { Button, Fade, Modal } from '@material-ui/core'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import axios from 'axios'
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react'
import SelectFunction from '../../logic/SelectFunction';
import SaveIcon from '@material-ui/icons/Save';
import CustomGridPanel from '../../logic/CustomGridPanel';

const DashBoardContact = () => {

    //Vars and const
    const url = process.env.REACT_APP_BACKEND_API_URL
    let config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }
    let responseOwnerId

    const columns = [
        { field: 'id', headerName: 'Id', width: 100 },
        { field: 'nombres', headerName: 'Nombres', width: 150 },
        { field: 'email', headerName: 'E-mail', width: 150 },
        { field: 'telefono', headerName: 'Teléfono', width: 150 },
        { field: 'mensaje', headerName: 'Mensaje', width: 300 },
        { field: 'categoria', headerName: 'Categoría', width: 150 },
        { field: 'tipoIdentificacion', headerName: 'Tipo de identificación', width: 150 },
        { field: 'numeroIdentificacion', headerName: 'Numero de Identificación', width: 150 },
        { field: 'organizacion', headerName: 'Organización', width: 150 },
        { field: 'cargo', headerName: 'Cargo', width: 150 },
        { field: 'puebloEtnico', headerName: 'Pueblo Étnico', width: 150 },
        { field: 'departamento', headerName: 'Departamento', width: 150 },
        { field: 'municipio', headerName: 'Municipio', width: 150 },
        { field: 'barrio', headerName: 'Barrio', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'createAt', headerName: 'Fecha de registro', width: 150 },
    ];
    //useStyles
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
        }
    }));

    const classes = useStyles();

    //usestate
    const [contacts, setContacts] = useState([])
    const [contact, setContact] = useState({})
    const [openModalDetailContact, setOpenModalDetailContact] = useState(false)

    //useeffect
    useEffect(() => {
        getContacts();
    }, [])

    useEffect(() => {
        console.log(contacts)
    }, [contacts])

    useEffect(() => {
        console.log(contact
        )
    }, [contact])

    //functions 
    const handleOpenModalDetailContact = () => {
        setOpenModalDetailContact(true);
    }
    const handleCloseModalDetailContact = () => {
        setOpenModalDetailContact(false);
    }

    const detailsContact = (GridCellParams) => {
        setContact(GridCellParams.row)
        handleOpenModalDetailContact()
    }
    const getContacts = async () => {
        try {
            const response = await axios.get(`${url}/contacto`, config)
            //const response = await axios.get(`${url}/poa?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22ownerId%22%3A%20%22${usuario.id}%22%0A%20%20%7D%0A%7D`,config)
            setContacts(response.data);
        }
        catch (error) {
            console.log(error.response)
        }
    }

    const saveContact = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${url}/contacto/${contact.id}`, contact, config)
            alert('Cambios almacenados con éxito')
            await getContacts()
            handleCloseModalDetailContact()
        }
        catch (error) {
            console.log('An error occurred:', error.response);
        }
    }


    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={contacts}
                pageSize={10}
                onRowDoubleClick={(GridCellParams) => detailsContact(GridCellParams)}
                autoHeight={true}
                density={'compact'}
                components={{
                    Toolbar: GridToolbar,
                    Panel: CustomGridPanel
                }}
            //autoPageSize={true} 
            />
            {/* -------------------------------- MODAL DETAILS POA INDEX -------------------------------- -------------------------------- */}
            <div id="modalDetailContact">
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    //className={classes.modal}
                    className="overflow-auto w-100 mx-auto"
                    open={openModalDetailContact}
                    onClose={handleCloseModalDetailContact}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openModalDetailContact}>
                        <div className={classes.paper}>
                            <div className="row d-flex- justify-content-between" id="modalDetailPOA" data-spy="scroll">
                                <div className="col-12 d-flex justify-content-between mx-2 align-items-center">
                                    <h3 className="m-0">Detalles del registro de contacto</h3>
                                    <Button onClick={saveContact} variant="contained" color="primary" size="small" className={classes.button} startIcon={<SaveIcon />} >
                                        Guardar cambios
                                    </Button>
                                </div>
                                <hr className="d-flex justify-content-between align-items-center divisor"></hr>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6 form-group ">
                                            <label htmlFor="id">Id </label>
                                            <span name="id" className="form-control">{contact.id ? contact.id : ''} </span>
                                        </div>
                                        <div className="col-6 form-group ">
                                            <label htmlFor="nombres">Nombres</label>
                                            <span name="nombres" className="form-control">{contact.nombres ? contact.nombres : ''} </span>
                                        </div>
                                        <div className="col-6 form-group ">
                                            <label htmlFor="email">Email</label>
                                            <span name="email" className="form-control">{contact.email ? contact.email : ''} </span>
                                        </div>
                                        <div className="col-6 form-group  ">
                                            <label htmlFor="telefono">Teléfono</label>
                                            <span name="telefono" className="form-control">{contact.telefono ? contact.telefono : ''} </span>
                                        </div>
                                        <div className="col-6 form-group  ">
                                            <label htmlFor="mensaje">Mensaje</label>
                                            <span name="mensaje" className="form-control">{contact.mensaje ? contact.mensaje : ''} </span>
                                        </div>
                                        <div className="col-6 form-group  ">
                                            <label htmlFor="categoria">Categoría</label>
                                            <span name="categoria" className="form-control">{contact.categoria ? contact.categoria : ''} </span>
                                        </div>
                                        <div className="col-6 form-group  ">
                                            <label htmlFor="tipoIdentificacion">Tipo de Identificación</label>
                                            <span name="tipoIdentificacion" className="form-control">{contact.tipoIdentificacion ? contact.tipoIdentificacion : ''} </span>
                                        </div>
                                        <div className="col-6 form-group ">
                                            <label htmlFor="numeroIdentificacion">Número de Identificación</label>
                                            <span name="numeroIdentificacion" className="form-control">{contact.numeroIdentificacion ? contact.numeroIdentificacion : ''} </span>
                                        </div>
                                        <div className="col-6 form-group ">
                                            <label htmlFor="organizacion">Organización</label>
                                            <span name="organizacion" className="form-control">{contact.organizacion ? contact.organizacion : ''} </span>
                                        </div>
                                        <div className="col-6 form-group ">
                                            <label htmlFor="cargo">Cargo</label>
                                            <span name="cargo" className="form-control">{contact.cargo ? contact.cargo : ''} </span>
                                        </div>
                                        <div className="col-6 form-group ">
                                            <label htmlFor="puebloEtnico">Pueblo Étnico</label>
                                            <span name="puebloEtnico" className="form-control">{contact.puebloEtnico ? contact.puebloEtnico : ''} </span>
                                        </div>
                                        <div className="col-6 form-group ">
                                            <label htmlFor="departamento">Departamento</label>
                                            <span name="departamento" className="form-control">{contact.departamento ? contact.departamento : ''} </span>
                                        </div>
                                        <div className="col-6 form-group ">
                                            <label htmlFor="municipio">municipio</label>
                                            <span name="municipio" className="form-control">{contact.municipio ? contact.municipio : ''} </span>
                                        </div>
                                        <div className="col-6 form-group ">
                                            <label htmlFor="barrio">Barrio</label>
                                            <span name="barrio" className="form-control">{contact.barrio ? contact.barrio : ''} </span>
                                        </div>
                                        <div className="col-6 form-group  ">
                                            <label htmlFor="createdAt">Fecha de creación</label>
                                            <span name="createdAt" className="form-control">{contact.createAt ? contact.createAt : ''} </span>
                                        </div>
                                        <div className="col-6 form-group">
                                            <SelectFunction
                                                nameShow="Status"
                                                nameSelect="status"
                                                urlSelect="status-contacto"
                                                //controller="POA" 
                                                value={contact.status ? contact.status : ''}
                                                setObject={setContact}
                                                object={contact}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>
    )
}

export default DashBoardContact
