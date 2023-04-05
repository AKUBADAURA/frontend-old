import React, { useContext, useEffect, useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { POAContext } from '../../context/POAContext';
import ReporteGraficas from './Reporte-graficas';
import { typesEtapasDefaultConfigReporte, typesTitles } from '../../types/types';

const ReporteIntro = (props) => {

    //useContext
    const {
        configReporte, setConfigReporte
    } = useContext(POAContext)

    const [titleReporte, setTitleReporte] = useState(typesTitles.Default)
    const { typeReporte, POASYCasosReporte } = useContext(POAContext)

    useEffect(() => {
        if (typeReporte === 'Regiones') {
            setTitleReporte(typesTitles.Regiones)
        }
        if (typeReporte === 'Comunidades') {
            setTitleReporte(typesTitles.Comunidades)
        }
        if (typeReporte === 'Personalizado') {
            setTitleReporte(typesTitles.Personalizado)
        }
    }, [])

    return (
        <div className="w-100 mb-3 containerIntro break-after-page">
            <Card variant="outlined" >
                <CardContent className="p-0">
                    {/* CONTAINER TITLE */}
                    <div className="row mb-3" id='titleBoletin'>
                        {/* TITULO SECCION */}
                        <h4 className="col-12 m-3 w-100">{titleReporte.toUpperCase()}</h4>
                        {/* DETALLES DEL POA */}
                    </div>
                    <div className="col-12">
                        <p className="mt-4 text-justify textIntro">
                            El presente es un informe generado por el Sistema Nacional de Información de Consulta Previa Libre
                            e Informada (SNICPLI) de Akubadaura, una herramienta para la organización, manejo y sistematización
                            de información ubicada espacialmente, referente al ejercicio del derecho a la Consulta Previa Libre
                            e Informada (CPLI), por medio del cual se busca realizar el seguimiento, análisis y brindar parámetros
                            para establecer como se ha ejercido el derecho a la CPLI para pueblos indígenas, afro descendientes y raizal.
                            El informe incluye diagramas con agrupaciones estadísticas por sectores económicos, tipos de comunidades afectadas,
                            estado actual de los procesos de consulta previa y la etapa en que se encuentran los Proyectos, Obras y Actividades (POA)
                            consultados para un total de {POASYCasosReporte.length} registro(s).
                        </p>
                        {/* <p className="mt-2 text-justify textIntro"></p> */}
                        {
                            configReporte.graficas === 'si'
                                ? <ReporteGraficas />
                                : ''
                        }
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ReporteIntro
