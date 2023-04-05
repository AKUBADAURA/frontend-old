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
const POAindexModalDetailsTabDocumentos = (props) => {


    //vars and const
    let responseDocumentos
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
    const [documentos, setDocumentos] = useState([])

    //useEffect
    useEffect(() => {
        getDocumentos()
    }, [])

    //functions
    const getDocumentos = async () => {
        try {
            responseDocumentos = await axios.get(`${url}/archivo-publico?filter[where][poaId]=${POA.id}`)
            setDocumentos(responseDocumentos.data)
        }
        catch (e) {
            alert('Error al cargar datos de documentos anexos a este POA')
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
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Tipo de documento</TableCell>
                            <TableCell align="right">ID POA</TableCell>
                            <TableCell align="right">ID Caso de Seguimiento</TableCell>
                            <TableCell align="right">Fecha de subida</TableCell>
                            <TableCell align="right">Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documentos.map((documento) => (
                            <TableRow key={documento.id}>
                                <TableCell component="th" scope="documento">{documento.name}</TableCell>
                                <TableCell align="right">{documento.type}</TableCell>
                                <TableCell align="right">{documento.poaId}</TableCell>
                                <TableCell align="right">{documento.seguimientoCasoId}</TableCell>
                                <TableCell align="right">{documento.createAt}</TableCell>
                                <TableCell align="right">
                                    <a href={documento.route} target="_blank" rel="noopener noreferrer">
                                        <Button color="primary" size="small" startIcon={<PictureAsPdfIcon />} ></Button>
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default POAindexModalDetailsTabDocumentos