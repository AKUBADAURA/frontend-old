//types of auth module
export const types = {
    login: '[auth] login',
    logout: '[auth] logout',
}


//types poas y casos de seguimiento

export const defaultPOASCount = 0;
export const defaultAreaMapNombreDepartamento = ''
export const defaultAreaMapCodigoMunicipio = 0

export const typesPOASFilterWord = {
    filter1: '',
    filter2: '',
    filter3: '',
    filter4: ''
}
export const typesPOASFilterWordTable = {
    filterTableColumn: 'codigo',
    filterTableValue: '',
    filterTableOperator: 'contains'
}
export const typesMapaIndex = {
    municipios:'municipios',
    departamentos: 'departamentos',
    marcadores: 'marcadores'
}

export const oldtypesPOA = {
    codigo: '',
    nombrePOA: '',
    ejecutorPOA: '',
    estado: '',
    sectorOJ: '',
    sector: '',
    fechaPlaneacion: '',
    fechaEjecucion: '',
    etapa: '',
    departamento: '',
    municipio: '',
    comunidad: undefined,
    tipoComunidad: '',
    etnia: '',
    cantidadPoblacionCert: '',
    totalComunidades: '',
    estadoGestion: '',
    etapaFinalizada: '',
    esConAcuerdos: '',
    pine: '',
    numeroRadicado: '',
    fechaRadicado: '',
    latitud: 0.0000000000,
    longitud: 0.0000000000,
    codigoMunicipio: 0,
    ownerId: 0,
}

// export const newTypesPOA = {
//     codigo: '',
//     nombrePOA: '',
//     *esPOMCAS: '',
//     ejecutorPOA: '',
//     *tieneLicencia:'',
//     sector: '',
//     estado: '',
//     -sectorOJ: '',
//     departamento: '',
//     etapa: '',
//     fechaPlaneacion: '',
//     *fechaReal:'',
//     comunidad: undefined,
//     -fechaEjecucion: '',
//     municipio: '',
//     *region:'',
//     -cantidadPoblacionCert: '',
//     totalComunidades: '',
//     *fechaActoAdmin:'',
//     *numActoAdmin:'',
//     estadoGestion: '',
//     etapaFinalizada: '',
//     no-esUltimo:'',
//     -etnia*pueblo: '',
//     tipoComunidad: '',
//     pine: '',
//     esConAcuerdos: '',
//     -numeroRadicado: '',
//     -fechaRadicado: '',
//     no-tipoRadicado:'',
//     latitud: 0.0000000000,
//     longitud: 0.0000000000,
//     codigoMunicipio: 0,
//     ownerId: 0, }

export const typesPOA = {
    codigo: '',
    nombrePOA: '',
    esPOMCAS: '',
    ejecutorPOA: '',
    tieneLicencia: '',
    sector: '',
    estado: '',
    departamento: '',
    etapa: '',
    fechaPlaneacion: '',
    fechaReal: '',
    comunidad: undefined,
    municipio: '',
    region: '',
    totalComunidades: '',
    fechaActoAdmin: '',
    numActoAdmin: '',
    estadoGestion: '',
    etapaFinalizada: '',
    pueblo: '',
    tipoComunidad: '',
    pine: '',
    esConAcuerdos: '',
    latitud: 0.0000000000,
    longitud: 0.0000000000,
    codigoMunicipio: 0,
    ownerId: 0
}

export const pageSizePOAIndexDefault = 8

