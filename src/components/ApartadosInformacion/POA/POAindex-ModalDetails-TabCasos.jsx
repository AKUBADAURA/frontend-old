import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { useState } from 'react';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const POAindexModalDetailsTabCasos = (props) => {

    //vars and const
    let responseCasos
    const url = process.env.REACT_APP_BACKEND_API_URL
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('JWT')}`
        }
    } 
    //useContext

    //props
    const {POA} = props

    //useState
    const [casos, setCasos] = useState([])

    //useEffect
    useEffect(() => {
        getCasosSeguimiento()
        return () => {
            setCasos([]);
          };
    }, [])

    //functions
    const getCasosSeguimiento = async ()=> {
        try {
            responseCasos = await axios.get(`${url}/poas/${POA.id}/seguimiento-casos?filter[fields][id]=true&filter[fields][s2nombreComunidad]=true&filter[fields][s3procesoConsulta]=true&filter[fields][s3estadoConsulta]=true&filter[fields][s3consultaConcertada]=true&filter[fields][s3porqueConsultaConcertada]=true&filter[fields][createAt]=true`)
            setCasos(responseCasos.data)
        }
        catch(e){
            alert('Error al cargar datos de los casos de seguimiento en este POA')
        }
    }

    const classes = useStyles();

    return (
        <div className="row TabsModalDetailPOA">
            <TableContainer component={Paper}>
                <Table 
                    className={classes.table} 
                    size="small" 
                    aria-label="a dense table"
                    stickyHeader={true}
                    //padding={'none'}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Comunidades</TableCell>
                            <TableCell align="right">¿Hubo proceso de consulta?</TableCell>
                            <TableCell align="right">Estado actual</TableCell>
                            <TableCell align="right">¿Consulta concertada?</TableCell>
                            <TableCell align="right">¿Por qué?</TableCell>
                            <TableCell align="right">Fecha de radicado</TableCell>
                            <TableCell align="right">Reporte</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {casos.map((caso) => (
                            <TableRow key={caso.id}>
                                <TableCell component="th" scope="caso">{caso.s2nombreComunidad}</TableCell>
                                <TableCell align="right">{caso.s3procesoConsulta}</TableCell>
                                <TableCell align="right">{caso.s3estadoConsulta}</TableCell>
                                <TableCell align="right">{caso.s3consultaConcertada}</TableCell>
                                <TableCell align="right">{caso.s3porqueConsultaConcertada}</TableCell>
                                <TableCell align="right">{caso.createAt}</TableCell>
                                <TableCell align="right"><PictureAsPdfIcon /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default POAindexModalDetailsTabCasos

