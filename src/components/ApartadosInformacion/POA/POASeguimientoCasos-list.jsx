import React, {useContext, useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import POASeguimientoCasosModalDetails from './POASeguimientoCasos-modalDetails';
import { POAContext } from '../../../context/POAContext';
import CustomGridPanel from '../../../logic/CustomGridPanel';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width:'90%',
    position:'absolute',
    top: '0px',
    margin: 'auto',
    overflow: 'auto!important',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const columns = [  
    { field: 'id', headerName: 'ID', width: 70, description: '', sortable: true, type: 'string'},   
    { field: 'createAt', headerName: 'Creación', width: 220, description: '', sortable: true, type: 'string'},   
    { field: 's2nombreComunidad', headerName: 'Nombre Comunidad', width: 220, description: '', sortable: true, type: 'string'},
    { field: 's3procesoConsulta', headerName: '¿Hubo proceso de consulta?', width: 220, description: '', sortable: true, type: 'string'},
    { field: 's3estadoConsulta', headerName: 'Estado Actual', width: 150, description: '', sortable: true, type: 'string'},
    { field: 's3consultaConcertada', headerName: '¿Consulta concertada?', width: 220, description: '', sortable: true, type: 'string'},
    { field: 's3porqueConsultaConcertada', headerName: '¿Por qué?', width: 230, description: '', sortable: true, type: 'string'},
  ];
  

const POASeguimientoCasosList = (props) => {

  //useContext

  const {POA} = useContext(POAContext)
  //props


  //variables
  const url= process.env.REACT_APP_BACKEND_API_URL
  let config ={
      headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }
  
  //Usestyles
  const classes = useStyles();

  //useContext
  
  //useState
  const [POASeguimientoCasos, setPOASeguimientoCasos] = useState([]);
  const [detailsSeguimientoCasos, setDetailsSeguimientoCasos] = useState({});
  const [openModalDetailsSeguimientoCasos, setOpenModalDetailsSeguimientoCasos] = useState(false)
  
  //useEffects
  useEffect(() => {
    getSeguimientoCasos();
  }, []);
  
  //functions
  const handleCloseModal = () => {
    setOpenModalDetailsSeguimientoCasos(false);
  };



  const getDetailsSeguimientoCasos =  (GridCellParams)=>{
    setDetailsSeguimientoCasos(GridCellParams.row)
    setOpenModalDetailsSeguimientoCasos(true)     
  }

  const getSeguimientoCasos= async ()=> {
    try {
        const response = await axios.get(`${url}/poas/${POA.id}/seguimiento-casos?filter=%7B%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22id%22%3Atrue%2C%0A%20%20%20%20%22s2nombreComunidad%22%3Atrue%2C%0A%20%20%20%20%22s3procesoConsulta%22%3A%20true%2C%0A%20%20%20%20%22s3estadoConsulta%22%3A%20true%2C%0A%20%20%20%20%22s3consultaConcertada%22%3A%20true%2C%0A%20%20%20%20%22s3porqueConsultaConcertada%22%3A%20true%2C%0A%20%20%20%20%22createAt%22%3A%20true%0A%20%20%7D%0A%7D`,config)
        setPOASeguimientoCasos(response.data);
    }
    catch (error) {
        console.log(error.response)
    }

}


    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid 
              rows={POASeguimientoCasos} 
              columns={columns} 
              pageSize={5} /* checkboxSelection */ 
              onRowDoubleClick = {(GridCellParams)=>getDetailsSeguimientoCasos(GridCellParams)}              
              components={{
                Toolbar: GridToolbar,
                Panel: CustomGridPanel
              }} 
            />
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            //className={classes.modal}
            className="overflow-auto w-100 mx-auto"
            open={openModalDetailsSeguimientoCasos}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            >
              <Fade in={openModalDetailsSeguimientoCasos}>
                  <div className={classes.paper} id="modalDetailSeguimientoCasos" > 
                    <POASeguimientoCasosModalDetails 
                      getSeguimientoCasos={getSeguimientoCasos} 
                      setOpenModalDetailsSeguimientoCasos={setOpenModalDetailsSeguimientoCasos}
                      detailsSeguimientoCasos={detailsSeguimientoCasos}
                    />
                  </div>                                      
              </Fade>
            </Modal>
      </div>
    )
}

export default POASeguimientoCasosList