export const typesColumnsTableIndex = [
    { field: 'codigo', headerName: 'Código', width: 300 },
    { field: 'nombrePOA', headerName: 'Nombre del POA', width: 300 },
    { field: 'esPOMCAS', headerName: '¿Es POMCAS?', width: 200 },
    { field: 'ejecutorPOA', headerName: 'Ejecutor', width: 200 },
    { field: 'tieneLicencia', headerName: '¿Tiene Licencia?', width: 200 },
    { field: 'sector', headerName: 'Sector', width: 200 },
    { field: 'estado', headerName: 'Estado', width: 200 },
    { field: 'departamento', headerName: 'Departamento', width: 150 },
    { field: 'etapa', headerName: 'Etapa', width: 200 },
    { field: 'fechaPlaneacion', headerName: 'Fecha de Planeación', width: 200 },
    { field: 'fechaReal', headerName: 'Fecha Real', width: 200 },
    { field: 'comunidad', headerName: 'Comunidad', width: 200 },
    { field: 'municipio', headerName: 'Municipio', width: 150 },
    { field: 'region', headerName: 'Región', width: 150 },
    { field: 'totalComunidades', headerName: 'Total de Comunidades', width: 150 },
    { field: 'fechaActoAdmin', headerName: 'Fecha del acto administrativo', width: 150 },
    { field: 'numActoAdmin', headerName: 'Número de acto administrativo', width: 150 },
    { field: 'estadoGestion', headerName: 'Estado Gestión', width: 200 },
    { field: 'etapaFinalizada', headerName: '¿Etapa Finalizada?', width: 200 },
    { field: 'pueblo', headerName: 'Pueblo', width: 200 },
    { field: 'tipoComunidad', headerName: 'Tipo de Comunidad', width: 200 },
    { field: 'pine', headerName: 'PINE', width: 130 },
    { field: 'esConAcuerdos', headerName: '¿Es con acuerdos?', width: 150 },
    { field: 'latitud', headerName: 'Latitud', width: 200 },
    { field: 'longitud', headerName: 'Longitud', width: 200 },
    { field: 'codigoMunicipio', headerName: 'Código del Municipio', width: 200 },
    { field: 'createAt', headerName: 'Fecha creación Registro (GMT 0)', width: 230 },
];
export const oldtypesColumnsTableIndex = [
    { field: 'codigo', headerName: 'Código', width: 300 },
    { field: 'nombrePOA', headerName: 'Nombre del POA', width: 300 },
    { field: 'ejecutorPOA', headerName: 'Ejecutor', width: 200 },
    { field: 'estado', headerName: 'Estado', width: 200 },
    { field: 'sectorOJ', headerName: 'Sector OJ', width: 200 },
    { field: 'sector', headerName: 'Sector', width: 200 },
    { field: 'fechaPlaneacion', headerName: 'Fecha de Planeación', width: 200 },
    { field: 'fechaEjecucion', headerName: 'Fecha de Ejecución', width: 200 },
    { field: 'etapa', headerName: 'Etapa', width: 200 },
    { field: 'departamento', headerName: 'Departamento', width: 150 },
    { field: 'municipio', headerName: 'Municipio', width: 150 },
    { field: 'comunidad', headerName: 'Comunidad', width: 150 },
    { field: 'tipoComunidad', headerName: 'Tipo de Comunidad', width: 200 },
    { field: 'etnia', headerName: 'Etnia', width: 200 },
    { field: 'cantidadPoblacionCert', headerName: 'Cantidad de Población Cert', width: 150 },
    { field: 'totalComunidades', headerName: 'Total de Comunidades', width: 150 },
    { field: 'estadoGestion', headerName: 'Estado Gestión', width: 200 },
    { field: 'etapaFinalizada', headerName: '¿Etapa Finalizada?', width: 200 },
    { field: 'esConAcuerdos', headerName: '¿Es con acuerdos?', width: 150 },
    { field: 'pine', headerName: 'PINE', width: 130 },
    { field: 'numeroRadicado', headerName: 'Número del Radicado', width: 200 },
    { field: 'fechaRadicado', headerName: 'Fecha del Radicado', width: 200 },
    { field: 'createAt', headerName: 'Fecha creación Registro (GMT 0)', width: 230 },
    { field: 'latitud', headerName: 'Latitud', width: 200 },
    { field: 'longitud', headerName: 'Longitud', width: 200 },
    { field: 'codigoMunicipio', headerName: 'Código del Municipio', width: 200 },
];

