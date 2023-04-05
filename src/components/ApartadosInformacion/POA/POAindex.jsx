import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import {
  DataGrid,
  GridColumnsToolbarButton,
  GridDensitySelector,
  GridFilterToolbarButton,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { Redirect } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PrintIcon from "@material-ui/icons/Print";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ShareIcon from "@material-ui/icons/Share";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import { useParams } from "react-router";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import "../../../css/poas.css";
import MapView from "../../MapView/MapView";
import MapDrawer from "../../MapView/MapDrawer";
import NavbarApp from "../../NavBar/NavbarApp";
import { POAContext, POAProvider } from "../../../context/POAContext";
import {
  ArrowDropUp,
  Assignment,
  CloudUpload,
  ExpandLess,
  FindInPage,
  TableChart,
} from "@material-ui/icons";
import POAindexTabsFilter from "./POAindex-tabsFilter";
import { Drawer, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import POAIndexModalMassiveLoadPOA from "./POAindex-modalMassiveLoadPOA";
import CustomGridPanel from "../../../logic/CustomGridPanel";
import RolValidation from "../../../logic/RolValidation";
import POAIndexModalDetails from "./POAindex-ModalDetails";
import POAindexGenerarExcel from "./POAindex-generarExcel";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

import {
  typesColumnsTableIndex,
  zoomDefaultIndex,
  centerMapDefault,
  venuesDefault,
  pageSizePOAIndexDefault,
  defaultPOASCount,
  typesPOA,
  typesPOASFilterWord,
  typesPOASFilterWordTable,
  typesMapaIndex,
  centerMapDrawerDefault,
  defaultAreaMapCodigoMunicipio,
  defaultAreaMapNombreDepartamento,
  typesEtapasDefaultConfigReporte,
  defaultConfigReporte,
} from "../../../types/types";
import { Button } from "@material-ui/core";
import { timeout } from "../../../logic/generalFunctions";
import POAindexTabsGraphics from "./POAindex-tabsGraphics";
import POAindexModalPreGenerateReporte from "./POAindex-ModalPreGenerateReporte";
import MapIndexAreas from "../../MapView/MapIndexAreas";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
  speedDialIndex: {
    position: "absolute",
    top: "50px",
    right: "1rem",
  },
}));

///actions from button options in modal POA

