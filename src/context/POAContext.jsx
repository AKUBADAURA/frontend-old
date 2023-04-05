import React, { createContext, useState } from 'react'
import {
    defaultPOASCount,
    typesPOASFilterWord,
    typesAnexos,
    typesMarkerDataPOAIndex,
    typesNewSeguimientoCasos,
    typesNewSeguimientoCasos1,
    typesNewSeguimientoCasos10,
    typesNewSeguimientoCasos11,
    typesNewSeguimientoCasos12,
    typesNewSeguimientoCasos13,
    typesNewSeguimientoCasos14,
    typesNewSeguimientoCasos15,
    typesNewSeguimientoCasos16,
    typesNewSeguimientoCasos17,
    typesNewSeguimientoCasos18,
    typesNewSeguimientoCasos19,
    typesNewSeguimientoCasos2,
    typesNewSeguimientoCasos2b,
    typesNewSeguimientoCasos3,
    typesNewSeguimientoCasos4,
    typesNewSeguimientoCasos5,
    typesNewSeguimientoCasos6,
    typesNewSeguimientoCasos7,
    typesNewSeguimientoCasos8,
    typesNewSeguimientoCasos9,
    typesPOA,
    typesPOAS,
    typesDefaultReporte,
    typesPOASFilterWordTable,
    typesMapaIndex,
    defaultAreaMapNombreDepartamento,
    defaultAreaMapCodigoMunicipio,
    defaultConfigReporte,
    typesMassiveLoadDetails
} from '../types/types';


export const POAContext = createContext();


