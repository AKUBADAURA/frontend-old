import { Button, Fade, Modal, TextField } from '@material-ui/core'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import axios from 'axios'
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react'
import SelectFunction from '../../logic/SelectFunction';
import SaveIcon from '@material-ui/icons/Save';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import EditIcon from '@material-ui/icons/Edit';
import PostAddIcon from '@material-ui/icons/PostAdd'
import RadioButtonsGroup from '../../logic/RadioButtonsGroup';
import { Edit } from '@material-ui/icons';
import CustomGridPanel from '../../logic/CustomGridPanel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RolValidation from '../../logic/RolValidation';
import { columnsNoticiasCPLI, typesRegistroNoticiasCPLI, typesOptionsCategoriaNoticiasCPLI } from '../../types/types';



const useStyles = makeStyles((theme) => ({
    root: {
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1,
    },
    speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    },
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


const DashboardNoticiasCPLI = () => {

    //Vars and const
    const url= process.env.REACT_APP_BACKEND_API_URL
    let config ={
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }
    let responseOwnerId

    //useStyles
    
    
    const classes = useStyles(); 
    
    //usestate

    const [openSpeedDial, setOpenSpeedDial] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [registrosNoticiasCPLI, setRegistrosNoticiasCPLI] = useState([])
    const [registroNoticiasCPLI, setRegistroNoticiasCPLI] = useState(typesRegistroNoticiasCPLI)
    const [openModalDetailregistroNoticiasCPLI, setOpenModalDetailregistroNoticiasCPLI] = useState(false)
    const [typeRegistroNoticiasCPLI, setTypeRegistroNoticiasCPLI] = useState('new')
    //useeffect
    useEffect(() => {
        getRegistrosNoticiasCPLI();
    }, [])

    //functions 
    const newRegister = () => {
        console.log('new register')
        setRegistroNoticiasCPLI(typesRegistroNoticiasCPLI)
        setTypeRegistroNoticiasCPLI('new')
        handleOpenModalDetailregistroNoticiasCPLI()          
    }


    const handleVisibility = () => {
        setHidden((prevHidden) => !prevHidden);
      };
    
      const handleOpenSpeedDial = () => {
        setOpenSpeedDial(true);
      };
    
      const handleCloseSpeedDial = () => {
        setOpenSpeedDial(false);
      };



    const handleOpenModalDetailregistroNoticiasCPLI = () => {
        setOpenModalDetailregistroNoticiasCPLI(true);
    }  
    const handleCloseModalDetailregistroNoticiasCPLI = () => {
        setOpenModalDetailregistroNoticiasCPLI(false);
    }

    const detailsregistroNoticiasCPLI=(GridCellParams)=>{
        setTypeRegistroNoticiasCPLI('edit')
        setRegistroNoticiasCPLI(GridCellParams.row)
        handleOpenModalDetailregistroNoticiasCPLI()           
    }
    const getRegistrosNoticiasCPLI= async ()=> {
        try {
            const response = await axios.get(`${url}/noticias-cpli`,config)
            //const response = await axios.get(`${url}/poa?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22ownerId%22%3A%20%22${usuario.id}%22%0A%20%20%7D%0A%7D`,config)
            setRegistrosNoticiasCPLI(response.data);
        }
        catch (error) {
            console.log(error.response)
        }    
    }

    const saveNewRegistroNoticiasCPLI =async (e)=>{
        e.preventDefault();
        try {
            responseOwnerId = await axios.get(`${url}/whoAmI`,config)
            await axios.post(`${url}/noticias-cpli`,registroNoticiasCPLI,config)
            alert('Nuevo registro almacenado con éxito')
            await getRegistrosNoticiasCPLI()
            handleCloseModalDetailregistroNoticiasCPLI() 
        }
        catch (error) {
            console.log('An error occurred:', error.response);            
        }        
    } 

    

    const deleteNewRegistroNoticiasCPLI =async (e)=>{
        e.preventDefault();
        try {
          if (window.confirm("¿Estás seguro de eliminar el registro?")) {            
            await axios.delete(`${url}/noticias-cpli/${registroNoticiasCPLI.id}`,config)
            await getRegistrosNoticiasCPLI()
            handleCloseModalDetailregistroNoticiasCPLI() 
            alert('Elemento eliminado con éxito')
          }
        }
        catch (error) {
            console.log('No pudo eliminarse el registro con éxito')
            console.log('An error occurred:', error.response);            
        } 
    
      }


    const saveEditRegistroNoticiasCPLI =async (e)=>{
        e.preventDefault();
        try {
            responseOwnerId = await axios.get(`${url}/whoAmI`,config)
            await axios.patch(`${url}/noticias-cpli/${registroNoticiasCPLI.id}`,registroNoticiasCPLI,config)
            alert('Cambios almacenados con éxito')
            await getRegistrosNoticiasCPLI()
            handleCloseModalDetailregistroNoticiasCPLI() 
        }
        catch (error) {
            console.log('An error occurred:', error.response);            
        }        
    }

    const seeRegisterIndex = () => {
        alert('De doble click sobre la fila del registro de interes')                
    }

    
    const handleChangeEvent=(e)=>{
        e.persist();
        setRegistroNoticiasCPLI({            
                ...registroNoticiasCPLI,[e.target.name]:e.target.value
            })
        
    }
    
    const actionsNoticiasCPLI = [
        { icon: <PostAddIcon />, name: 'Crear Registro Nuevo', function: newRegister },
        { icon: <Edit />, name: 'Ver detalles de un Registro', function: seeRegisterIndex }
    ];
    


    return (
        <div style={{ height: 400, width: '100%' }}>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                className={classes.speedDial}
                hidden={hidden}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                onClose={handleCloseSpeedDial}
                onOpen={handleOpenSpeedDial}
                open={openSpeedDial}
            >
                {actionsNoticiasCPLI.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.function}
                />
                ))}
            </SpeedDial>
            <DataGrid 
                columns={columnsNoticiasCPLI} 
                rows={registrosNoticiasCPLI}
                pageSize={10} 
                onRowDoubleClick = {(GridCellParams)=>detailsregistroNoticiasCPLI(GridCellParams)}
                autoHeight= {true} 
                density={'compact'}                              
                components={{
                    Toolbar: GridToolbar,
                    Panel: CustomGridPanel
                }} 
                //autoPageSize={true} 
            />    
            {/* -------------------------------- MODAL DETAILS REGISTRO NOTICIAS CPLI INDEX -------------------------------- -------------------------------- */}
            <div id="modalDetailregistroNoticiasCPLI">
                <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                //className={classes.modal}
                className="overflow-auto w-100 mx-auto"
                open={openModalDetailregistroNoticiasCPLI}
                onClose={handleCloseModalDetailregistroNoticiasCPLI}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
                >
                    <Fade in={openModalDetailregistroNoticiasCPLI}>
                        <div className={classes.paper}>  
                        <div className="row d-flex- justify-content-between" id="modalDetailRegistroNoticiasCPLI" data-spy="scroll">
                            <div className="col-12 d-flex justify-content-between mx-2 align-items-center">
                                {
                                    typeRegistroNoticiasCPLI==='new'
                                    ? <h3 className="m-0 col-7">Nuevo registro</h3>
                                    : <h3 className="m-0 col-7">Detalles del registro</h3>
                                }
                                <div className="col-5">
                                    {RolValidation([4,6,7,8]) && typeRegistroNoticiasCPLI!=='new'
                                    ?<Button onClick={deleteNewRegistroNoticiasCPLI} variant="contained" color="secondary" size="small" className={classes.button + " mr-2"}  startIcon={<DeleteForeverIcon />} >Eliminar</Button>
                                    : ''
                                    }
                                    <Button onClick={typeRegistroNoticiasCPLI==='new'?saveNewRegistroNoticiasCPLI:saveEditRegistroNoticiasCPLI} variant="contained" color="primary" size="small" className={classes.button} startIcon={<SaveIcon />} >Guardar cambios</Button>
                                </div>
                            </div>
                            <hr className="d-flex justify-content-between align-items-center divisor"></hr>                            
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-6 form-group ">
                                        <label htmlFor="titulo">Título</label>
                                        <TextField
                                            className="w-100" 
                                            id="outlined-textarea" 
                                            label="" 
                                            name="titulo"
                                            onChange={handleChangeEvent} 
                                            value={registroNoticiasCPLI.titulo?registroNoticiasCPLI.titulo:''  }  
                                            multiline variant="outlined"
                                        /> 
                                    </div>
                                    <div className="col-6 form-group ">
                                        <label htmlFor="fechaPublicacion">Fecha de Publicación</label>
                                        <TextField
                                            className="w-100" 
                                            id="date" 
                                            type="date"
                                            label="" 
                                            name="fechaPublicacion"
                                            onChange={handleChangeEvent} 
                                            value={registroNoticiasCPLI.fechaPublicacion?registroNoticiasCPLI.fechaPublicacion:''  }  
                                        /> 
                                    </div>
                                    <div className="col-6 form-group ">
                                        <label htmlFor="link">URL - Link</label>
                                        <TextField
                                            className="w-100" 
                                            id="outlined-textarea" 
                                            label="" 
                                            name="link"
                                            onChange={handleChangeEvent} 
                                            value={registroNoticiasCPLI.link?registroNoticiasCPLI.link:''  }  
                                            multiline variant="outlined"
                                        /> 
                                    </div>
                                    <div className="col-6 form-group ">
                                        <label htmlFor="link">URL - Imagen</label>
                                        <TextField
                                            className="w-100" 
                                            id="outlined-textarea" 
                                            label="" 
                                            name="imagen"
                                            onChange={handleChangeEvent} 
                                            value={registroNoticiasCPLI.imagen?registroNoticiasCPLI.imagen:''  }  
                                            multiline variant="outlined"
                                        /> 
                                    </div>
                                    {/* <div className="col-6 form-group ">
                                        <label htmlFor="estado">ID Categoría</label>
                                        <RadioButtonsGroup 
                                            label="" 
                                            name="categoriaNoticiasCPLIId"
                                            options={typesOptionsCategoriaNoticiasCPLI}
                                            value={registroNoticiasCPLI.categoriaNoticiasCPLIId?registroNoticiasCPLI.categoriaNoticiasCPLIId:''}
                                            handleChange={handleChangeEvent} 
                                        />
                                    </div> */}
                                    <div className="col-6 form-group">
                                        <label htmlFor="">Status</label>
                                        <SelectFunction                                                     
                                            nameShow="" 
                                            nameSelect="status" 
                                            urlSelect="status-noticias-cpli" 
                                            //controller="POA" 
                                            value={registroNoticiasCPLI.status?registroNoticiasCPLI.status:''}
                                            setObject={setRegistroNoticiasCPLI}
                                            object={registroNoticiasCPLI}
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

export default DashboardNoticiasCPLI
