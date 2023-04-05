import React, { useContext, useEffect, useParams, useState } from 'react'
import { Redirect } from "react-router-dom";
import { POAContext } from '../../context/POAContext';
import ReporteCuerpo from './ReporteCuerpo';

// Create styles
const Reporte = (props) => {

    const [redirect, setRedirect] = useState()
    const { 
        POASYCasosReporte, setPOASYCasosReporte,
        typeReporte, setTypeReporte 
    } = useContext(POAContext)
    useEffect(() => {
        if (props.location.state) {
            setPOASYCasosReporte(props.location.state.POASYCasosReporte)
            setTypeReporte(props.location.state.typeReporte)
        }
        setTimeout(() => {
            if (!props.location.state) {
                setRedirect(true)
            }
            window.print()
        }, 4000);
        
    }, [])

    return (
        <>
            {redirect === true
                ? <Redirect to="/boletines-reportes" />
                : ''
            }
            <div className="m-0 p-0" id="reportePage">
                <ReporteCuerpo />
            </div>
        </>
    )
}

export default Reporte




