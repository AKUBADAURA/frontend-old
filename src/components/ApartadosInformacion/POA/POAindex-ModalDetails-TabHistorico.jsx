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
import { Button } from '@material-ui/core';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
const POAindexModalDetailsTabHistorico = (props) => {


    //vars and const
    let responseHistorico
    const url = process.env.REACT_APP_BACKEND_API_URL
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('JWT')}`
        }
    }
    //useContext

    //props
    const { POA } = props

    //useState
    const [historico, setHistorico] = useState([])

    //useEffect
    useEffect(() => {
        getHistorico()
    }, [])

    //functions
    const getHistorico = async () => {
        try {
            console.log('obteniendo histórico de POA: '+ POA.id)
            responseHistorico = await axios.get(`${url}/historico?filter[order]=createAt%20ASC&filter[where][poaId]=${POA.id}`, config)
            setHistorico(responseHistorico.data)
        }
        catch (e) {
            console.log(e.response)
            alert('Error al cargar datos de historico en este POA')
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
                    padding={'none'}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha de registro (GMT 0)</TableCell>
                            <TableCell align="right">ID registro</TableCell>
                            <TableCell align="right">ID POA</TableCell>
                            <TableCell align="right">ID Seguimiento Caso</TableCell>
                            <TableCell align="right">Tipo Item</TableCell>
                            <TableCell align="right">Acción</TableCell>
                            <TableCell align="right">Id Usuario</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {historico.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell component="th" scope="item" >{item.createAt}</TableCell>
                                <TableCell align="right">{item.id}</TableCell>
                                <TableCell align="right">{item.poaId}</TableCell>
                                <TableCell align="right">{item.seguimientoCasoId?item.seguimientoCasoId: ''}</TableCell>
                                <TableCell align="right">{item.tipoItem}</TableCell>
                                <TableCell align="right">{item.accion}</TableCell>
                                <TableCell align="right">{item.usuarioId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default POAindexModalDetailsTabHistorico