export const typesPOAS = []


export const typesAnexos = []


export const typesNewSeguimientoCasos = {
    ownerId: 0,
    poaId: ""
}
export const typesNewSeguimientoCasos1 = {
    s1nombreProyecto: "",
    s1reglonEconomico: "",
    s1responsable: "",
    s1operador: "",
    s1financiador: ""
}
export const typesNewSeguimientoCasos2 = {
    s2nombreComunidad: undefined,
    s2pueblo: "",
    s2numeroHabitantes: "",
    s2ubicacionGeografica: {},
    s2reconocimiento: "",
    s2desplazamiento: "",
    s2riesgoExtincion: "",
    s2fragilidadDemografica: ""
}
export const typesNewSeguimientoCasos2b = {
    s2territorio: {
        type: 'FeatureCollection',
        features: []
    },
    s2areaProtegida: {
        type: 'FeatureCollection',
        features: []
    },
    s2areaReservaforestal: {
        type: 'FeatureCollection',
        features: []
    },
    s2areaBaldios: {
        type: 'FeatureCollection',
        features: []
    }
}

export const typesEvent = {
    title: '',
    start: '',
    end: '',
    description: '',
    ownerId: 0
}


export const typesNewSeguimientoCasos3 = {
    s3procesoConsulta: "",
    s3estadoConsulta: "",
    s3consultaConcertada: "",
    s3porqueConsultaConcertada: ""
}
export const typesNewSeguimientoCasos4 = {
    s4participantesComunidad: "",
    s4participantesEntesControl: [],
    s4participantesGobierno: [],
    s4participantesOrganizaciones: []
}
export const typesNewSeguimientoCasos5 = {
    s5documentosPrevioConsulta: "",
    s5fuentesFinanciacion: ""
}
export const typesNewSeguimientoCasos6 = {
    s6garantiaEquipoTecnico: "",
    s6financiacionLogistica: ""
}
export const typesNewSeguimientoCasos7 = {
    s7claridadInformacion: "",
    s7preguntasComunidad: "",
    s7exposicionalcances: ""
}
export const typesNewSeguimientoCasos8 = {
    s8estudioImpactoAmbiental: "",
    s8concertadoEstudio: "",
    s8plasmaConcertado: ""
}
export const typesNewSeguimientoCasos9 = {
    s9planManejoAmbiental: "",
    s9concertadoPlan: "",
    s9plasmaConcertado: ""
}
export const typesNewSeguimientoCasos10 = {
    s10planCompensacion: "",
    s10concertadoCompensacion: "",
    s10plasmaConcertado: ""
}
export const typesNewSeguimientoCasos11 = {
    s11consultaConcertada: "",
    s11relacionPlanVida: "",
    s11relacionPlanSalvaguarda: "",
    s11relacionProtocolosBioculturales: "",
    s11relacionProtocolosCP: ""
}
export const typesNewSeguimientoCasos12 = {
    s12cumplimientoAcuerdos: "",
    s12observaciones: ""
}
export const typesNewSeguimientoCasos13 = {
    s13comiteSeguimientoAcuerdos: "",
    s13comiteReunido: "",
    s13integrantesComite: "",
    s13garantesIndigenas: "",
    s13garantesGobierno: ""
}
export const typesNewSeguimientoCasos14 = {
    s14monitoreoAmbiental: "",
    s14PeriodicidadMonitoreo: "",
    s14participantesMonitoreo: "",
    s14participacionComunidad: ""
}
export const typesNewSeguimientoCasos15 = {
    s15tipoAfectaciones: []
}
export const typesNewSeguimientoCasos16 = {

    s16tipoBeneficios: []
}
export const typesNewSeguimientoCasos17 = {
    s17conflictosGenerados: []
}
export const typesNewSeguimientoCasos18 = {
    s18defensaTerritorial: []
}
export const typesNewSeguimientoCasos19 = {
    s19comentarios: ""
}
export const typesDefaultReporte = 'Regiones'

