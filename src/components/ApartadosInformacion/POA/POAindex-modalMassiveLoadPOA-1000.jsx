import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { POAContext, POAProvider } from "../../../context/POAContext";
import { useContext } from 'react';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        display: 'inline-block',

    },
    value: {
        fontSize: 14,
        display: 'inline-block',

    },
    observaciones: {
        marginBottom: 12,
    },
});

const POAindexModalMassiveLoadPOA1000 = () => {
    //useStyles
    const classes = useStyles();
    //useContext 
    const {
        massiveLoadDetails
    } = useContext(POAContext);

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography component="h4">
                    Proceso de carga de POAS superior a 1000 registros
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Total a cargar:
                </Typography>
                <Typography variant="body2" component="p" className={classes.value}>
                    {massiveLoadDetails.totalPOAS}
                </Typography>
                <br />
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Errores detectados:  
                </Typography>
                <Typography variant="body2" component="p" className={classes.value}>
                    {massiveLoadDetails.errorPOAS}
                </Typography>
                <br />
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Cantidad de lotes (grupos de 10.000 registros):  
                </Typography>
                <Typography variant="body2" component="p" className={classes.value}>
                    {massiveLoadDetails.lotes}
                </Typography>
                <br />
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    POAS subidos:  
                </Typography>
                <Typography variant="body2" component="p" className={classes.value}>
                    {`${massiveLoadDetails.uploadPOAS}/${massiveLoadDetails.totalPOAS}`}
                </Typography>
                <br />
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Observaciones:  
                </Typography>
                <br />
                <div className="m-0 p-0 containerObservaciones">
                    {
                        massiveLoadDetails.observaciones.map((item, index) => {
                            return (<Typography key={index} className={classes.observaciones} color="textSecondary">{item}</Typography>)
                        })
                    }
                </div>
            </CardContent>
        </Card>

    )
}

export default POAindexModalMassiveLoadPOA1000