const POAindex = () => {
  //useParams
  const { idExterno } = useParams();

  //Vars and const

  //VARIABLES GENERACION DE REPORTES
  let responseFixSeguimientoCasos, responseFixPOAS, responsesSeguimientoCasos;
  /////////////////////////////////////

  const url = process.env.REACT_APP_BACKEND_API_URL;
  let config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` },
  };

  let venuesData = [];
  let responseOwnerId;
  let responsePOAGraphic = [];
  let responsePOASReporte = [];
  let POASReporteDepuradoEtapas = [];
  let responsePOAReporte;
  let responsePOASXLS = [];
  let responsePOASCount, responsePOASUniqueCount;

  let filterTableColumn = typesPOASFilterWordTable.filterTableColumn;
  let filterTableValue = typesPOASFilterWordTable.filterTableValue;
  let filterTableOperator = typesPOASFilterWordTable.filterTableOperator;

  let markersLet = [];
  var filter = "";

  //registros poas
  let cantidadTemporalPOASFiltrados;
  let cantidadTemporalTotalPOASFiltrados;
  //poas unicos
  let cantidadTemporalPOASUniqueFiltrados;
  let cantidadTemporalTotalPOASUniqueFiltrados;

  // Configuraciones mapas
  const areaLet = {
    type: "FeatureCollection",
    features: [],
  };
  let municipiosLet = areaLet, departamentosLet = areaLet;
  const drawConfig = {
    edit: false,
    delete: false,
    rectangle: false,
    line: false,
    polygon: false,
    circle: false,
    polyline: false,
    marker: false,
    circlemarker: false,
  };


  //useContext

  const {
    POA,
    setPOA,
    POAS,
    setPOAS,
    totalPOASCount,
    setTotalPOASCount,
    filteredPOASCount,
    setFilteredPOASCount,
    totalPOASUniqueCount,
    setTotalPOASUniqueCount,
    filteredPOASUniqueCount,
    setFilteredPOASUniqueCount,
    POASTable,
    setPOASTable,
    POASFilterWord,
    setPOASFilterWord,
    POASFilterWordTable,
    setPOASFilterWordTable,
    POASGraphic,
    setPOASGraphic,
    POASXLS,
    setPOASXLS,

    POASYCasosReporte,
    setPOASYCasosReporte,
    POASReporte,
    setPOASReporte,
    CasosReporte,
    setCasosReporte,
    configReporte,
    setConfigReporte,

    markerDataPOAIndex,
    setMarkerDataPOAIndex,
    markerDataPOAIndexTotal,
    setMarkerDataPOAIndexTotal,
    typesViewMapaIndex,

    areaMapNombreDepartamento,
    setAreaMapNombreDepartamento,
    areaMapCodigoMunicipio,
    setAreaMapCodigoMunicipio,
    openPopupMarker, setOpenPopupMarker
  } = useContext(POAContext);

  /* //useStyles */
  const classes = useStyles();

  //useState
  const [openModalDetailPOA, setOpenModalDetailPOA] = useState(false);
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [openSpeedDialEdit, setOpenSpeedDialEdit] = useState(false);
  const [openSpeedDialIndex, setOpenSpeedDialIndex] = useState(false);
  const [redirectGeneratePOAReport, setRedirectGeneratePOAReport] =
    useState(false);
  const [redirectCreatePOA, setRedirectCreatePOA] = useState(false);
  const [redirectEditPOA, setRedirectEditPOA] = useState(false);
  const [redirectSeeSeguimientoCasosPOA, setRedirectSeeSeguimientoCasosPOA] =
    useState(false);
  const [redirectNewSeguimientoCasosPOA, setRedirectNewSeguimientoCasosPOA] =
    useState(false);

  const [stateSwipeable, setStateSwipeable] = useState(false);
  const [openModalMassiveLoadPOAS, setOpenModalMassiveLoadPOAS] =
    useState(false);
  const [openModalPreGenerateReporte, setOpenModalPreGenerateReporte] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [columnField, setColumnField] = useState();
  const [filterValue, setFilterValue] = useState();
  const [filterModel, setFilterModel] = useState({
    items: [{ columnField: "codigo", operatorValue: "contains", value: "" }],
  });
  const [page, setPage] = useState(0);
  const [redirectReporte, setRedirectReporte] = useState(false);
  //const [loadingMap, setLoadingMap] = useState(true)
  //const [modalNoData, setModalNoData] = useState(false)

  const [sortModel, setSortModel] = useState([
    // { field: 'nombrePOA', sort: 'asc' },
  ]);
  const [stateHoverGraphics, setStateHoverGraphics] = useState({
    raised: false,
    shadow: 1,
  });

  // configuraciones mapas
  const [areasMapDrawer, setAreasMapDrawer] = useState({});
  const [centerMap, setCenterMap] = useState(centerMapDefault);
  const [center, setCenter] = useState(centerMapDrawerDefault);

  const [zoom, setZoom] = useState(zoomDefaultIndex);
  const [venues, setVenues] = useState(venuesDefault);

  //useEffect-------------------------------------------------------------------------------
  ///desmontaje de componente
  useEffect(
    () => () => {
      //console.log("DESMONTANDO COMPONENTE")
      resetValues();
    },
    []
  );



  useEffect(() => {
    //console.log('POASXLS en useeffect: ', POASXLS)

    //Si la longitud del array de POAS listos Para generar el XLS
    // es superior a cero simula un click en el modulo.

    if (POASXLS.length > 0) {
      document.querySelector("#buttonXLS").click();
    }
    return () => { };
  }, [POASXLS]);

  useEffect(() => {
    (async () => {
      //condicional si viene con id en url
      if (idExterno) {
        await getPOA(idExterno);
      }
      // setPOASFilterWordTable(typesPOASFilterWordTable)
      // setPOASFilterWord(typesPOASFilterWord)
      //console.log('INICIALIZACION DEL USEEFFECT INICIAL')
      await getPOASCount(true);
      //console.log('INICIALIZACION DEL USEEFFECT INICIAL despues de')
    })();
    setOpenPopupMarker(false)
    // return () => {
    // }
  }, []);

  useEffect(() => {
    //console.log('typesViewMapaIndex on index: ', typesViewMapaIndex)

    switch (typesViewMapaIndex) {
      case typesMapaIndex.departamentos:
        departamentosLet = require("../../../maps/Departamentos.json");
        setAreasMapDrawer({
          departamentos: departamentosLet,
        });
        //console.log('after set departments')
        break;
      case typesMapaIndex.municipios:
        municipiosLet = require("../../../maps/Municipios.json");
        setAreasMapDrawer({
          municipios: municipiosLet,
        });
        break;
      default:
        break;
    }

    return () => { };
  }, [typesViewMapaIndex]);

  useEffect(() => {
    console.log('cargando mapdrawer setAreasMapDrawer')

    return () => {

    }
  }, [areasMapDrawer])

  ////////////////////////////////useeffect's
  // useEffect(async () => {
  //   if (areaMapCodigoMunicipio !== defaultAreaMapCodigoMunicipio) {
  //     console.log('paso 2')
  //     await getDetailsLayerPopup();
  //   }
  //   return () => {
  //     setAreaMapCodigoMunicipio(defaultAreaMapCodigoMunicipio);
  //   };
  // }, [areaMapCodigoMunicipio]); //cambia codigo de municipio seleccionado en el mapa de municipio, al hacer click

  // useEffect( () => {


  //   if (areaMapNombreDepartamento !== defaultAreaMapNombreDepartamento) {
  //     //console.log('cambio en departamento: ', areaMapNombreDepartamento)
  //     console.log('paso 2')
  //     await getDetailsLayerPopup();
  //   }
  //   return () => {
  //     setAreaMapNombreDepartamento(defaultAreaMapNombreDepartamento);
  //   };
  // }, [areaMapNombreDepartamento]);//cambia codigo de departamento seleccionado en el mapa de departamento, al hacer click

  useEffect(() => {
    //console.log('----------cambio en los filtros tabla')

    let active = true;
    (async () => {
      setLoading(true);
      if (!(await isUpdateFilterTable())) {
        //console.log('dentro del if')
        await getPOASCount();
        await getPOASMarkers();
        await getPOASTable();
        if (!active) {
          return;
        }
      } else {
        //console.log('dentro del else')
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [POASFilterWordTable]);

  useEffect(() => {
    (async () => {
      //console.log('----------cambio en los filtros estáticos')
      await getPOASCount();
      //si la cantidad de poas filtrados es la  total usa
      //la funcion para obtener marcadores de una manera más rápida
      await getPOASMarkers();
      await getPOASTable();
    })();

    return () => { };
  }, [POASFilterWord]);

  useEffect(() => {
    //console.log('page:', page);
    getPOASTable();
  }, [page]);

  useEffect(() => {
    if (idExterno) {
      getPOA(idExterno);
      //console.log('idExterno', idExterno)
    }
  }, [idExterno]);

  useEffect(() => {
    if (openModalDetailPOA === true) {
      setMarker();
    } else {
      // setMarkers()
      // getPOASMarkers()
    }
  }, [openModalDetailPOA]);

  useEffect(() => {
    //console.log('POASYCasosReporte: ', POASYCasosReporte)
    // window.print();
  }, [POASYCasosReporte]);

  //functions

  const resetValues = () => {
    setTotalPOASCount(defaultPOASCount);
    setFilteredPOASCount(defaultPOASCount);
    setTotalPOASUniqueCount(defaultPOASCount);
    setFilteredPOASUniqueCount(defaultPOASCount);
    setPOASFilterWordTable(typesPOASFilterWordTable);
    setPOASFilterWord(typesPOASFilterWord);
    setVenues(venuesDefault);
  };

  const isUpdateFilterTable = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // console.log('condicion primordial: ',
        //   'value equal: ', POASFilterWordTable.filterTableValue === filterModel.items[0].value,
        //   'colum equal: ', POASFilterWordTable.filterTableColumn === filterModel.items[0].columnField,
        //   'operator equal: ', POASFilterWordTable.filterTableOperator === filterModel.items[0].operatorValue
        // )
        if (
          POASFilterWordTable.filterTableValue === filterModel.items[0].value &&
          POASFilterWordTable.filterTableColumn ===
          filterModel.items[0].columnField &&
          POASFilterWordTable.filterTableOperator ===
          filterModel.items[0].operatorValue
        ) {
          resolve(true);
          return;
        }
        setFilterModel({
          items: [
            {
              columnField: POASFilterWordTable.filterTableColumn,
              operatorValue: POASFilterWordTable.filterTableOperator,
              value: POASFilterWordTable.filterTableValue,
            },
          ],
        });
        resolve(false);
      }, 300); // simulate network latency
      //}, Math.random() * 500 + 100); // simulate network latency
    });
  };

  function loadServerRows(sortModel, data) {
    return new Promise((resolve) => {
      //console.log('sortModel: ', sortModel)
      //console.log('data: ', data)
      //   setTimeout(() => {
      //     if (sortModel.length === 0) {
      //       resolve(data.rows);
      //       return;
      //     }
      //     const sortedColumn = sortModel[0];
      //     let sortedRows = [...data.rows].sort((a, b) =>
      //       String(a[sortedColumn.field]).localeCompare(String(b[sortedColumn.field])),
      //     );
      //     if (sortModel[0].sort === 'desc') {
      //       sortedRows = sortedRows.reverse();
      //     }
      //     resolve(sortedRows);
      //   }, Math.random() * 500 + 100); // simulate network latency
    });
  }

  const handleSortModelChange = (newModel) => {
    //console.log('cambiandoNewModel: ', newModel)
  };

  ///////////////////////FILTER CHANGE TABLE ////////////////////////////////

  const onFilterChange = useCallback(async (params) => {
    filterTableColumn = params.filterModel.items[0].columnField;
    filterTableValue = params.filterModel.items[0].value;
    filterTableOperator = params.filterModel.items[0].operatorValue;
    setPOASFilterWordTable({
      ...POASFilterWordTable,
      ["filterTableColumn"]: filterTableColumn,
      ["filterTableValue"]: filterTableValue,
      ["filterTableOperator"]: filterTableOperator,
    });
  }, []);

  ////////////////////////////////////GET POAS FOR XLS ///////////////////

  const getPOASXLS = async () => {
    //console.log('obteniendo POAS XLS')
    filter = "";
    updateFilterString();
    try {
      responsePOASXLS = await axios.get(`${url}/poa${filter}`);
      //console.log('ResponsePOASXLS: ', responsePOASXLS)
      setPOASXLS(responsePOASXLS.data);
    } catch (e) {
      alert("Error al cargar datos para la tabla exportable .XLS");
    }
  };

  ////////////////////////////////////GET POAS FOR GRAPHICS ///////////////////
  const getPOASGraphic = async () => {
    filter = `?filter[fields][id]=true&filter[fields][tipoComunidad]=true&filter[fields][sector]=true&filter[fields][etapa]=true&filter[fields][estado]=true`;
    updateFilterString();
    //console.log('getPOASGraphic: ', filter)
    try {
      responsePOAGraphic = await axios.get(`${url}/poa-unique${filter}`);
      setPOASGraphic(responsePOAGraphic.data);
    } catch (e) {
      alert("Error al cargar datos de las gráficas");
    }
  };

  ///////////////////////////////////GENERACION DE reporte///////////////
  const getSeguimientoCasos = async (POASIn) => {
    responsesSeguimientoCasos = await Promise.all(
      POASIn.map((POAIn) => {
        return axios.get(`${url}/poas/${POAIn.id}/seguimiento-casos`);
      })
    );
    return concatResponseData(responsesSeguimientoCasos);
  };

  const preGenerateReporte = async () => {
    setConfigReporte(defaultConfigReporte);
    handleOpenModalPreGenerateReporte();
  };

  const generateReporte = async () => {
    try {
      filter = "?filter[order]=etapa%20DESC";
      // filter = '?filter[order]=codigo%20DESC'
      updateFilterString();
      // console.log('url de etapa: ', `${url}/poa${filter}`)
      responsePOASReporte = await axios.get(`${url}/poa${filter}`);

      // switch (configReporte.etapas) {
      //   case typesEtapasDefaultConfigReporte.todasLasEtapas:
      //     {
      //       console.log('caso todas las etapas')
      //       setPOASReporte(responsePOASReporte.data);
      //       break;
      //     }
      //   case typesEtapasDefaultConfigReporte.ultimaEtapa:
      //     {
      //       console.log('caso ultima etapa')
      //       let POASReporteDepuradoEtapas = [];
      //       responsePOASReporte.data.map((item) => {
      //         if (POASReporteDepuradoEtapas.find(element => element.codigo === item.codigo) === undefined) {
      //           POASReporteDepuradoEtapas.push(item)
      //         }
      //       });
      //       setPOASReporte(POASReporteDepuradoEtapas);
      //       break;
      //     }
      //   default:
      //     {
      //       console.log('def caso todas las etapas')
      //       setPOASReporte(responsePOASReporte.data);
      //       break;
      //     }
      // }

      if (
        configReporte.etapas === typesEtapasDefaultConfigReporte.todasLasEtapas
      ) {
        setPOASReporte(responsePOASReporte.data);
        if (configReporte.casosSeguimiento === "si") {
          responseFixSeguimientoCasos = await getSeguimientoCasos(
            responsePOASReporte.data
          ); // consulta los casos de seguimiento deacuerdo a unos POAS ingresados
          // console.log('responseFixSeguimientoCasos: ', responseFixSeguimientoCasos)
          setPOASYCasosReporte(
            concatPOASCasos(
              responsePOASReporte.data,
              responseFixSeguimientoCasos
            )
          ); //concatena los casos de seguimiento a sus respectivos POAS
        } else {
          setPOASYCasosReporte(concatPOASCasos(responsePOASReporte.data, []));
        }
      } else {
        //console.log('dentro del else')
        POASReporteDepuradoEtapas = [];
        responsePOASReporte.data.map((item) => {
          if (
            POASReporteDepuradoEtapas.find(
              (element) => element.codigo === item.codigo
            ) === undefined
          ) {
            //console.log(`poa cod: ${item.codigo} no existe, agregado`)
            POASReporteDepuradoEtapas.push(item);
          }
        });
        setPOASReporte(POASReporteDepuradoEtapas);
        if (configReporte.casosSeguimiento === "si") {
          responseFixSeguimientoCasos = await getSeguimientoCasos(
            POASReporteDepuradoEtapas
          ); // consulta los casos de seguimiento deacuerdo a unos POAS ingresados
          //console.log('responseFixSeguimientoCasos: ', responseFixSeguimientoCasos)
          setPOASYCasosReporte(
            concatPOASCasos(
              POASReporteDepuradoEtapas,
              responseFixSeguimientoCasos
            )
          ); //concatena los casos de seguimiento a sus respectivos POAS
        } else {
          setPOASYCasosReporte(concatPOASCasos(POASReporteDepuradoEtapas, []));
        }
      }
      setRedirectReporte(true);
    } catch (e) {
      // console.log('error: ', e);
      alert("error al generar Reporte, inténtelo de nuevo");
    }
  };

  const concatResponseData = (responsesIn) => {
    return responsesIn
      .map((responseIn) => {
        return responseIn.data;
      })
      .reduce((pre, cur) => {
        return pre.concat(cur);
      });
  };

  const concatPOASCasos = (POAS, Casos) => {
    let letPOAS = POAS;
    POAS.map((POA, i) => {
      let casosFilter = [];
      if (Casos.find((Caso) => Caso.poaId === POA.id) !== undefined) {
        Casos.map((Caso) => {
          if (Caso.poaId === POA.id) {
            casosFilter.push(Caso);
          }
        });
      }
      letPOAS[i].seguimientoCasos = casosFilter;
    });
    return letPOAS;
  };

  //////////////////////////////////////////////////////////////////////////

  const settingPage = (newPage) => {
    if (newPage.page === undefined) {
      setPage(0);
    } else {
      setPage(newPage.page);
    }
  };

  const validationPreviusFilter = (filter) => {
    if (filter === (undefined || "")) {
      return "?";
    } else {
      return "&";
    }
  };

  const updateFilterString = () => {
    if (POASFilterWord.filter1 !== "") {
      filter = filter.concat(
        `${validationPreviusFilter(filter)}filter[where][sector]=${POASFilterWord.filter1
        }`
      );
    }
    if (POASFilterWord.filter2 !== "") {
      // console.log('filter2 on If: ', POASFilterWord.filter2);
      filter = filter.concat(
        `${validationPreviusFilter(filter)}filter[where][tipoComunidad]=${POASFilterWord.filter2
        }`
      );
    }
    if (POASFilterWord.filter3 !== "") {
      // console.log('filter3 on If: ', POASFilterWord.filter3);

      filter = filter.concat(
        `${validationPreviusFilter(filter)}filter[where][estado]=${POASFilterWord.filter3
        }`
      );
    }
    if (POASFilterWord.filter4 !== "") {
      // console.log('filter4 on If: ', POASFilterWord.filter4);
      filter = filter.concat(
        `${validationPreviusFilter(filter)}filter[where][etapa]=${POASFilterWord.filter4
        }`
      );
    }
    if (
      POASFilterWordTable.filterTableValue !== undefined &&
      POASFilterWordTable.filterTableValue !== "" &&
      POASFilterWordTable.filterTableValue !== " " &&
      POASFilterWordTable.filterTableOperator === "contains"
    ) {
      filter = filter.concat(
        `${validationPreviusFilter(filter)}filter[where][${POASFilterWordTable.filterTableColumn
        }][like]=%25${POASFilterWordTable.filterTableValue}%25`
      );
    }
  };

  const getPOASCount = async (isTotal = false) => {
    //console.log('1')
    try {
      filter = "";
      updateFilterString();
      //console.log('filter: ', filter)
      // console.log('allurl: ', `${url}/poa/count${filter}`);
      responsePOASCount = await axios.get(`${url}/poa/count${filter}`);
      responsePOASUniqueCount = await axios.get(`${url}/poa-unique/count${filter}`);
      // console.log('istotal', isTotal);
      console.log('consulta: ', `${url}/poa-unique/count${filter}`)
      if (isTotal === true) {
        //total registros
        setTotalPOASCount(responsePOASCount.data.count);
        setFilteredPOASCount(responsePOASCount.data.count);
        cantidadTemporalPOASFiltrados = responsePOASCount.data.count;
        cantidadTemporalTotalPOASFiltrados = responsePOASCount.data.count;
        //poas unicos
        setTotalPOASUniqueCount(responsePOASUniqueCount.data.count);
        setFilteredPOASUniqueCount(responsePOASUniqueCount.data.count);
        cantidadTemporalPOASUniqueFiltrados = responsePOASUniqueCount.data.count;
        cantidadTemporalTotalPOASUniqueFiltrados = responsePOASUniqueCount.data.count;
      } else {
        //total registros
        setFilteredPOASCount(responsePOASCount.data.count);
        filter === ""
          ? (cantidadTemporalPOASFiltrados = cantidadTemporalTotalPOASFiltrados)
          : (cantidadTemporalPOASFiltrados = responsePOASCount.data.count);
        //registros unicos
        setFilteredPOASUniqueCount(responsePOASUniqueCount.data.count);
        filter === ""
          ? (cantidadTemporalPOASUniqueFiltrados = cantidadTemporalTotalPOASUniqueFiltrados)
          : (cantidadTemporalPOASUniqueFiltrados = responsePOASUniqueCount.data.count);
      }
      setTimeout(() => { }, 3000);
      //console.log('cantidadPOASFiltrados: ', cantidadTemporalPOASFiltrados)
      //console.log('cantidadTotalPOASFiltrados: ', cantidadTemporalTotalPOASFiltrados)
    } catch (e) {
      alert(
        "Error al cargar la cantidad de POAS en el SNICPLI, íntentelo de nuevo. Si persiste el inconveniente comuníquese con el administrador."
      );
    }
  };

  const getPOASTable = async () => {
    //console.log('3')
    filter = `?filter[offset]=${page * pageSizePOAIndexDefault
      }&filter[limit]=${pageSizePOAIndexDefault}`;
    updateFilterString();
    try {
      const response = await axios.get(`${url}/poa${filter}`);
      setPOASTable(response.data);
    } catch (e) {
      alert("Error al cargar POAS, recargue la página e inténtelo de nuevo.");
    }
  };

  const getPOASMarkers = async () => {
    // console.log('2')
    markersLet = [];
    // if (totalPOASCount === filteredPOASCount) {
    if (cantidadTemporalPOASFiltrados === cantidadTemporalTotalPOASFiltrados) {
      //console.log('implementación rápida')
      try {
        const responsePOASMarkers = await axios.get(`${url}/poas-lat-lngs`);
        responsePOASMarkers.data.map((POA) => {
          let marker = {
            id: POA.id,
            nombre: POA.id.toString(),
            ubicacion: [POA.latitud, POA.longitud],
            description: POA.id.toString(),
          };
          markersLet.push(marker);
        });
        // console.log('markersLet: ', markersLet);
        setVenues(markersLet);
      } catch (e) {
        // console.log('error');
        // console.log('e:', e.response)
        alert("error al cargar los marcadores del mapa");
      }
    } else {
      //console.log('implementación lenta')
      filter = "";
      updateFilterString();
      //console.log('poas markers: ', `${url}/poas-latlng${filter}`)
      try {
        const responsePOASMarkers = await axios.get(
          `${url}/poas-latlng${filter}`
        );
        responsePOASMarkers.data.map((POA) => {
          if (POA.latitud !== null && POA.longitud !== null) {
            let marker = {
              id: POA.id,
              nombre: POA.id.toString(),
              ubicacion: [
                POA.latitud ? POA.latitud : "",
                POA.longitud ? POA.longitud : "",
              ],
              description: POA.id.toString(),
            };
            markersLet.push(marker);
          }
        });
        //console.log('markersLet: ', markersLet);
        setVenues(markersLet);
      } catch (e) {
        // console.log('error');
        // console.log('e:', e.response)
        alert("error al cargar los marcadores del mapa");
      }
    }
  };

  //toogle de visualizacion de tabla
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setStateSwipeable(open);
  };

  const getPOA = async (idExterno) => {
    try {
      const response = await axios.get(`${url}/poa/${idExterno}`, config);
      //const response = await axios.get(`${url}/poa?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22ownerId%22%3A%20%22${usuario.id}%22%0A%20%20%7D%0A%7D`,config)
      setPOA(response.data);
      setOpenModalDetailPOA(true);
    } catch (error) {
      //console.log(error.response)
    }
  };

  const editPOA = () => {
    setRedirectEditPOA(true);
  };

  const deletePOA = async (e) => {
    e.preventDefault();
    try {
      if (window.confirm("¿Estás seguro de eliminar el POA?")) {
        await axios.delete(`${url}/poa/${POA.id}`, config);
        alert("POA añadido ha sido eliminado con éxito");
        // getPOAS();
        resetValues();
        await getPOASCount(true);
        await getPOASMarkers();
        await getPOASTable();
        setOpenModalDetailPOA(false);
      }
    } catch (error) {
      //console.log(error.response)
      alert(
        `El POA no ha sido eliminado con éxito, ${error.response.data.error.message}`
      );
    }
  };

  const detailsPOA = (GridCellParams) => {
    setPOA(GridCellParams.row);
    // console.log('poa seteado', POA)
    handleOpenModalDetailPOA();
  };

  const crearPOA = () => {
    setRedirectCreatePOA(true);
  };

  const newSeguimientoCasosPOA = () => {
    setRedirectNewSeguimientoCasosPOA(true);
  };

  const seeSeguimientoCasosPOA = () => {
    setRedirectSeeSeguimientoCasosPOA(true);
  };

  const handleOpenModalMassiveLoadPOAS = () => {
    setOpenModalMassiveLoadPOAS(true);
  };

  const handleCloseModalMassiveLoadPOAS = () => {
    setOpenModalMassiveLoadPOAS(false);
  };

  const handleOpenModalPreGenerateReporte = () => {
    setOpenModalPreGenerateReporte(true);
  };

  const handleCloseModalPreGenerateReporte = () => {
    setOpenModalPreGenerateReporte(false);
  };

  const handleOpenModalDetailPOA = () => {
    setOpenModalDetailPOA(true);
    console.log('apertura de modal')
  };

  const handleCloseModalDetailPOA = () => {
    getPOASMarkers();
    // getPOASMarkersTotal()  //vuelve a consultar a DB marcadores en el mapa principal
    console.log('cierre de ventana modal de detalles de POA')
    setOpenModalDetailPOA(false);
  };

  const handleCloseSpeedDial = () => {
    setOpenSpeedDial(false);
  };

  const handleOpenSpeedDial = () => {
    setOpenSpeedDial(true);
  };

  const handleCloseSpeedDialIndex = () => {
    setOpenSpeedDialIndex(false);
  };

  const handleOpenSpeedDialIndex = () => {
    setOpenSpeedDialIndex(true);
  };

  const PostItemObservancia = async () => {
    try {
      responseOwnerId = await axios.get(`${url}/whoAmI`, config);
      // console.log('responseOwnerId: ', responseOwnerId)
      let itemObservancia = {
        title: POA.nombrePOA ? POA.nombrePOA : "",
        type: "POA",
        ownerId: responseOwnerId.data,
        addedAt: POA.createAt,
        //description:`Sector: ${POA.sector?POA.sector:''}, tipo de comunidad: ${POA.tipoComunidad?POA.tipoComunidad:''}, ubicado en el municipio: ${POA.municipio?POA.municipio:''}`
        description: `Sector: ${POA.sector ? POA.sector : ""}`,
        ref: `${POA.id}`,
      };
      //console.log('el item observancia: ', itemObservancia)
      await axios.post(`${url}/lista-observancia`, itemObservancia, config);
      alert("POA añadido a tu lista de observancia con éxito");
    } catch (error) {
      //console.log(error.response)
      alert("El POA no se ha añadido a tu lista de observancia");
    }
  };

  const observanciaPOA = () => {
    PostItemObservancia();
  };

  const printPOA = () => {
    window.print();
  };

  const generatePOAReport = async () => {
    try {
      filter = `?filter[where][id]=${POA.id}`;
      // updateFilterString()
      responsePOAReporte = await axios.get(`${url}/poa${filter}`);
      setPOASReporte(responsePOAReporte.data);
      responseFixSeguimientoCasos = await getSeguimientoCasos(
        responsePOAReporte.data
      ); // consulta los casos de seguimiento deacuerdo a unos POAS ingresados
      setPOASYCasosReporte(
        concatPOASCasos(responsePOAReporte.data, responseFixSeguimientoCasos)
      ); //concatena los casos de seguimiento a sus respectivos POAS
      setRedirectGeneratePOAReport(true);
    } catch (e) {
      //console.log('error: ', e);
      alert("error al generar Reporte individual, inténtelo de nuevo");
    }
  };

  const sharePOA = () => {
    // console.log('en el menu de share')
  };

  const seguimientoCasosPOAS = () => {
    alert(
      "De doble-click sobre el POA al cual desea agregar un registro de caso de seguimiento"
    );
  };

  const actionsDetailsPOA = () => {
    let optionsActionsDetailsPOA = [];

    if (RolValidation([1, 2, 3, 4, 5, 6, 7, 8]) === true) {
      optionsActionsDetailsPOA.push({
        icon: <VisibilityIcon />,
        name: "A lista de observancia",
        function: observanciaPOA,
      });
    }
    // optionsActionsDetailsPOA.push({ icon: <PrintIcon />, name: 'Generar Reporte', function: generateReport })

    optionsActionsDetailsPOA.push({
      icon: <PrintIcon />,
      name: "Imprimir",
      function: printPOA,
    });

    optionsActionsDetailsPOA.push({
      icon: <AssessmentIcon />,
      name: "Generar Reporte",
      function: generatePOAReport,
    });

    if (RolValidation([3, 4, 7, 8]) === true) {
      optionsActionsDetailsPOA.push({
        icon: <EditIcon />,
        name: "Editar",
        function: editPOA,
      });
    }
    if (RolValidation([4, 7, 8]) === true) {
      optionsActionsDetailsPOA.push({
        icon: <DeleteForeverIcon />,
        name: "Eliminar",
        function: deletePOA,
      });
    }
    //optionsActionsDetailsPOA.push({ icon: <ShareIcon />, name: 'Compartir', function:sharePOA })
    if (RolValidation([3, 4, 7, 8]) === true) {
      optionsActionsDetailsPOA.push({
        icon: <PostAddIcon />,
        name: "Agregar seguimiento al caso",
        function: newSeguimientoCasosPOA,
      });
    }
    optionsActionsDetailsPOA.push({
      icon: <Assignment />,
      name: "Ver casos de seguimiento en detalle",
      function: seeSeguimientoCasosPOA,
    });

    return optionsActionsDetailsPOA;
  };

  // const generateReport = () => {
  //   console.log('function de generar reporte ')

  // }

  const actionsIndex = () => {
    let options = [];

    if (RolValidation([3, 4, 7, 8]) === true) {
      options.push({
        icon: <PostAddIcon />,
        name: "Registrar nuevo POA",
        function: crearPOA,
      });
    }
    options.push({ icon: <PrintIcon />, name: "Imprimir", function: printPOA });
    options.push({
      icon: <AssessmentIcon />,
      name: "Generar Reporte",
      function: preGenerateReporte,
    });

    if (RolValidation([3, 4, 7, 8]) === true) {
      options.push({
        icon: <FindInPage />,
        name: "Agregar seguimiento al caso",
        function: seguimientoCasosPOAS,
      });
    }

    options.push({
      icon: <TableChart />,
      name: "Ver tabla",
      function: toggleDrawer(true),
    });

    if (RolValidation([6, 7, 8]) === true) {
      options.push({
        icon: <CloudUpload />,
        name: "Carga masiva de POAs",
        function: handleOpenModalMassiveLoadPOAS,
      });
    }
    return options;
  };

  const getDetailsMarker = async (e) => {
    // console.log('e: ', e)
    filter = `?filter[where][latitud]=${e.latlng.lat}&filter[where][longitud]=${e.latlng.lng}&filter[order]=etapa%20DESC`;
    updateFilterString();
    //console.log('url filter markers details: ', `${url}/poa${filter}`)
    try {
      const POASlatlng = await axios.get(`${url}/poa${filter}`);
      let POAlatlngDepurado = [];
      POASlatlng.data.map((item) => {
        if (
          POAlatlngDepurado.find(
            (element) => element.codigo === item.codigo
          ) === undefined
        ) {
          POAlatlngDepurado.push(item);
        }
      });

      // setMarkerDataPOAIndex(POASlatlng.data)
      console.log('MarkerDataPOAIndex --: ', POAlatlngDepurado)
      console.log('MarkerDataPOAIndexTotal --: ', POASlatlng.data)
      setMarkerDataPOAIndex(POAlatlngDepurado);
      setMarkerDataPOAIndexTotal(POASlatlng.data);
    } catch (e) {
      alert("Error al cargar detalles del marcador");
      //console.log('error: ', e.message);
    }
  };

  const getDetailsLayerPopup = async (data, type) => {
    console.log('paso 2')
    // if (areaMapCodigoMunicipio !== defaultAreaMapCodigoMunicipio) {
    //   filter = `?filter[where][codigoMunicipio]=${areaMapCodigoMunicipio}&filter[order]=etapa%20DESC`;
    // } else if (areaMapNombreDepartamento !== defaultAreaMapNombreDepartamento) {
    //   filter = `?filter[where][departamento]=${areaMapNombreDepartamento}&filter[order]=etapa%20DESC`;
    // }
    // filter = `?filter[where][latitud]=${e.latlng.lat}&filter[where][longitud]=${e.latlng.lng}&filter[order]=codigo%20DESC`
    if (type === 'municipio') {
      filter = `?filter[where][codigoMunicipio]=${data}&filter[order]=etapa%20DESC`;
    }
    else if (type === 'departamento') {
      filter = `?filter[where][departamento]=${data}&filter[order]=etapa%20DESC`;
    }
    updateFilterString();
    // console.log(`${url}/poa${filter}`)
    try {
      const POASlatlng = await axios.get(`${url}/poa${filter}`);
      let POAlatlngDepurado = [];
      POASlatlng.data.map((item) => {
        if (
          POAlatlngDepurado.find(
            (element) => element.codigo === item.codigo
          ) === undefined
        ) {
          POAlatlngDepurado.push(item);
        }
      });
      // setMarkerDataPOAIndex(POASlatlng.data)
      setMarkerDataPOAIndex(POAlatlngDepurado);
    } catch (e) {
      alert("Error al cargar detalles del marcador");
      //console.log('error: ', e.message);
    }
  };

  const setMarker = () => {
    if (POA.municipio) {
      setVenues([
        {
          id: POA.id,
          nombre: POA.nombrePOA ? POA.nombrePOA : "marker",
          ubicacion: [
            POA.latitud ? POA.latitud : "",
            POA.longitud ? POA.longitud : "",
          ],
          description: POA.estado ? POA.estado : "El nuevo marcador",
        },
      ]);
      setCenterMap({ lat: POA.latitud, lng: POA.longitud });
      setZoom(11);
    } else {
      setVenues([]);
      setCenterMap(centerMapDefault);
      setZoom(5);
    }
  };

  let optionsActionsIndex = actionsIndex();
  let optionsActionsDetailsPOA = actionsDetailsPOA();

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridColumnsToolbarButton />
        <GridFilterToolbarButton />
        <GridDensitySelector />
        <GridToolbarExport />
        <Button
          // variant="contained"
          color="primary"
          // className={classes.button}
          size="small"
          startIcon={<InsertDriveFileIcon />}
          onClick={getPOASXLS}
        >
          Generar XLS
        </Button>
        <Button
          color="primary"
          size="small"
          startIcon={<AssessmentIcon />}
          onClick={preGenerateReporte}
        >
          Generar Reporte
        </Button>
      </GridToolbarContainer>
    );
  };

  return (
    <div className="row m-0 w-100">
      <NavbarApp />
      {/* -------------------------------- REDIRECTS -------------------------------- --------------------------------*/}
      {redirectGeneratePOAReport === true ? (
        <Redirect
          to={{
            pathname: "/reporte",
            state: { POASYCasosReporte, typeReporte: "Personalizado" },
          }}
        />
      ) : (
        ""
      )}
      {redirectCreatePOA === true ? (
        <Redirect to={{ pathname: "/poa-create" }} />
      ) : (
        ""
      )}
      {redirectEditPOA === true ? <Redirect to="/poa-edit" POA /> : ""}
      {redirectReporte === true ? (
        <Redirect
          to={{
            pathname: "/reporte",
            state: { POASYCasosReporte, typeReporte: "Personalizado" },
          }}
        />
      ) : (
        ""
      )}
      {redirectSeeSeguimientoCasosPOA === true ? (
        <Redirect
          to={{
            pathname: "/poa-seguimiento-casos",
            state: {
              state: 0,
              type: "see",
            },
          }}
        />
      ) : (
        ""
      )}
      {redirectNewSeguimientoCasosPOA === true ? (
        <Redirect
          to={{
            pathname: "/poa-seguimiento-casos",
            state: {
              state: 1,
              type: "new",
            },
          }}
        />
      ) : (
        ""
      )}

      {/* Modulo de Generación de XLS */}
      <POAindexGenerarExcel />

      {/* -------------------------------- SPEEDDIAL INDEX -------------------------------- -------------------------------- */}
      <div id="speedDialIndexPOAS" className="row w-100">
        <SpeedDial
          ariaLabel="SpeedDial POAS Index"
          hidden={false}
          icon={<SpeedDialIcon />}
          onClose={handleCloseSpeedDialIndex}
          onOpen={handleOpenSpeedDialIndex}
          open={openSpeedDialIndex}
          className={classes.speedDialIndex}
          direction="left"
        >
          {optionsActionsIndex.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.function}
            />
          ))}
        </SpeedDial>
      </div>
      {/* -------------------------------- MAP INDEX -------------------------------- -------------------------------- */}
      <div className="col-12 w-100" id="containerMapIndex">
        {typesViewMapaIndex === typesMapaIndex.marcadores ? (
          <MapView
            venues={venues}
            center={centerMap}
            zoom={zoom}
            simpleVenues={false}
            getDetailsMarker={getDetailsMarker}
          //loadingMap={loadingMap}
          //modalNoData={modalNoData}
          />
        ) : (
          ""
        )}
        {typesViewMapaIndex === typesMapaIndex.municipios ? (
          <MapIndexAreas
            getDetailsLayerPopup={getDetailsLayerPopup}
            label="Mapa Municipios"
            dataLet={areaLet}
            object={areasMapDrawer}
            nameSelect="municipios"
            selectOptions={areasMapDrawer.municipios}
          />
        ) : (
          ""
        )}
        {typesViewMapaIndex === typesMapaIndex.departamentos ? (
          <MapIndexAreas
            getDetailsLayerPopup={getDetailsLayerPopup}
            label="Mapa Departamentos"
            dataLet={areaLet}
            object={areasMapDrawer}
            nameSelect="departamentos"
            selectOptions={areasMapDrawer.departamentos}
          />
        ) : (
          ""
        )}
      </div>
      {/* -------------------------------- BUTTON SHOW TABLE -------------------------------- -------------------------------- */}
      {
        openPopupMarker === false
          ? (
            <div id="buttonShowMap">
              <IconButton
                aria-label="Mostrar tabla"
                color="primary"
                className="pulseSlow"
                onClick={toggleDrawer(true)}
              >
                <ArrowDropUp id="iconButtonShowMap" fontSize="large" />
              </IconButton>
            </div>
          )
          : ''

      }
      {/* -------------------------------- TABS FILTER INDEX -------------------------------- -------------------------------- */}
      {
        openPopupMarker === false
          ? (
            <div id="tabsFilter">
              <POAindexTabsFilter
                /* setLoadingMap={setLoadingMap} */
                getPOASGraphic={getPOASGraphic}
              />
            </div>
          )
          : ''

      }
      {/* -------------------------------- TABS GRAPHICS INDEX -------------------------------- -------------------------------- */}
      {/* <div id="tabsGraphics">
        <POAindexTabsGraphics
          getPOASGraphic={getPOASGraphic}
        />
      </div> */}
      {/* -------------------------------- MODAL TABLE POAS  INDEX -------------------------------- -------------------------------- */}
      <SwipeableDrawer
        id="POASTable"
        anchor={"bottom"}
        open={stateSwipeable}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <DataGrid
          //----------SORTING MODEL-------------------------
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
          //----------DATA-------------------------
          id="dataGridTable"
          columns={typesColumnsTableIndex}
          // rows={POASFiltered5}
          rows={POASTable}
          //------------FILTER ---------------------
          filterMode="server"
          onFilterModelChange={onFilterChange}
          filterModel={filterModel} //modelo del filtro a aplicar
          //autoPageSize={true}

          //-----------------PAGINATION --------------
          pageSize={pageSizePOAIndexDefault} //# archivos por paginacion
          paginationMode="server"
          // paginationMode='client'
          onPageChange={(newPage) => settingPage(newPage)}
          rowCount={filteredPOASCount}
          //-----------------VISUAL DETAILS------------
          autoHeight={true}
          loading={loading}
          density={"compact"}
          components={{
            Toolbar: CustomToolbar,
            // Toolbar: GridToolbar,
            Panel: CustomGridPanel,
          }}
          showToolbar
          //-----------------INTERACTIVITY--------------
          onRowDoubleClick={(GridCellParams) => detailsPOA(GridCellParams)}
          onKeyDown={toggleDrawer(false)}
        />
      </SwipeableDrawer>
      {/* -------------------------------- MODAL DETAILS POA INDEX -------------------------------- -------------------------------- */}
      <POAIndexModalDetails
        openModalDetailPOA={openModalDetailPOA}
        handleCloseModalDetailPOA={handleCloseModalDetailPOA}
        handleCloseSpeedDial={handleCloseSpeedDial}
        handleOpenSpeedDial={handleOpenSpeedDial}
        optionsActionsDetailsPOA={optionsActionsDetailsPOA}
        openSpeedDial={openSpeedDial}
        venues={venues}
        centerMap={centerMap}
        zoom={zoom}
      />
      {/* -------------------------------- MODAL LOAD MASSIVE POAS INDEX -------------------------------- -------------------------------- */}
      <div id="ModalMassiveLoadPOAContainer">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          //className={classes.modal}
          className="d-flex overflow-auto w-100 mx-auto justify-content-center align-items-center"
          open={openModalMassiveLoadPOAS}
          onClose={handleCloseModalMassiveLoadPOAS}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModalMassiveLoadPOAS}>
            <div
              className={
                classes.paper +
                " row d-flex justify-content-between aling-items-center"
              }
              id="ModalMassiveLoadPOA"
              data-spy="scroll"
            >
              <div className="col-12 d-flex justify-content-between mx-2 align-items-center">
                <h3 className="m-0">
                  Carga Masiva de Proyectos, Obras y Actividades (POAS)
                </h3>
              </div>
              <hr className="d-flex justify-content-between align-items-center divisor"></hr>
              <div className="col-12 w-100">
                <POAIndexModalMassiveLoadPOA
                  // getPOAS={getPOAS}
                  getPOASCount={getPOASCount}
                  getPOASMarkers={getPOASMarkers}
                  getPOASTable={getPOASTable}
                />
              </div>
            </div>
          </Fade>
        </Modal>
      </div>

      {/* -------------------------------- MODAL PREGENERTE REPORTE -------------------------------- -------------------------------- */}
      <div id="ModalPreGenerateReporteContainer w-100">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          //className={classes.modal}
          className="d-flex overflow-auto w-100 mx-auto justify-content-center align-items-center"
          open={openModalPreGenerateReporte}
          onClose={handleCloseModalPreGenerateReporte}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModalPreGenerateReporte}>
            <div className="w-75">
              <div
                className={
                  classes.paper +
                  " row d-flex justify-content-between aling-items-center"
                }
                id="ModalPreGenerateReporte"
                data-spy="scroll"
              >
                <div className="col-12 d-flex justify-content-between mx-2 align-items-center">
                  <h3 className="m-0">
                    Configuraciones para generación de reporte
                  </h3>
                </div>
                <hr className="d-flex justify-content-between align-items-center divisor"></hr>
                <div className="col-12 w-100 p-0">
                  <POAindexModalPreGenerateReporte
                    generateReporte={generateReporte}
                  // getPOAS={getPOAS}
                  />
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default POAindex;