export const typesNovedadesPOA = [{
    nombrePOA: '',
    ejecutorPOA: '',
    createAt: '',
    municipio: ''
}]

export const typesNovedadesDocs = [{
    name: '',
    route: '',
    type: '',
    createAt: ''
}]

export const typesNovedadesNoticiasCPLI = [{
    titulo: '',
    link: '',
    fechaPublicacion: '',
    imagen: ''
}]

///massive load POAS

export const typesMassiveLoadDetails = {
    totalPOAS: 0,
    uploadPOAS: 0,
    errorPOAS:0,
    lotes: 0,
    observaciones: []
}


//config Maps

export const centerMapDefault = { 'lat': 4.6501730300, 'lng': -74.1073590000 }
export const centerMapDrawerDefault = [4.6501730300, -74.1073590000]
export const zoomDefault = 6
export const venuesDefault = []
export const zoomDefaultIndex = 6


export const defaultCenterMapDrawer = [4.6501730300, -74.1073590000]
export const defaultZoomMapDrawer = 13
export const defaultLabelMapDrawer = ''

export const typesMarkerPOAIndex = {
    id: '',
    codigo: '',
    nombrePOA: '',
    esPOMCAS: '',
    ejecutorPOA: '',
    tieneLicencia: '',
    sector: '',
    estado: '',
    departamento: '',
    etapa: '',
    fechaPlaneacion: '',
    fechaReal: '',
    // comunidad: undefined,
    comunidad: '',
    municipio: '',
    region: '',
    totalComunidades: '',
    fechaActoAdmin: '',
    numActoAdmin: '',
    estadoGestion: '',
    etapaFinalizada: '',
    pueblo: '',
    tipoComunidad: '',
    pine: '',
    esConAcuerdos: '',
    latitud: 0.0000000000,
    longitud: 0.0000000000,
    codigoMunicipio: 0,
    ubicacion: ['', ''],
    description: '',
    createAt: '',    
}

export const oldtypesMarkerPOAIndex = {
    id: '',
    nombrePOA: '',
    ubicacion: ['', ''],
    description: '',
    codigo: '',
    ejecutor: '',
    estado: '',
    sectorOJ: '',
    sector: '',
    fechaPlaneacion: '',
    fechaEjecucion: '',
    etapa: '',
    departamento: '',
    municipio: '',
    comunidad: '',
    tipoComunidad: '',
    etnia: '',
    cantidadPoblacionCert: '',
    totalComunidades: '',
    estadoGestion: '',
    etapaFinalizada: '',
    esConAcuerdos: '',
    pine: '',
    numeroRadicado: '',
    fechaRadicado: '',
    createAt: '',
    
}

export const typesSimpleMarker = {
    id: 0,
    nombre: 'marker',
    ubicacion: []
}

export const typesMarkerDataPOAIndex = [typesMarkerPOAIndex]


export const typePOAGraphic = {
    id: 0,
    tipoComunidad: '',
    sector: '',
    estado: '',
    etapa: ''
}

export const typePOASGraphic = [
    typePOAGraphic
]



//Massive load of POAS

export const defaultStateMassiveLoad = {
    isOpen: false,
    dataLoaded: false,
    isFormInvalid: false,
    rows: null,
    cols: null
}

//reportes types

export const typesEtapasDefaultConfigReporte = {
    todasLasEtapas:'Todas Las Etapas',
    ultimaEtapa:'Última Etapa'
}
export const defaultConfigReporte = {
    casosSeguimiento:'si',
    graficas:'si',
    anexos:'si',
    etapas: typesEtapasDefaultConfigReporte.todasLasEtapas,
    notas: 'no',
    cuerpoNota:''    
}


export const typesTitles = {
    Default: 'Reporte de POAS',
    Regiones: 'Reporte de POAS en Regiones (municipios y departamentos)',
    Comunidades: 'Reporte de POAS en Comunidades',
    Personalizado: 'Reporte de POAS por parámetros filtrados'
}


