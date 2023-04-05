import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import { POAContext } from '../../../context/POAContext';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    buttonSeeMore: {
        margin: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const url = process.env.REACT_APP_BACKEND_API_URL





const POAIndexModalDetailsTabEtapasStepper = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const { POA } = useContext(POAContext)
    const [stepContent, setStepContent] = useState(``)




    let responseSteps, responseCompleted, responsePOAEtapa
    let stepsLet = []
    let completedLet = {}

    const [steps, setSteps] = useState([])


    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const getSteps = async () => {
        try {
            responseSteps = await axios.get(`${url}/etapa?filter[order]=name%20ASC`)
            responseSteps.data.map((etapa) => {
                stepsLet.push(etapa.name)
            })
            setSteps(stepsLet)
        }
        catch (e) {
            alert('Error al cargar las etapas del proyecto, por favor recargue la página e inténtelo de nuevo.')
        }
    }
    const getStepContent = async (stepIndex) => {
        console.log('stepIndex: ', stepIndex)
        console.log('steps[stepIndex]: ', steps[stepIndex])
        console.log(`${url}/poa?filter[where][codigo]=${POA.codigo}&filter[where][comunidad]=${POA.comunidad}&filter[where][etapa]=${steps[stepIndex]}`)
        responsePOAEtapa = await axios.get(`${url}/poa?filter[where][codigo]=${POA.codigo}&filter[where][comunidad]=${POA.comunidad}&filter[where][etapa]=${steps[stepIndex]}`)
        console.log('responsePOAEtapa: ', responsePOAEtapa)
        if (responsePOAEtapa.data.length === 0) {
            setStepContent(
                <div>
                    <hr className="d-flex justify-content-between  align-items-center divisor"></hr>
                    {`No hay datos disponibles hasta el momento.`}
                    <hr className="d-flex justify-content-between  align-items-center divisor"></hr>
                </div>
            )
        }
        else {
            setStepContent(
                <div>
                    <hr className="d-flex justify-content-between  align-items-center divisor"></hr>
                    <table class="table table-striped">
                        <tbody>
                            <tr><td>
                                {`Nombre POA: ${responsePOAEtapa.data[0].nombrePOA}`}
                            </td></tr>
                            <tr><td>
                                {`Código: ${responsePOAEtapa.data[0].codigo}`}
                            </td></tr>
                            <tr><td>
                                {`Etapa: ${responsePOAEtapa.data[0].etapa}`}
                            </td></tr>
                            <tr><td>
                                {`¿Es POMCAS?: ${responsePOAEtapa.data[0].esPOMCAS}`}
                            </td></tr>
                            <tr><td>
                                {`Ejecutor POA: ${responsePOAEtapa.data[0].ejecutorPOA}`}
                            </td></tr>
                            <tr><td>
                                {`¿Tiene Licencia?: ${responsePOAEtapa.data[0].tieneLicencia}`}
                            </td></tr>
                            <tr><td>
                                {`Sector: ${responsePOAEtapa.data[0].sector}`}
                            </td></tr>
                            <tr><td>
                                {`Estado: ${responsePOAEtapa.data[0].estado}`}
                            </td></tr>
                            <tr><td>
                                {`Departamento: ${responsePOAEtapa.data[0].departamento}`}
                            </td></tr>
                            <tr><td>
                                {`Fecha de Planeación: ${responsePOAEtapa.data[0].fechaPlaneacion}`}
                            </td></tr>
                            <tr><td>
                                {`Fecha Real: ${responsePOAEtapa.data[0].fechaReal}`}
                            </td></tr>
                            <tr><td>
                                {`Comunidad: ${responsePOAEtapa.data[0].comunidad}`}
                            </td></tr>
                            <tr><td>
                                {`Municipio: ${responsePOAEtapa.data[0].municipio}`}
                            </td></tr>
                            <tr><td>
                                {`Región: ${responsePOAEtapa.data[0].region}`}
                            </td></tr>
                            <tr><td>
                                {`Total de Comunidades: ${responsePOAEtapa.data[0].totalComunidades}`}
                            </td></tr>
                            <tr><td>
                                {`Fecha de Acto Administrativo: ${responsePOAEtapa.data[0].fechaActoAdmin}`}
                            </td></tr>
                            <tr><td>
                                {`Número de Acto Administrativo: ${responsePOAEtapa.data[0].numActoAdmin}`}
                            </td></tr>
                            <tr><td>
                                {`Estado de Gestión: ${responsePOAEtapa.data[0].estadoGestion}`}
                            </td></tr>
                            <tr><td>
                                {`¿Etapa Finalizada? : ${responsePOAEtapa.data[0].etapaFinalizada}`}
                            </td></tr>
                            <tr><td>
                                {`Pueblo : ${responsePOAEtapa.data[0].pueblo}`}
                            </td></tr>
                            <tr><td>
                                {`Tipo de Comunidad: ${responsePOAEtapa.data[0].tipoComunidad}`}
                            </td></tr>
                            <tr><td>
                                {`PINE: ${responsePOAEtapa.data[0].pine}`}
                            </td></tr>
                            <tr><td>
                                {`¿Es con Acuerdos?: ${responsePOAEtapa.data[0].esConAcuerdos}`}
                            </td></tr>
                            <tr><td>
                                {` Latitud: ${responsePOAEtapa.data[0].latitud}`}
                            </td></tr>
                            <tr><td>
                                {` Longitud: ${responsePOAEtapa.data[0].longitud}`}
                            </td></tr>
                            <tr><td>
                                {` Código del Municipio: ${responsePOAEtapa.data[0].codigoMunicipio}`}
                            </td></tr>
                            <tr><td>
                                {`Creación de Registro: ${responsePOAEtapa.data[0].createAt}`}
                            </td></tr>
                        </tbody>
                    </table>
                    <Link to={'/poas/' + responsePOAEtapa.data[0].id}>
                        <Button
                            variant="contained"
                            color="default"
                            className={classes.buttonSeeMore}
                            startIcon={<VisibilityIcon />}
                        >
                            Ver más
                        </Button>
                    </Link>
                </div>

            )
        }

        switch (stepIndex) {
            case 0:
                return 'Step 1: Select campaign settings...';
            case 1:
                return 'Step 2: What is an ad group anyways?';
            case 2:
                return 'Step 3: This is the bit I really care about!';
            default:
                return 'Unknown step';
        }
    }

    const getCompleted = async () => {
        try {
            completedLet = {}
            console.log(`${url}/poa?filter[where][codigo]=${POA.codigo}&filter[where][comunidad]=${POA.comunidad}`)
            responseCompleted = await axios.get(`${url}/poa?filter[where][codigo]=${POA.codigo}&filter[where][comunidad]=${POA.comunidad}`)
            console.log('responseCompleted: ', responseCompleted)
            console.log('steps: ', steps)
            steps.map((etapa, i) => {
                if (responseCompleted.data.find(itemPOA => itemPOA.etapa === etapa) !== undefined) {
                    completedLet[i] = true
                }
                else {
                    completedLet[i] = false
                }
            })
            setCompleted(completedLet)
        }
        catch (e) {
            alert('error al cargar etapas completadas, por favor recargue la página e inténtelo de nuevo.')
        }
    }




    useEffect(() => {
        getSteps()
        setActiveStep(0)

        return () => {
            setSteps([])
        }
    }, [])

    useEffect(() => {
        getStepContent(activeStep)

        return () => {
            setStepContent(``)
        }
    }, [activeStep])


    useEffect(() => {
        if (steps.length !== 0) {
            getCompleted()
        }
        return () => {
            setCompleted({})
        }
    }, [steps])







    return (
        <>
            <div className={classes.root + ' col-6'}>
                <Stepper
                    nonLinear
                    activeStep={activeStep}
                    orientation="vertical"
                >
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepButton onClick={handleStep(index)} completed={completed[index]}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <div className="col-6">
                <Typography className={classes.instructions}>Detalles de la etapa: </Typography>
                {/* {getStepContent(activeStep)} */}
                {stepContent}
            </div>
        </>
    );
}

export default POAIndexModalDetailsTabEtapasStepper
