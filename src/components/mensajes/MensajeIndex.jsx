import React, { useContext, useEffect, useState } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Plantilla from '../ui/plantilla';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { Divider, TextField } from '@material-ui/core';
import DraftsIcon from '@material-ui/icons/Drafts';
import SelectMultipleDB from '../../logic/SelectMultipleDB';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CreateIcon from '@material-ui/icons/Create';
import MensajeriaIndexTabs from './MensajeriaIndex-Tabs';
import { MensajeriaContext, MensajeriaProvider } from '../../context/MensajeriaContext';
import { defaultMessages, typesMessage, typesNamesMessages } from '../../types/types';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    textField: {
        width: '100%',
        margin: theme.spacing(0.5),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));



const MensajeriaIndex = () => {

    //usestyles

    const classes = useStyles();

    //useTheme

    const theme = useTheme();



    //vars and 
    const url = process.env.REACT_APP_BACKEND_API_URL
    let config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    let responseMessagesIN, responseMessagesOUT, responseMessage = [];
    
    //useState
    const [personName, setPersonName] = React.useState([]);
    const [message, setMessage] = React.useState(typesMessage)
    const [messagesOUT, setMessagesOUT] = useState(defaultMessages)
    const [messagesIN, setMessagesIN] = useState(defaultMessages)
    const [section, setSection] = useState('messages')
    const { messagesHTMLIN, setMessagesHTMLIN, messagesHTMLOUT, setMessagesHTMLOUT } = useContext(MensajeriaContext)

    //messages, newMessage, detailsMessage


    //functions

    const handleChangeDestino = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setMessage({
            ...message, ['destino']: typeof value === 'string' ? value.split(',') : value
        })

    };

    const handleChange = (e) => {
        e.persist();
        setMessage({
            ...message, [e.target.name]: e.target.value
        })

    }

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${url}/mensaje`, message, config)
            setMessage(typesMessage)
            setPersonName([])
            alert('Mensaje enviado')

        }
        catch (error) {
            console.log('An error occurred:', error.response);
            // setMessage(typesMessage)
            // setPersonName([])
            alert('Error al enviar el mensaje, recargue la pagina e intente de nuevo.')
        }
        getMessagesOUT()

    }

    const getMessagesOUT = async () => {
        try {
            responseMessagesOUT = await axios.get(`${url}/mensajeOUT`, config)
            console.log('responseMessages: ', responseMessagesOUT.data);
            setMessagesOUT(responseMessagesOUT.data)
        }
        catch (error) {
            console.log('An error occurred:', error.response);
            setMessagesOUT(defaultMessages)
            alert('Error al cargar mensajes, recargue la pagina e intentelo de nuevo.')
        }
    }

    const getMessagesIN = async () => {
        try {
            responseMessagesIN = await axios.get(`${url}/mensajeIN`, config)
            console.log('responseMessagesIN: ', responseMessagesIN.data);
            setMessagesIN(responseMessagesIN.data)
        }
        catch (error) {
            console.log('An error occurred:', error.response);
            setMessagesIN(defaultMessages)
            alert('Error al cargar mensajes de entrada, recargue la pagina e intentelo de nuevo.')
        }
    }

    const getMessage = async (id) => {
        try {
            responseMessage = await axios.get(`${url}/mensaje/${id}`, config)
            console.log('responsemessage: ', responseMessage);
            setMessage(responseMessage.data)
        }
        catch (error) {
            console.log('An error occurred:', error.response);
            setMessage(typesMessage)
            alert('Error al cargar detalles del mensaje, recargue la pagina e intentelo de nuevo.')
        }
    }


    //useeffect

    useEffect(() => {
        getMessagesOUT()
        getMessagesIN()
    }, [])

    useEffect(() => {
        console.log('mensajesIN: ', messagesIN);
        let messagesHTMLINLet =
            messagesIN.map((item) => {
                return (
                    <ListItem button onClick={() => { getMessage(item.id); setSection('detailsMessage'); }} key={item.id}>
                        <ListItemAvatar>
                            <Avatar>
                                <DraftsIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.origen}
                            secondary={
                                <div className="d-flex justify-content-between">
                                    <span>{`${item.asunto}`}</span>
                                    <span>{new Date(item.createAt).toLocaleString()}</span>

                                </div>

                                // <React.Fragment>
                                //     <Typography
                                //         component="h5"
                                //         // variant="body2"
                                //         className={classes.inline}
                                //         color="textPrimary"
                                //     >
                                //         {item.asunto}
                                //     </Typography>
                                //     {" — " + item.cuerpo}
                                // </React.Fragment>
                            }
                        />
                    </ListItem>
                )
            })
        setMessagesHTMLIN(messagesHTMLINLet)
    }, [messagesIN])

    useEffect(() => {
        console.log('mensajesOUT: ', messagesOUT);
        let messagesHTMLOUTLet =
            messagesOUT.map((item) => {
                return (
                    <ListItem button onClick={() => { getMessage(item.id); setSection('detailsMessage'); }} key={item.id}>
                        <ListItemAvatar>
                            <Avatar>
                                <DraftsIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.origen}
                            secondary={
                                // <span>{`${item.asunto} - ${item.cuerpo}`}</span>
                                <div className="d-flex justify-content-between">
                                    <span>{`${item.asunto}`}</span>
                                    <span>{new Date(item.createAt).toLocaleString()}</span>
                                </div>

                                // <React.Fragment>
                                //     <Typography
                                //         component="h5"
                                //         // variant="body2"
                                //         className={classes.inline}
                                //         color="textPrimary"
                                //     >
                                //         {item.asunto}
                                //     </Typography>
                                //     {" — " + item.cuerpo}
                                // </React.Fragment>
                            }
                        />
                    </ListItem>
                )
            })
        setMessagesHTMLOUT(messagesHTMLOUTLet)
    }, [messagesOUT])

    //subComponents

    const MessagesComponent =
        <CardContent>
            <div className="d-flex justify-content-between align-items-center">
                <Typography gutterBottom variant="h5" component="h5" className='mb-0'>
                    Bandeja de entrada
                </Typography>
                <IconButton
                    color="primary"
                    aria-label="cancelar mensaje"
                    component="span"
                    onClick={() => { setSection('newMessage') }}
                >
                    <CreateIcon />
                </IconButton>
            </div>
            <Divider className='my-2' />
            <Typography gutterBottom variant="span" component="span" className='mb-0'>
                De click sobre un mensaje listado para más información.
            </Typography>
        </CardContent>

    const NewMessageComponent =
        <CardContent>
            <div className="d-flex justify-content-between align-items-center">
                {/* <div className='m-0 p-0 d-flex justify-content-start align-items-center'>
                </div> */}
                <Typography gutterBottom variant="h5" component="h5" className='mb-0'>
                    Nuevo Mensaje
                </Typography>
                <IconButton
                    color="primary"
                    aria-label="cancelar mensaje"
                    component="span"
                    onClick={() => { setMessage(typesMessage); setPersonName([]); setSection('messages') }}
                >
                    <CloseIcon />
                </IconButton>
            </div>
            <Divider className='my-2' />
            <InputLabel id="demo-multiple-name-label">Destino</InputLabel>
            <Select
                className={classes.textField}
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                required
                variant="outlined"
                value={personName}
                onChange={handleChangeDestino}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {typesNamesMessages.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
            <TextField
                className={classes.textField}
                required
                id="outlined-required"
                label="Asunto"
                // defaultValue="Hello World"
                variant="outlined"
                value={message.asunto}
                onChange={handleChange}
                name='asunto'

            />
            <TextField
                className={classes.textField}
                required
                id="outlined-required"
                label="Mensaje"
                multiline
                rows={7}
                // defaultValue="Hello World"
                variant="outlined"
                value={message.cuerpo}
                name='cuerpo'
                onChange={handleChange}
            />
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
                onClick={sendMessage}
            >
                Enviar
            </Button>
        </CardContent>

    const DetailMessageComponent =
        <CardContent>
            <div className="d-flex justify-content-between align-items-center">
                <Typography gutterBottom variant="h5" component="h5" className='mb-0'>
                    Detalles del mensaje
                </Typography>
                <IconButton
                    color="primary"
                    aria-label="cancelar mensaje"
                    component="span"
                    onClick={() => { setMessage(typesMessage); setPersonName([]); setSection('messages') }}
                >
                    <CloseIcon />
                </IconButton>
            </div>
            <Divider className='my-2' />
            <TextField
                className={classes.textField}
                id="outlined-required"
                label="Origen"
                // defaultValue="Hello World"
                variant="outlined"
                value={message.origen}
                name='origen'
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                className={classes.textField}
                id="outlined-required"
                label="Asunto"
                // defaultValue="Hello World"
                variant="outlined"
                value={message.asunto}
                name='asunto'
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                className={classes.textField}
                id="outlined-required"
                label="Mensaje"
                multiline
                rows={7}
                // defaultValue="Hello World"
                variant="outlined"
                value={message.cuerpo}
                name='cuerpo'
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                className={classes.textField}
                id="outlined-required"
                label="Fecha de envío"
                // defaultValue="Hello World"
                variant="outlined"
                value={new Date(message.createAt).toLocaleString()}
                name='createAt'
                InputProps={{
                    readOnly: true,
                }}
            />
            <InputLabel id="demo-multiple-name-label">Destinatarios</InputLabel>
            <Select
                className={classes.textField}
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                required
                variant="outlined"
                value={message.destino}
                inputProps={{ readOnly: true }}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {typesNamesMessages.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </CardContent>

    return (
        <Plantilla 
            title={'SALA DE MENSAJERÍA'}
            navBar={true}
            // className="d-flex justify-content-center align-items-center"
        >
            <Card sx={{ maxWidth: 1000, minHeight: 1000 }} className="container col-4 p-0">
                <MensajeriaIndexTabs  getMessagesIN getMessagesOUT/>
            </Card>
            <Card sx={{}} className="container col-7 justify-content-end">
                {
                    section === 'messages'
                        ? MessagesComponent
                        : ''
                }
                {
                    section === 'newMessage'
                        ? NewMessageComponent
                        : ''
                }
                {
                    section === 'detailsMessage'
                        ? DetailMessageComponent
                        : ''
                }
            </Card>

        </Plantilla>
    )
}

export default MensajeriaIndex