//modulo contacto 

export const typesContacto = {
    nombres: '',
    email: '',
    telefono: '',
    mensaje: '',
    categoria: '',
    tipoIdentificacion:'',
    numeroIdentificacion:'',
    organizacion:'',
    cargo:'',
    puebloEtnico:'',
    departamento:'',
    municipio:'',
    barrio:''
}


//Modulo Nosotros

export const typesNosotrosValue = {
    id: '',
    tipo: '',
    descripcion: ''
}


//modulo Noticias CPLI

export const typesRegistroNoticiasCPLI = {
    titulo: '',
    imagen: '',
    fechaPublicacion: '',
    link: '',
    status: 'No publicado',
    categoriaNoticiasCPLIId: 'comunicadosBoletines'
}

export const columnsNoticiasCPLI = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'titulo', headerName: 'Título', width: 150 },
    { field: 'imagen', headerName: 'Imagen', width: 150 },
    { field: 'fechaPublicacion', headerName: 'Fecha de Publicación', width: 150 },
    { field: 'link', headerName: 'Link', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'categoriaNoticiasCPLIId', headerName: 'Categoria', width: 150 },
    { field: 'createAt', headerName: 'Fecha de creación', width: 150 }
];

export const typesRegistroDidactica = {
    title:'',
    resource:'',
    description:'',
    publishedAt:'',
    author:'Akubadaura',
    type:'',
    ownerId:0
}
export const typesOptionsCategoriaDidactica = [
    { value: 'video', label: 'Video' },
    { value: 'image', label: 'Imagen' },
    { value: 'audio', label: 'Audio' },
    { value: 'youtube', label: 'Youtube' },
    { value: 'PDF', label: 'PDF' },
    { value: 'doc', label: 'Documento Word (.doc/.docx)' },
]

export const columnsDidactica = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'title', headerName: 'Título', width: 150 },
    { field: 'resource', headerName: 'Recurso', width: 150 },
    { field: 'description', headerName: 'Descripción', width: 150 },
    { field: 'publishedAt', headerName: 'Fecha de Publicación', width: 150 },
    { field: 'author', headerName: 'Autor', width: 150 },
    { field: 'type', headerName: 'Tipo', width: 150 },
    { field: 'createAt', headerName: 'Fecha de creación', width: 150 },
    { field: 'ownerId', headerName: 'ID Usuario Akubadaura', width: 150 }
];

export const typesOptionsCategoriaNoticiasCPLI = [
    { value: 'analisisOpinion', label: 'Análisis y opinión' },
    { value: 'radioteca', label: 'RadioTeca' },
    { value: 'comunicadosBoletines', label: 'comunicados y boletines' },
    { value: 'eventos', label: 'Eventos' },
]


//User profile - Perfil


export const typesNewProfile = {
    id: 0,
    email: '',
    nombres: '',
    fin: '',
    fechaNacimiento: '',
    sexo: '',
    descripcion: '',
    tipoDocumento: '',
    documento: '',
    telefono: '',
    direccion: '',
    departamento: '',
    municipio: '',
    rol: [''],
    userId: ''
}



export const typesDetailsProfileDashboard = {
    id: 0,
    email: '',
    nombres: '',
    fechaNacimiento: '',
    sexo: '',
    descripcion: '',
    tipoDocumento: '',
    documento: '',
    telefono: '',
    direccion: '',
    departamento: '',
    municipio: '',
    rol: [1]
}

