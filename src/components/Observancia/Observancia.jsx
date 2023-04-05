import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Header from '../header/Header'
import NavbarApp from '../NavBar/NavbarApp'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import '../../css/observancia.css'
import { Fade, Modal } from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop';
import CustomGridPanel from '../../logic/CustomGridPanel';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility'
import { Link } from 'react-router-dom';






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


const Observancia = () => {

    //vars & const
    const url = process.env.REACT_APP_BACKEND_API_URL
    let config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }
    let responseOwnerId, response
    let fechaCreacion, fechaAgregado

    const columns = [
        { field: 'title', headerName: 'Título', width: 200 },
        { field: 'type', headerName: 'Tipo', width: 100 },
        { field: 'addedAt', headerName: 'Fecha de Agregado', width: 200 },
        { field: 'description', headerName: 'Descripción', width: 500 },
        { field: 'createAt', headerName: 'Fecha de Creación', width: 200 }
    ];

    //useStyles

    //useState
    const [listaObservancia, setListaObservancia] = useState([])
    const [itemObservancia, setItemObservancia] = useState({})
    const [openModalDetailItemObservancia, setOpenModalDetailItemObservancia] = useState(false)


    //useContext

    /* //useStyles */
    const classes = useStyles();

    //useEffect
    useEffect(() => {
        getListaObservancia()
    }, [])

    useEffect(() => {
        


    }, [listaObservancia])

    //functions
    const getListaObservancia = async () => {
        try {
            responseOwnerId = await axios.get(`${url}/whoAmI`, config)
            response = await axios.get(`${url}/lista-observancia?filter[where][ownerId]=${responseOwnerId.data}`, config)
            setListaObservancia(response.data)
            console.log('Lista de observancia:', response.data)
        }
        catch (error) {
            console.log('An error occurred:', error.response);
        }
    }

    const detailsItemObservancia = (GridCellParams) => {
        setItemObservancia(GridCellParams.row)
        handleOpenModalDetailItemObservancia()

    }

    const handleOpenModalDetailItemObservancia = () => {
        setOpenModalDetailItemObservancia(true);
    };
    const handleCloseModalDetailItemObservancia = () => {
        setOpenModalDetailItemObservancia(false);
    };
    const deleteItem =async (e)=>{
        e.preventDefault();
        try {
          if (window.confirm("¿Estás seguro de eliminar el registro?")) {        
            responseOwnerId = await axios.get(`${url}/whoAmI`,config)            
            await axios.delete(`${url}/lista-observancia/${itemObservancia.id}`,config)
            setOpenModalDetailItemObservancia(false)
            setItemObservancia()
            await getListaObservancia()
            alert('Elemento eliminado de la lista con éxito')
          }
        }
        catch (error) {
          console.log('An error occurred:', error.response);            
        } 
    
      }

    return (
        <div className="row m-0">
            <Header />
            <NavbarApp />
            <div id="listaObservancia" className="col-12 d-flex justify-content-between mt-5 align-items-center">
                <h3 className="m-0">Mi lista de Observancia</h3>
            </div>
            <hr className="d-flex justify-content-between align-items-center divisor mx-2"></hr>
            <div className="col-12 d-flex justify-content-between">
                <DataGrid
                    rows={listaObservancia}
                    columns={columns}
                    pageSize={8}
                    autoHeight={true}
                    density={'compact'}
                    //autoPageSize={true} 
                    onRowDoubleClick={(GridCellParams) => detailsItemObservancia(GridCellParams)}
                    components={{
                        Toolbar: GridToolbar,
                        Panel: CustomGridPanel
                    }}
                />
            </div>
            {/* -------------------------------- MODAL DETAILS Item Observancia INDEX -------------------------------- -------------------------------- */}
            <div id="modalDetailPOA">
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    //className={classes.modal}
                    className="overflow-auto w-100 mx-auto"
                    open={openModalDetailItemObservancia}
                    onClose={handleCloseModalDetailItemObservancia}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openModalDetailItemObservancia}>
                        <div className={classes.paper}>
                            <div className="row d-flex- justify-content-between overflow-hidden">
                                <div className="col-12 d-flex justify-content-between mx-2 align-items-center">
                                    <h3 className="m-0">Detalles de Elemento en observancia</h3>
                                </div>
                                <hr className="d-flex justify-content-between align-items-center divisor"></hr>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-12 form-group ">
                                            <label htmlFor="title">Título</label>
                                            <TextField className="w-100" id="outlined-textarea" label="" name="title" value={itemObservancia.title} multiline variant="outlined" />
                                        </div>
                                        <div className="col-12 form-group ">
                                            <label htmlFor="start">Tipo</label>
                                            <TextField className="w-100" id="outlined-textarea" label="" name="type" value={itemObservancia.type}  multiline variant="outlined" />
                                        </div>
                                        <div className="col-12 form-group ">
                                            <label htmlFor="end">Fecha de agregado</label>
                                            <TextField className="w-100" id="outlined-textarea" label="" name="addedAt" value={itemObservancia.addedAt}  multiline variant="outlined" />
                                        </div>
                                        <div className="col-12 form-group ">
                                            <label htmlFor="end">Descripción</label>
                                            <TextField className="w-100" id="outlined-textarea" label="" name="description" value={itemObservancia.description} multiline variant="outlined" />
                                        </div>
                                        <div className="col-12 form-group ">
                                            <label htmlFor="end">Fecha de creación</label>
                                            <TextField className="w-100" id="outlined-textarea" label="" name="description" value={itemObservancia.createAt} multiline variant="outlined" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-between align-items-center">
                                    <Link to={`/POAS/${itemObservancia.ref}`}>
                                        <Button variant="contained" color="primary" startIcon={<VisibilityIcon />} >Ver Detalles</Button>
                                    </Link>
                                    <Button variant="contained" color="secondary" startIcon={<Delete />} onClick={deleteItem} >Borrar de la lista</Button>
                                </div>
                            </div>
                        </div>

                    </Fade>
                </Modal>
            </div>
        </div>
    )
}

export default Observancia
