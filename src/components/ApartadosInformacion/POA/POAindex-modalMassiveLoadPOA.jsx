import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ExcelRenderer } from 'react-excel-renderer';
import { Button, TextField } from '@material-ui/core';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { AttachFile, CloudUpload } from '@material-ui/icons';
import CustomGridPanel from '../../../logic/CustomGridPanel';
import { removeAccents } from '../../../logic/removeAccents';
import { defaultStateMassiveLoad, typesColumnsTableIndex, typesMassiveLoadDetails, typesPOA } from '../../../types/types';
import POAindexModalMassiveLoadPOA1000 from './POAindex-modalMassiveLoadPOA-1000';
import { POAContext, POAProvider } from "../../../context/POAContext";

const POAIndexModalMassiveLoadPOA = (props) => {

  ///vars and const 
  const url = process.env.REACT_APP_BACKEND_API_URL
  let config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
  }

  let responseMunicipios, responseDepartamentos, responseComunidades

  const typesColumnsTableIndexFiltered = typesColumnsTableIndex.filter(column => column.field !== 'createAt')

  //useContext
  const {
    massiveLoadDetails, setMassiveLoadDetails
  } = useContext(POAContext);


  //useState
  const [state, setState] = useState(defaultStateMassiveLoad)

  const [municipios, setMunicipios] = useState([])

  const [departamentos, setDepartamentos] = useState([])

  const [comunidades, setComunidades] = useState([])

  const [uploadingMassiveData, setUploadingMassiveData] = useState(false)

  const [rowsOK, setRowsOk] = useState([])
  const [rowsOKLong, setRowsOKLong] = useState([])

  const fileInput = useRef()

  const renderFile = (fileObj) => {
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {
        setState({
          ...state,
          dataLoaded: true,
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });
  }
  const fileHandler = (event) => {
    if (event.target.files.length) {
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;
      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
        setState({
          ...state,
          uploadedFileName: fileName,
          isFormInvalid: false
        });
        renderFile(fileObj)
      }
      else {
        setState({
          ...state,
          isFormInvalid: true,
          uploadedFileName: ""
        })
      }
    }
  }
  const toggle = () => {
    setState({
      ...state,
      isOpen: !state.isOpen
    });
  }
  const openFileBrowser = () => {
    fileInput.current.click();
  }
  useEffect(() => {
    // console.log(state)
  }, [state])

  useEffect(() => {
    console.log('Municipios: ', municipios)
    return () => {
    }
  }, [municipios])


  function quitAccent(cadena) {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
    return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
  }

  const itemsWithNameNoAccent = (items) => {

    let itemsWithNoAccent = []
    items.map((item) => {
      item.nameNoAccent = quitAccent(item.name)
      itemsWithNoAccent.push(item)
    })
    return itemsWithNoAccent
  }

  const getMunicipiosDepartamentosComunidades = async () => {
    responseMunicipios = await axios.get(`${url}/municipio?filter[fields][id]=true&filter[fields][name]=true&filter[fields][latitud]=true&filter[fields][longitud]=true&filter[fields][departamentoId]=true`)
    responseDepartamentos = await axios.get(`${url}/departamento?filter[fields][id]=true&filter[fields][name]=true&filter[fields][latitud]=true&filter[fields][longitud]=true`)
    responseComunidades = await axios.get(`${url}/comunidad`)
    setMunicipios(itemsWithNameNoAccent(responseMunicipios.data))
    setDepartamentos(itemsWithNameNoAccent(responseDepartamentos.data))
    setComunidades(itemsWithNameNoAccent(responseComunidades.data))
  }

  const fixDataToTable = async () => {
    // console.log('status rows is: ', state.rows)
    let rowsFix = []    //filas del xls con los datos ajustados(lat lng codigo municipio y demás)
    let observaciones = []     //observaciones de los registros que tienen fallas para la carga 
    let lotes = 0
    if (state.rows !== null) {
      state.rows.forEach((row, i) => {
        if (!row[0] && !row[1] && !row[2] && !row[3] && !row[4] && !row[5] && !row[6] && !row[7] && !row[8] && !row[9] && !row[10] && !row[11] && !row[12] && !row[13] && !row[14] && !row[15] && !row[16] && !row[17] && !row[18] && !row[19] && !row[20] && !row[21] && !row[22] && !row[23] && !row[24] && !row[25]) {
          return
        }
        let rowFix = {
          codigo: row[0] === undefined ? typesPOA.codigo : row[0].toString(),
          nombrePOA: row[1] === undefined ? typesPOA.nombrePOA : row[1].toString(),
          esPOMCAS: row[2] === undefined ? typesPOA.esPOMCAS : row[2].toString(),
          ejecutorPOA: row[3] === undefined ? typesPOA.ejecutorPOA : row[3].toString(),
          tieneLicencia: row[4] === undefined ? typesPOA.tieneLicencia : row[4].toString(),
          sector: row[5] === undefined ? typesPOA.sector : row[5].toString(),
          estado: row[6] === undefined ? typesPOA.estado : row[6].toString(),
          departamento: row[7] === undefined ? typesPOA.departamento : row[7].toString(),
          etapa: row[8] === undefined ? typesPOA.etapa : row[8].toString(),
          // fechaPlaneacion: row[9] === undefined ? typesPOA.fechaPlaneacion : (new Date((row[9] - (25567 + 1)) * 86400 * 1000).toUTCString().toISOString()),
          // fechaReal: row[10] === undefined ? typesPOA.fechaReal : ((new Date((row[10] - (25567 + 1)) * 86400 * 1000).toUTCString()).toISOString()),
          // fechaPlaneacion: row[9] === undefined ? typesPOA.fechaPlaneacion : (new Date((row[9] - (25567 + 1)) * 86400 * 1000)).toDateString(),
          // fechaReal: row[10] === undefined ? typesPOA.fechaReal : (new Date((row[10] - (25567 + 1)) * 86400 * 1000)).toDateString(),
          fechaPlaneacion: row[9] === undefined ? typesPOA.fechaPlaneacion : convertDateToISO(row[9]),
          fechaReal: row[10] === undefined ? typesPOA.fechaReal : convertDateToISO(row[10]),
          comunidad: row[11] === undefined ? typesPOA.comunidad : row[11].toString(),
          municipio: row[12] === undefined ? typesPOA.municipio : row[12].toString(),
          region: row[13] === undefined ? typesPOA.region : row[13].toString(),
          totalComunidades: row[14] === undefined ? typesPOA.totalComunidades : row[14].toString(),
          fechaActoAdmin: row[15] === undefined ? typesPOA.fechaActoAdmin : convertDateToISO(row[15]),
          numActoAdmin: row[16] === undefined ? typesPOA.numActoAdmin : row[16].toString(),
          estadoGestion: row[17] === undefined ? typesPOA.estadoGestion : row[17].toString(),
          etapaFinalizada: row[18] === undefined ? typesPOA.etapaFinalizada : row[18].toString(),
          pueblo: row[19] === undefined ? typesPOA.pueblo : row[19].toString(),
          tipoComunidad: row[20] === undefined ? typesPOA.tipoComunidad : row[20].toString(),
          pine: row[21] === undefined ? typesPOA.pine : row[21].toString(),
          esConAcuerdos: row[22] === undefined ? typesPOA.esConAcuerdos : row[22].toString(),
          latitud: row[23] === undefined ? typesPOA.latitud : row[23],
          longitud: row[24] === undefined ? typesPOA.longitud : row[24],
          codigoMunicipio: row[25] === undefined ? typesPOA.codigoMunicipio : row[25],
          ownerId: 0,
          id: i
        }
        if (rowFix.codigoMunicipio === 0 && i !== 0 && rowFix.departamento !== ('' || ' ') && rowFix.municipio !== 'NINGUNO' && rowFix.municipio !== 'SIN MUNICIPIO' && rowFix.municipio !== '' && rowFix.municipio !== ' ') {
          // console.log('if departamento y municipio existen.');
          let departamentoEncontrado = existeDepartamento(rowFix.departamento)
          if (departamentoEncontrado === undefined) {
            // alert(`El departamento "${rowFix.departamento}" del registro #${i + 1}, con código de proyecto "${rowFix.codigo}" no fue encontrado en la base de datos`)
            observaciones.push(`El departamento "${rowFix.departamento}" del registro #${i + 1}, con código de proyecto "${rowFix.codigo}" no fue encontrado en la base de datos`)
            console.log(`El departamento "${rowFix.departamento}" del registro #${i + 1}, con código de proyecto "${rowFix.codigo}" no fue encontrado en la base de datos`)
            return
          }
          else {
            rowFix.departamento = departamentoEncontrado.name
          }
          let municipioEncontrado = existeMunicipio(rowFix.municipio, departamentoEncontrado.id)
          if (municipioEncontrado === undefined) {
            // alert(`El municipio "${rowFix.municipio}" del registro #${i + 1}, con código de proyecto "${rowFix.codigo}" no fue encontrado en la base de datos`)
            observaciones.push(`El municipio "${rowFix.municipio}" en el departamento de ${rowFix.departamento} del registro #${i + 1}, con código de proyecto "${rowFix.codigo}" no fue encontrado en la base de datos`)
            console.log(`El municipio "${rowFix.municipio}" en el departamento de ${rowFix.departamento} del registro #${i + 1}, con código de proyecto "${rowFix.codigo}" no fue encontrado en la base de datos`)
            return
          }
          else {
            rowFix.municipio = municipioEncontrado.name
          }

          //setea codigo de municipio, latitud y longitud en el registro          
          rowFix.codigoMunicipio = municipioEncontrado.id
          rowFix.latitud = municipioEncontrado.latitud
          rowFix.longitud = municipioEncontrado.longitud

          //setea nombre departamento, y municipio con ortografía corregida
          rowFix.municipio = municipioEncontrado.name
          rowFix.departamento = departamentoEncontrado.name
        }
        if (rowFix.codigoMunicipio === 0 && i !== 0 && rowFix.departamento !== (undefined || '' || ' ') && (rowFix.municipio === 'NINGUNO' || rowFix.municipio === 'SIN MUNICIPIO' || rowFix.municipio === '' && rowFix.municipio === ' ')) {
          // console.log('if departamento existe, municipio No.');
          let departamentoEncontrado = existeDepartamento(rowFix.departamento)
          if (departamentoEncontrado === undefined) {
            // alert(`El departamento "${rowFix.departamento}" del registro #${i + 1}, con código de proyecto "${rowFix.codigo}" no fue encontrado en la base de datos`)
            observaciones.push(`El departamento "${rowFix.departamento}" del registro #${i + 1}, con código de proyecto "${rowFix.codigo}" no fue encontrado en la base de datos`)
            console.log(`El departamento "${rowFix.departamento}" del registro #${i + 1}, con código de proyecto "${rowFix.codigo}" no fue encontrado en la base de datos`)
            return
          }
          //setea latitud y longitud en el registro con base en la info del departamento        
          rowFix.latitud = departamentoEncontrado.latitud
          rowFix.longitud = departamentoEncontrado.longitud

          //setea nombre departamento con ortografía corregida
          rowFix.departamento = departamentoEncontrado.name
        }
        // console.log(`"": "{\"latitud\":${rowFix.latitud},\"longitud\":${rowFix.longitud},\"id\":}"`)
        if (i !== 0) { rowsFix.push(rowFix) }
      });
    }
    console.log('rowsFix', rowsFix)
    if (rowsFix.length > 1000) {  //si la data es superior a 1000 se utiliza rowsOkLong
      setRowsOKLong(rowsFix)
    }
    else {
      setRowsOk(rowsFix)
    }

    ///calculo de lotes 
    if (rowsFix.length % 10000 !== 0) {
      lotes = (Math.floor(rowsFix.length / 10000) + 1)
    }
    else {
      lotes = (Math.floor(rowsFix.length / 10000))
    }
    setMassiveLoadDetails({
      ...massiveLoadDetails,
      totalPOAS: rowsFix.length,
      errorPOAS: observaciones.length,
      observaciones: observaciones,
      lotes: lotes

    })

  }
  const convertDateToISO = (dateIn) => {
    let dateJS = new Date((dateIn - (25567 + 1)) * 86400 * 1000)
    dateJS.setDate(dateJS.getDate() - 1)
    let dateJSON = dateJS.toJSON()
    return dateJSON
  }

  const existeDepartamento = (departamentoIn) => {
    let departamentoInNoAccent = quitAccent(departamentoIn.trim())

    let departamentoFinded = departamentos.find(departamento => (departamento.nameNoAccent) === departamentoInNoAccent)
    // console.log('departamentoFinded: ', departamentoFinded);
    return departamentoFinded
  }

  const existeMunicipio = (municipioIn, departamentoIdIn) => {
    let municipioInNoAccent = quitAccent(municipioIn.trim())
    let municipioFinded = municipios.find(municipio => (((municipio.nameNoAccent) === municipioInNoAccent) && ((municipio.departamentoId) === departamentoIdIn)))
    // console.log('municipioFinded: ', municipioFinded);
    return municipioFinded
  }

  const uploadData = async () => {
    let uploadPOAS = 0
    try {
      setUploadingMassiveData(true)
      if (rowsOKLong.length > 0) {
        let lotes = Math.ceil(rowsOKLong.length / 1000)
        console.log('lotes:', lotes)
        for (let index = 0; index < lotes; index++) {
          const rowsOKLongFiltered = rowsOKLong.slice((index * 1000), ((index + 1) * 1000));
          console.log('rowsOKLongFiltered: ', rowsOKLongFiltered)
          await Promise.all(
            rowsOKLongFiltered.map(async item => {
              delete item.id
              await axios.post(`${url}/poa`, item, config)
              console.log('ending single promise')
              uploadPOAS++
              setMassiveLoadDetails({...massiveLoadDetails, uploadPOAS:uploadPOAS})
            })
          )

          console.log('end loop for, lote OK:' + index + 1)
        }
        console.log('end for loop')
      }

      else if (rowsOK.length > 0) {
        await Promise.all(
          rowsOK.map(async item => {
            delete item.id
            await axios.post(`${url}/poa`, item, config)
          })
        )
      }

      setState({
        isOpen: false,
        dataLoaded: false,
        isFormInvalid: false,
        rows: null,
        cols: null
      })
      setUploadingMassiveData(false)
      alert('Se han subido los registros satisfactoriamente')
      // props.getPOAS()
      await props.getPOASCount()
      await props.getPOASMarkers()
      await props.getPOASTable()

    }
    catch (error) {
      alert('Se ha presentado un error por favor inténtelo de nuevo')
      setState({
        isOpen: false,
        dataLoaded: false,
        isFormInvalid: false,
        rows: null,
        cols: null
      })
      console.log('An error occurred:', error.response);
      setUploadingMassiveData(false)
    }
  }


  useEffect(() => {
    console.log('MassiveLoadDetails: ', massiveLoadDetails)

    return () => {

    }
  }, [massiveLoadDetails])




  useEffect(async () => {
    setMassiveLoadDetails(typesMassiveLoadDetails)
    await fixDataToTable()
  }, [state.rows])

  useEffect(() => {
    getMunicipiosDepartamentosComunidades()

  }, [])

  return (
    <>
      <form className="mb-2">
        <div className="d-flex justify-content-between align-items-center my-2">
          <Button color="primary" onClick={openFileBrowser} startIcon={<AttachFile />}> Adjuntar Archivo</Button>
          {state.dataLoaded === true ? <Button onClick={uploadData} variant="contained" color="primary" startIcon={<CloudUpload />}>{uploadingMassiveData === true ? 'Subiendo Información...' : 'Subir Información'}</Button> : ''}
        </div>
        <input type="file" hidden onChange={fileHandler} ref={fileInput} onClick={(event) => { event.target.value = null }} />
        <TextField size="small" className="form-control" id="outlined-basic" label="" value={state.uploadedFileName} variant="outlined" disabled />
        {
          state.isFormInvalid === true
            ? <div style={{ fontStyle: "italic" }}>Por favor seleccione un archivo .xlsx válido</div>
            : ''
        }
      </form>
      {
        rowsOKLong.length > 0
          ? (<POAindexModalMassiveLoadPOA1000 />)
          : (<DataGrid
            density={'compact'}
            rows={rowsOK}
            columns={typesColumnsTableIndexFiltered}
            autoPageSize={true}
            components={{
              Toolbar: GridToolbar,
              Panel: CustomGridPanel
            }}
            autoHeight={true}
            hideFooter={true}
          />)
      }

    </>
  );
}
export default POAIndexModalMassiveLoadPOA