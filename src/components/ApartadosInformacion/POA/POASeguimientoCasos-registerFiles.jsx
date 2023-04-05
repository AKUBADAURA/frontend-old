import { Button } from '@material-ui/core'
import React, { useContext, useState, useEffect } from 'react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { v4 as uuidv4 } from 'uuid';
import { POAContext } from '../../../context/POAContext';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        width: '100%',
        margin: '20px 0 0 0'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const POASeguimientoCasosRegisterFiles = () => {

    //USESTYLES
    const classes = useStyles();
    //vars & const
    const optionsTipoAnexo = [
        { value: 'Sentencia', label: 'Sentencia' },
        { value: 'Auto de Seguimiento', label: 'Auto de Seguimiento' },
        { value: 'Comunicados', label: 'Comunicados' },
        { value: 'Actas', label: 'Actas' },
        { value: 'Documentos Relacionados al POA', label: 'Documentos Relacionados al POA' },
        { value: 'Otro', label: 'Otro' }
    ]

    const url = process.env.REACT_APP_API_URL
    const urlBackend = process.env.REACT_APP_BACKEND_API_URL
    let config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }

    //useContext
    const {
        anexos, setAnexos,
        POA
        } = useContext(POAContext)
    //useState
    const [counterAnexos, setCounterAnexos] = useState(0)
    const [htmlAnexos, setHtmlAnexos] = useState([])
    const [uploadingFiles, setUploadingFiles] = useState(false)
    const [html, setHtml] = useState()
    //useEffect
    useEffect(() => {
        setCounterAnexos(0)
        setHtmlAnexos([])
        setHtml()
        setAnexos([])
    }, [])
    //functions
    const addAnexo = () => {
        //new instances
        let newCounterAnexos = counterAnexos + 1
        let id = uuidv4()
        let anexosUpdate = anexos
        let htmlAnexosNew = htmlAnexos;
        let anexoNew = {
            type: null,
            file: null,
            name: 'anexo' + id,
            route: null,
            item: null,
            seguimientoCasoId: null,
            fileName: null,
            poaId: POA.id,
            id: id
        }

        //tratamiento

        //pushers

        anexosUpdate.push(anexoNew)
        htmlAnexosNew.push(
            <Card className={classes.root + " d-flex mt-3 containerNewAnexo"} key={id}>
                <CardContent>
                    <FormControl className="col-12" component="fieldset" >
                        <div className="col-12  d-flex justify-content-between h-100 flex-row">
                            <FormLabel className="col-6" component="legend">{`¿Tipo de anexo ${newCounterAnexos}?`}</FormLabel>
                            <FormLabel className="col-6" component="legend">Seleccione el anexo:</FormLabel>
                        </div>
                        <div className="col-12  d-flex justify-content-between h-100">
                            <RadioGroup
                                className="col-6"
                                //row
                                aria-label={`¿Tipo de anexo ${id}?`}
                                name={`anexo${id}`}
                                value={window[`anexos.anexo${id}.type`]}
                                onChange={handleChangeAnexos}
                            >
                                {optionsTipoAnexo.map(function (option) {
                                    return <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        control={<Radio />}
                                        label={option.label}
                                    />
                                })}
                            </RadioGroup>
                            <form className="col-6 p-0 d-flex flex-column justify-content-between align-items-center" >
                                <img style={{ width: 120 }} className="" src={process.env.PUBLIC_URL + '/img/archivo-cargado.png'} alt="file-upload" />
                                <input
                                    id={`files${id}`}
                                    name={`anexo${id}`}
                                    type="file"
                                    onChange={(e) => settingFile(e)}
                                />
                            </form>

                        </div>
                    </FormControl>
                </CardContent>
                <CardActions className="d-flex flex-column align-items-end">
                    <IconButton
                        color="primary"
                        aria-label="delete anexo"
                        name={'el bolo'}
                        id= {`anexo${id}`}
                        onClick={(e)=>deleteAnexo(e,id)}
                    >
                        <DeleteIcon
                            fontSize="inherit"
                        />
                    </IconButton>
                </CardActions>
            </Card>


        )
        setAnexos(anexosUpdate)
        setHtmlAnexos(htmlAnexosNew)
        setCounterAnexos(newCounterAnexos)
        updateHtml()

    }
    const handleChangeAnexos = (e, i) => {
        e.persist();

        console.log('e.target.name: ', e.target.name)
        console.log('e.target.value: ', e.target.value)
        console.log('i: ', i)
        // let anexoUpdate = anexos.find((item )=> {
        //     item.name===e.target.name
        //     )
        let indexItem = anexos.findIndex(item => item.name === e.target.name)
        // console.log('indexItem: ', indexItem)
        let anexosUpdate = anexos

        anexosUpdate[indexItem].type = e.target.value

        setAnexos(anexosUpdate)


        //anexoUpdate['type'] = e.target.value  
        console.log('anexoUpdate: ', anexos)
    }
    const settingFile = (e) => {
        console.log('e:', e)
        let indexItem = anexos.findIndex((item) => item.name === e.target.name)
        let anexosUpdate = anexos
        anexosUpdate[indexItem].file = e
        anexosUpdate[indexItem].fileName = e.target.files[0].name
        anexosUpdate[indexItem].route = `${process.env.REACT_APP_BACKEND_API_URL}/files/${e.target.files[0].name}`
        setAnexos(anexosUpdate)
    }


    const updateHtml = () => {
        setHtml(
            htmlAnexos.map((item) => {
                return item
            })
        )
    }
    const deleteAnexo = (e, id) => {
        //e.persist()
        console.log('e: ', e);
        console.log('id', id)
        //buscando index      
        let indexItem = anexos.findIndex(item => item.id === id)
        console.log('index: ', indexItem);
        //update array Anexos
        let anexosUpdate = anexos
        anexosUpdate.splice(indexItem, 1)
        setAnexos(anexosUpdate)
        console.log('anexos actualizados: ', anexosUpdate)
        //update html Anexos
        let htmlAnexosUpdate = htmlAnexos
        console.log('htmlAnexosUpdate: ', htmlAnexosUpdate)
        htmlAnexosUpdate.splice(indexItem, 1)
        console.log('htmlAnexosUpdateDespues: ', htmlAnexosUpdate)

        setHtmlAnexos(htmlAnexosUpdate)
        console.log('htmlAnexos: ', htmlAnexos)
        updateHtml()
        console.log('se actualizo hmtl en el delete');

    }

    return (
        <div className="col-12 w-100">
            {uploadingFiles === true
                ? ('')
                : (
                    <Button
                        variant="contained"
                        color="default"
                        startIcon={<CloudUploadIcon />}
                        onClick={addAnexo}
                    >
                        Agregar Anexo
                    </Button>
                )
            }
            {/* <Button
                variant="contained"
                color="default"
                startIcon={<CloudUploadIcon />}
                onClick={uploadAnexos}
            >
                {uploadingFiles === true
                    ? 'Subiendo Archivos'
                    : 'Subir Archivos'
                }
            </Button> */}
            {html}

        </div>
    )
}

export default POASeguimientoCasosRegisterFiles
