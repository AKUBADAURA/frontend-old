import React, { useContext } from 'react'
import { POAContext } from '../../context/POAContext'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const ReportePiePagina = () => {

    const {
        configReporte
    } = useContext(POAContext)
    return (
        <div className="w-100 mb-3 containerIntro break-after-page">
            <Card variant="outlined" >
                <CardContent className="p-0">
                    <div className="col-12">
                        <p className="mt-4 text-justify textIntro">Notas:</p>
                        <p className="mt-4 text-justify textIntro">{configReporte.cuerpoNota}</p>
                    </div>
                </CardContent>
            </Card>
        </div >

    )
}

export default ReportePiePagina