import React, { useContext, useEffect, useState } from 'react'
import { POAContext } from '../../../context/POAContext'
import POAIndexSelectFilter from './POAindex-tabsFilter-filter-SelectFilter'


const POAindexTabsFilterFilter = (props) => {
    const {
        POA, setPOA, 
        POAS, setPOAS, 
        totalPOASCount, 
        filteredPOASCount,
        totalPOASUniqueCount, 
        filteredPOASUniqueCount, 
        POASFilterWord, setPOASFilterWord,
        // POASFiltered1, setPOASFiltered1, 
        // POASFiltered2, setPOASFiltered2,
        // POASFiltered3, setPOASFiltered3,
        // POASFiltered4, setPOASFiltered4,
        // POASFiltered5, setPOASFiltered5,
    } = useContext(POAContext)

        
    // const updaterLevel2 = ()=> {
    //     //props.setLoadingMap(true)
    //     let filterList2, filterList3, filterList4
    //     //setTimeout(() => {
    //         if(valueFilter2!==''){
    //             filterList2 = POASFiltered1.filter(
    //                 (item) => item.tipoComunidad.indexOf(valueFilter2) > -1,
    //             )
    //         }
    //         else {
    //             filterList2= POASFiltered1
    //         }
    //         if (valueFilter3!==''){
    //             filterList3 = filterList2.filter(
    //                 (item) => item.estado.indexOf(valueFilter3) > -1,
    //             )
    //         }
    //         else {
    //             filterList3 = filterList2
    //         }
    //         if (valueFilter4!=='') {
    //             filterList4 = filterList3.filter(
    //                 (item) => item.etapa.indexOf(valueFilter4) > -1,
    //             )
    //         }
    //         else {
    //             filterList4 = filterList3
    //         }
    //         setPOASFiltered2(filterList2)
    //         setPOASFiltered3(filterList3)
    //         setPOASFiltered4(filterList4)
    //         // console.log('FilterList 2:', filterList2)
    //         // console.log('FilterList 3:', filterList3)
    //         // console.log('FilterList 4:', filterList4)            
    //     //}, 10);      
    // }
    // const updaterLevel3 = ()=> {
    //     //props.setLoadingMap(true)
    //     let  filterList3, filterList4
    //     //setTimeout(() => {
    //         if(valueFilter3!==''){
    //             filterList3 = POASFiltered2.filter(
    //                 (item) => item.estado.indexOf(valueFilter3) > -1,
    //             )
    //         }
    //         else {
    //             filterList3 = POASFiltered2
    //         }
    //         if(valueFilter4 !==''){
    //             filterList4 = filterList3.filter(
    //                 (item) => item.etapa.indexOf(valueFilter4) > -1,
    //             ) 
    //         }
    //         else {
    //             filterList4= filterList3
    //         }
    //         setPOASFiltered3(filterList3)
    //         setPOASFiltered4(filterList4)
    //         // console.log('FilterList 3:', filterList3)
    //         // console.log('FilterList 4:', filterList4)            
    //     //}, 10);
    // }
    
    // const updaterLevel4 = ()=> {
    //     //props.setLoadingMap(true)
    //     let  filterList4
    //     //setTimeout(() => {
    //         if(valueFilter4!==''){
    //             filterList4 = POASFiltered3.filter(
    //                 (item) => item.etapa.indexOf(valueFilter4) > -1,
    //             )
    //         }
    //         else {
    //             filterList4 = POASFiltered3
    //         }
    //         setPOASFiltered4(filterList4)
    //         //console.log('FilterList 4:', filterList4)            
    //     //}, 10);

    // }


    // const [valueFilter1, setValueFilter1] = useState('')
    // const [valueFilter2, setValueFilter2] = useState('')
    // const [valueFilter3, setValueFilter3] = useState('')
    // const [valueFilter4, setValueFilter4] = useState('')
    
    // useEffect(() => {
    //     // console.log('updaterLevel2 cambio')
    //     updaterLevel2()
    // }, [valueFilter1])

    // useEffect(() => {
    //     // console.log('updaterLevel3 cambio')
    //     updaterLevel3()
    // }, [valueFilter2])

    // useEffect(() => {
    //     // console.log('updaterLevel4 cambio')
    //     updaterLevel4()
    // }, [valueFilter3])



    return (
        <>
            <POAIndexSelectFilter
            nameShow="Sector económico" 
            urlSelect="sector"
            disabled={false}
            nameFilter={`filter1`}
            value= {POASFilterWord.filter1}
            // objectIn={POAS}
            // setObjectIn={setPOAS}
            // objectOut={POASFiltered1}
            // setObjectOut={setPOASFiltered1}
            // setValue= {setValueFilter1}
            //setLoadingMap={props.setLoadingMap}
            //helperText="Filtro de primer orden"
            /> 
            <POAIndexSelectFilter
            nameShow="Tipo de Comunidad" 
            urlSelect="tipo-comunidad" 
            disabled={false}
            nameFilter={`filter2`}
            value= {POASFilterWord.filter2}
            // objectIn={POASFiltered1}
            // setObjectIn={setPOASFiltered1}
            // objectOut={POASFiltered2}
            // setObjectOut={setPOASFiltered2}
            // value= {valueFilter2}
            // setValue= {setValueFilter2}
            //helperText="Filtro de primer orden"
            /> 
            <POAIndexSelectFilter
            nameShow="Estado" 
            urlSelect="estado" 
            disabled={false}
            nameFilter={`filter3`}
            value= {POASFilterWord.filter3}
            // objectIn={POASFiltered2}
            // setObjectIn={setPOASFiltered2}
            // objectOut={POASFiltered3}
            // setObjectOut={setPOASFiltered3}
            // value= {valueFilter3}
            // setValue= {setValueFilter3}
            //helperText="Filtro de primer orden"
            /> 
            <POAIndexSelectFilter
            nameShow="Etapa" 
            urlSelect="etapa" 
            disabled={false}
            nameFilter={`filter4`}
            value= {POASFilterWord.filter4}
            // objectIn={POASFiltered3}
            // setObjectIn={setPOASFiltered3}
            // objectOut={POASFiltered4}
            // setObjectOut={setPOASFiltered4}
            // value= {valueFilter4}
            // setValue= {setValueFilter4}
            //helperText="Filtro de primer orden"
            />             
            <div className="row form-group d-flex justify-content-end mt-2 mx-auto">
                <label className="col-12 my-0 text-right p-0" htmlFor="cantidadPOAS">{ `Cantidad Total de POAS: ${totalPOASUniqueCount} `}  </label>
                <label className="col-12 my-0 text-right p-0" htmlFor="cantidadPOAS">{ `Cantidad de POAS filtrados: ${filteredPOASUniqueCount} `}  </label>
                <hr className="d-flex justify-content-between mt-auto align-items-center divisor"></hr>
                <label className="col-12 my-0 text-right p-0" htmlFor="cantidadPOAS">{ `Total de registros: ${totalPOASCount} `}  </label>
                <label className="col-12 my-0 text-right p-0" htmlFor="cantidadPOAS">{ `Registros filtrados: ${filteredPOASCount} `}  </label>
                {/* <label htmlFor="cantidadPOAS">{ `Cantidad de POA'S (1er filtro): ${POASCount.filtered1} `}  </label>
                <label htmlFor="cantidadPOAS">{ `Cantidad de POA'S (2do filtro): ${POASCount.filtered2} `}  </label>
                <label htmlFor="cantidadPOAS">{ `Cantidad de POA'S (3er filtro): ${POASCount.filtered3} `}  </label>
                <label htmlFor="cantidadPOAS">{ `Cantidad de POA'S (4to filtro): ${POASCount.filtered4} `}  </label>
                <label htmlFor="cantidadPOAS">{ `Cantidad de POA'S (5to filtro): ${POASCount.filtered5} `}  </label> */}
            </div>

        </>
    )
}

export default POAindexTabsFilterFilter