export const typesColumnsUsersDashboard = [
    { field: 'id', headerName: 'ID', width: 70, description: '', sortable: false, type: 'number' },
    { field: 'email', headerName: 'Email', width: 150, description: '', sortable: true, type: 'string' },
    { field: 'nombres', headerName: 'Nombres', width: 200, description: '', sortable: true, type: 'string' },
    { field: 'fechaNacimiento', headerName: 'Fecha de Nacimiento', width: 150, description: '', sortable: true, type: 'string' },
    { field: 'sexo', headerName: 'Sexo', width: 100, description: '', sortable: true, type: 'string' },
    { field: 'descripcion', headerName: 'Descripción', width: 200, description: '', sortable: false, type: 'string' },
    { field: 'tipoDocumento', headerName: 'Tipo de Documento', width: 200, description: '', sortable: true, type: 'string' },
    { field: 'documento', headerName: 'Documento', width: 150, description: '', sortable: true, type: 'string' },
    { field: 'telefono', headerName: 'Teléfono', width: 150, description: '', sortable: true, type: 'string' },
    { field: 'direccion', headerName: 'Dirección', width: 150, description: '', sortable: true, type: 'string' },
    { field: 'departamento', headerName: 'Departamento', width: 150, description: '', sortable: true, type: 'string' },
    { field: 'municipio', headerName: 'Municipio', width: 150, description: '', sortable: true, type: 'string' },
    { field: 'rol', headerName: 'Roles', width: 300, description: '', sortable: true, type: 'string' },
];


export const typesFinalidadRegistro = [
    { value: 'Fin Académico', label: 'Fin Académico' },
    { value: 'Fin Laboral', label: 'Fin Laboral' },
    { value: 'Ejercicio Autoridad Indígena', label: 'Ejercicio Autoridad Indígena' },
]

//Module ResetPassword

export const typesResetPassword = {
    password: undefined,
    confirmPassword: undefined,
    resetKey: undefined
}


//Module EmailVerified 

export const typesEmailVerified = {
    emailVerifiedKey: undefined
}

//Module Message

export const defaultMessages = []

export const typesMessage = {
    cuerpo: '',
    asunto: '',
    origen: '',
    destino: []
}

export const typesNamesMessages = [
    'general1@akubadaura-snicpli.org',
    'general2@akubadaura-snicpli.org',
    'general3@akubadaura-snicpli.org',
    'juridico1@akubadaura-snicpli.org',
    'juridico2@akubadaura-snicpli.org',
    'juridico3@akubadaura-snicpli.org',
    'juridicoadmin@akubadaura-snicpli.org',
    'periodismo1@akubadaura-snicpli.org',
    'periodismo2@akubadaura-snicpli.org',
    'periodismo3@akubadaura-snicpli.org',
    'periodismoadmin@akubadaura-snicpli.org',
    'admin@akubadaura-snicpli.org',
    'admintotal@akubadaura-snicpli.org'
];


//Navbar


export const typesCredentialsForgetPass = {
    email: undefined
}

export const typesUserRegister = {
    emailRegister: '',
    passwordRegister: '',
    repeatPasswordRegister: ''
}

export const typesUserLogin = {
    emailLogin: '',
    passwordLogin: ''
}



//Module Alert

export const typesAlertElement = {
    state: false,
    message: '',
    time: 6000,
    severity: 'info'
}

const typesSeverityAlert =
    [
        "error",
        "warning",
        "info",
        "success"
    ];


//////////////////////////////////////COLORS/////////////////////////////////////

export const colorInclusiveDaltonicCondition = [
    'rgba(1, 140, 205, 0)',
    'rgba(143, 208, 0, 0)',
    'rgba(240, 236, 129, 0)',
    'rgba(251, 200, 83 , 0)',
    'rgba(251, 183, 196, 0)',
    'rgba(228, 109, 193, 0)',
    'rgba(236,203, 96, 0)',
    'rgba(21,20, 147, 0)',
    'rgba(0,177, 149, 0)',
    'rgba(245, 222, 22, 0)',
    'rgba(237,111,1, 0)',
    'rgba(237, 45,56, 0 )',
    'rgba(151,26, 144, 0)',
    'rgba(147,96,4,0)',
    'rgba(38,26,62,0)',
    'rgba(17,77,37,0)',
    'rgba(245,206,15, 0)',
    'rgba(192,82,5,0)',
    'rgba(128,32,43,0)',
    'rgba(83,36,68,0)',
    'rgba(81,41,15,0)'
]