export const POAProvider = ({ children }) => {


    const [POA, setPOA] = useState(typesPOA)
    const [totalPOASUniqueCount, setTotalPOASUniqueCount] = useState(defaultPOASCount)
    const [totalPOASCount, setTotalPOASCount] = useState(defaultPOASCount)
    const [filteredPOASCount, setFilteredPOASCount] = useState(defaultPOASCount)
    const [filteredPOASUniqueCount, setFilteredPOASUniqueCount] = useState(defaultPOASCount)
    const [POASFilterWord, setPOASFilterWord] = useState(typesPOASFilterWord)
    const [POASFilterWordTable, setPOASFilterWordTable] = useState(typesPOASFilterWordTable)
    const [markerDataPOAIndex, setMarkerDataPOAIndex] = useState(typesMarkerDataPOAIndex) // POAS a partir de  
    const [markerDataPOAIndexTotal, setMarkerDataPOAIndexTotal] = useState(typesMarkerDataPOAIndex) // POAS a partir de  
    const [POAS, setPOAS] = useState(typesPOAS)
    const [POASGraphic, setPOASGraphic] = useState([])
    const [POASReporte, setPOASReporte] = useState([])
    const [POASYCasosReporte, setPOASYCasosReporte] = useState([])
    const [configReporte, setConfigReporte] = useState(defaultConfigReporte)
    const [POASTable, setPOASTable] = useState([])
    const [POASXLS, setPOASXLS] = useState([])
    const [openPopupMarker, setOpenPopupMarker] = useState(false)

    const [areaMapNombreDepartamento, setAreaMapNombreDepartamento] = useState(defaultAreaMapNombreDepartamento)
    const [areaMapCodigoMunicipio, setAreaMapCodigoMunicipio] = useState(defaultAreaMapCodigoMunicipio)
    const [typeReporte, setTypeReporte] = useState(typesDefaultReporte)
    const [typesViewMapaIndex, setTypesViewMapaIndex] = useState(typesMapaIndex.marcadores)


    const [POASFiltered1, setPOASFiltered1] = useState([])
    const [POASFiltered2, setPOASFiltered2] = useState([])
    const [POASFiltered3, setPOASFiltered3] = useState([])
    const [POASFiltered4, setPOASFiltered4] = useState([])
    const [POASFiltered5, setPOASFiltered5] = useState([])
    
    const [anexos, setAnexos] = useState(typesAnexos)

    const [newSeguimientoCasos, setNewSeguimientoCasos] = useState(typesNewSeguimientoCasos)
    const [newSeguimientoCasos1, setNewSeguimientoCasos1] = useState(typesNewSeguimientoCasos1)
    const [newSeguimientoCasos2, setNewSeguimientoCasos2] = useState(typesNewSeguimientoCasos2)
    const [newSeguimientoCasos2b, setNewSeguimientoCasos2b] = useState(typesNewSeguimientoCasos2b)
    const [newSeguimientoCasos3, setNewSeguimientoCasos3] = useState(typesNewSeguimientoCasos3)
    const [newSeguimientoCasos4, setNewSeguimientoCasos4] = useState(typesNewSeguimientoCasos4)
    const [newSeguimientoCasos5, setNewSeguimientoCasos5] = useState(typesNewSeguimientoCasos5)
    const [newSeguimientoCasos6, setNewSeguimientoCasos6] = useState(typesNewSeguimientoCasos6)
    const [newSeguimientoCasos7, setNewSeguimientoCasos7] = useState(typesNewSeguimientoCasos7)
    const [newSeguimientoCasos8, setNewSeguimientoCasos8] = useState(typesNewSeguimientoCasos8)
    const [newSeguimientoCasos9, setNewSeguimientoCasos9] = useState(typesNewSeguimientoCasos9)
    const [newSeguimientoCasos10, setNewSeguimientoCasos10] = useState(typesNewSeguimientoCasos10)
    const [newSeguimientoCasos11, setNewSeguimientoCasos11] = useState(typesNewSeguimientoCasos11)
    const [newSeguimientoCasos12, setNewSeguimientoCasos12] = useState(typesNewSeguimientoCasos12)
    const [newSeguimientoCasos13, setNewSeguimientoCasos13] = useState(typesNewSeguimientoCasos13)
    const [newSeguimientoCasos14, setNewSeguimientoCasos14] = useState(typesNewSeguimientoCasos14)
    const [newSeguimientoCasos15, setNewSeguimientoCasos15] = useState(typesNewSeguimientoCasos15)
    const [newSeguimientoCasos16, setNewSeguimientoCasos16] = useState(typesNewSeguimientoCasos16)
    const [newSeguimientoCasos17, setNewSeguimientoCasos17] = useState(typesNewSeguimientoCasos17)
    const [newSeguimientoCasos18, setNewSeguimientoCasos18] = useState(typesNewSeguimientoCasos18)
    const [newSeguimientoCasos19, setNewSeguimientoCasos19] = useState(typesNewSeguimientoCasos19)
    //massive load 

    const [massiveLoadDetails, setMassiveLoadDetails] = useState(typesMassiveLoadDetails)
    return (
        <POAContext.Provider value={{
            POA, setPOA,
            POAS, setPOAS,
            totalPOASCount, setTotalPOASCount,
            totalPOASUniqueCount, setTotalPOASUniqueCount,
            filteredPOASCount, setFilteredPOASCount,
            filteredPOASUniqueCount, setFilteredPOASUniqueCount,
            POASTable, setPOASTable,
            typeReporte, setTypeReporte,
            configReporte, setConfigReporte,
            markerDataPOAIndex, setMarkerDataPOAIndex,
            markerDataPOAIndexTotal, setMarkerDataPOAIndexTotal,
            POASFilterWord, setPOASFilterWord,
            POASFilterWordTable, setPOASFilterWordTable,
            POASGraphic, setPOASGraphic,
            POASYCasosReporte, setPOASYCasosReporte,
            POASReporte, setPOASReporte,
            POASXLS, setPOASXLS,
            openPopupMarker, setOpenPopupMarker,
            areaMapNombreDepartamento, setAreaMapNombreDepartamento,
            areaMapCodigoMunicipio, setAreaMapCodigoMunicipio,


            anexos, setAnexos,
            POASFiltered1, setPOASFiltered1,
            POASFiltered2, setPOASFiltered2,
            POASFiltered3, setPOASFiltered3,
            POASFiltered4, setPOASFiltered4,
            POASFiltered5, setPOASFiltered5,


            newSeguimientoCasos, setNewSeguimientoCasos,
            newSeguimientoCasos1, setNewSeguimientoCasos1,
            newSeguimientoCasos2, setNewSeguimientoCasos2,
            newSeguimientoCasos2b, setNewSeguimientoCasos2b,
            newSeguimientoCasos3, setNewSeguimientoCasos3,
            newSeguimientoCasos4, setNewSeguimientoCasos4,
            newSeguimientoCasos5, setNewSeguimientoCasos5,
            newSeguimientoCasos6, setNewSeguimientoCasos6,
            newSeguimientoCasos7, setNewSeguimientoCasos7,
            newSeguimientoCasos8, setNewSeguimientoCasos8,
            newSeguimientoCasos9, setNewSeguimientoCasos9,
            newSeguimientoCasos10, setNewSeguimientoCasos10,
            newSeguimientoCasos11, setNewSeguimientoCasos11,
            newSeguimientoCasos12, setNewSeguimientoCasos12,
            newSeguimientoCasos13, setNewSeguimientoCasos13,
            newSeguimientoCasos14, setNewSeguimientoCasos14,
            newSeguimientoCasos15, setNewSeguimientoCasos15,
            newSeguimientoCasos16, setNewSeguimientoCasos16,
            newSeguimientoCasos17, setNewSeguimientoCasos17,
            newSeguimientoCasos18, setNewSeguimientoCasos18,
            newSeguimientoCasos19, setNewSeguimientoCasos19,
            typesViewMapaIndex, setTypesViewMapaIndex,
            massiveLoadDetails, setMassiveLoadDetails
        }}>
            {children}
        </POAContext.Provider>
    )
}



