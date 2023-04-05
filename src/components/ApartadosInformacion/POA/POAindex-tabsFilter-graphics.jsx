import React, { useContext, useEffect, useState } from 'react';
import { Bar, Doughnut, Pie, PolarArea } from 'react-chartjs-2';
import { POAContext, POAProvider } from '../../../context/POAContext';
import { typePOASGraphic } from '../../../types/types';

const Graphics = (props) => {
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      legend: {
        display: false,
      },
    }
  };

  const optionsSectores = {
    plugins: {
      legend: {
        display: false,
      },
    }
  }
  const optionsEstado = {
    plugins: {
      legend: {
        display: false,
      },
    }
  }
  const optionsEtapa = {
    plugins: {
      legend: {
        display: false,
      },
    }
  }



  const { POASGraphic, setPOASGraphic } = useContext(POAContext)

  const [dataTipoComunidad, setDataTipoComunidad] = useState({
    labels: ['Afrodescendiente', 'Raizal', 'Indígena'],
    datasets: [
      {
        label: '# de POAS',
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(5, 154, 72, 1)',
          'rgba(214,105,38, 1)',
          'rgba(255,138,40, 1)'
        ],
        borderColor: [
          'rgba(5, 154, 72, 1)',
          'rgba(214,105,38, 1)',
          'rgba(255,138,40, 1)'
        ],
        borderWidth: 1,
      },
    ],
  })
  const [dataSector, setDataSector] = useState({
    labels: ['Telecomunicaciones', 'Investigación', 'Eléctrico', 'Infraestructura', 'Hidrocarburos', 'Medida Administrativa', 'Minería', 'Ambiental', 'Orden Judicial'],
    datasets: [
      {
        label: '# de POAS',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          'rgba(5, 154, 72, 1)',
          'rgba(214,105,38, 1)',
          'rgba(255,138,40, 1)',
          'rgba(251,74,56, 1)',
          'rgba(100,191,222, 1)',
          'rgba(123,202,196, 1)',
          'rgba(172,152,203, 1)',
          'rgba(177,118,182, 1)',
          'rgba(144,80,166, 1)',
        ],
        borderColor: [
          'rgba(5, 154, 72, 1)',
          'rgba(214,105,38, 1)',
          'rgba(255,138,40, 1)',
          'rgba(251,74,56, 1)',
          'rgba(100,191,222, 1)',
          'rgba(123,202,196, 1)',
          'rgba(172,152,203, 1)',
          'rgba(177,118,182, 1)',
          'rgba(144,80,166, 1)',
        ],
        borderWidth: 1,
      },
    ],
  })
  const [dataEstado, setDataEstado] = useState({
    labels: [
      'Seguimiento',
      'Desistimiento',
      'Protocolización',
      'En Estudio',
      'Activo',
      'Test',
      'Cierre',
      'Suspendido',
      'Anulado'
    ],
    datasets: [
      {
        label: '# de POAS',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          'rgba(5, 154, 72, 1)',
          'rgba(214,105,38, 1)',
          'rgba(255,138,40, 1)',
          'rgba(251,74,56, 1)',
          'rgba(100,191,222, 1)',
          'rgba(123,202,196, 1)',
          'rgba(172,152,203, 1)',
          'rgba(177,118,182, 1)',
          'rgba(144,80,166, 1)',
        ],
        borderColor: [
          'rgba(5, 154, 72, 1)',
          'rgba(214,105,38, 1)',
          'rgba(255,138,40, 1)',
          'rgba(251,74,56, 1)',
          'rgba(100,191,222, 1)',
          'rgba(123,202,196, 1)',
          'rgba(172,152,203, 1)',
          'rgba(177,118,182, 1)',
          'rgba(144,80,166, 1)',
        ],
        borderWidth: 1,
      },
    ],
  })
  const [dataEtapa, setDataEtapa] = useState({
    labels: [
      'Suspendido',
      'Por Iniciar',
      'Coordinación y Preparación',
      'Preconsulta',
      'Apertura',
      'Talleres de Impactos',
      'Formulación de Acuerdos',
      'Protocolización',
      'Seguimiento',
      'Cierre',
      'Test De Proporcionalidad',
      'Desistimiento',
      'Test 01 - Coordinación y Preparación',
      'Test 02 - Preconsulta',
      'Test 03 - Apertura',
      'Test 04 - Talleres de Impactos',
      'Test 05 - Preacuerdos',
      'Test 06 - Protocolización',
      'Sin Etapa'
    ],
    datasets: [
      {
        label: '# de POAS',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          'rgba(5, 154, 72, 1)',
          'rgba(214,105,38, 1)',
          'rgba(255,138,40, 1)',
          'rgba(251,74,56, 1)',
          'rgba(100,191,222, 1)',
          'rgba(123,202,196, 1)',
          'rgba(172,152,203, 1)',
          'rgba(177,118,182, 1)',
          'rgba(144,80,166, 1)',
          'rgba(80,85,167, 1)',
          'rgba(50,88,171, 1)',
          'rgba(76,129,195, 1)',
          'rgba(255,190,134, 1)',
          'rgba(255,255,86, 1)',
          'rgba(255,233,206, 1)',
          'rgba(255,181,194, 1)',
          'rgba(55,119,255, 1)',
          'rgba(255,242,0, 1)',
          'rgba(255,0,0, 1)'
        ],
        borderColor: [
          'rgba(5, 154, 72, 1)',
          'rgba(214,105,38, 1)',
          'rgba(255,138,40, 1)',
          'rgba(251,74,56, 1)',
          'rgba(100,191,222, 1)',
          'rgba(123,202,196, 1)',
          'rgba(172,152,203, 1)',
          'rgba(177,118,182, 1)',
          'rgba(144,80,166, 1)',
          'rgba(80,85,167, 1)',
          'rgba(50,88,171, 1)',
          'rgba(76,129,195, 1)',
          'rgba(255,190,134, 1)',
          'rgba(255,255,86, 1)',
          'rgba(255,233,206, 1)',
          'rgba(255,181,194, 1)',
          'rgba(55,119,255, 1)',
          'rgba(255,242,0, 1)',
          'rgba(255,0,0, 1)'
        ],
        borderWidth: 1,
      },
    ],
  })

  //get the data for generate graphics on modal from POAS index
  useEffect(() => {
    props.getPOASGraphic()
    return () => {
      setPOASGraphic(typePOASGraphic)
    }
  }, [])


  //generate all stadistic necesary for plot tabs from POASGraphic
  useEffect(() => {
    loadDataTipoComunidad()
    loadDataSector()
    loadDataEstado()
    loadDataEtapa()
  }, [POASGraphic])

  useEffect(() => {
    // console.log('dataEstado: ', dataEstado)

  }, [dataEstado])

  const loadDataTipoComunidad = () => {
    let afrodescendienteQty = 0
    let raizalQty = 0
    let indigenaQty = 0
    // console.log('POASGraphic: ', POASGraphic)
    POASGraphic.map((item) => {
      if (item.tipoComunidad === 'INDÍGENA') {
        indigenaQty = indigenaQty + 1
      }
      if (item.tipoComunidad === "RAIZAL") {
        raizalQty = raizalQty + 1
      }
      if (item.tipoComunidad === "AFRODESCENDIENTE") {
        afrodescendienteQty = afrodescendienteQty + 1
      }
    })

    let newData = () => {
      return (
        {
          labels: ['Afrodescendiente', 'Raizal', 'Indígena'],
          datasets: [
            {
              label: '# de POAS',
              data: [afrodescendienteQty, raizalQty, indigenaQty],
              backgroundColor: [
                'rgba(5, 154, 72, 1)',
                'rgba(214,105,38, 1)',
                'rgba(255,138,40, 1)'
              ],
              borderColor: [
                'rgba(5, 154, 72, 1)',
                'rgba(214,105,38, 1)',
                'rgba(255,138,40, 1)'
              ],
              borderWidth: 1,
            },
          ],
        }
      )
    }
    setDataTipoComunidad(newData())
  }
  const loadDataSector = () => {
    let telecomunicacionesQty = 0
    let investigacionQty = 0
    let electricoQty = 0
    let infraestructuraQty = 0
    let hidrocarburosQty = 0
    let medidaAdministrativaQty = 0
    let mineriaQty = 0
    let ambientalQty = 0
    let ordenJudicialQty = 0


    POASGraphic.map((item) => {
      if (item.sector === "TELECOMUNICACIONES") {
        telecomunicacionesQty = telecomunicacionesQty + 1
      }
      if (item.sector === "INVESTIGACION") {
        investigacionQty = investigacionQty + 1
      }
      if (item.sector === "ELECTRICO") {
        electricoQty = electricoQty + 1
      }
      if (item.sector === "INFRAESTRUCTURA") {
        infraestructuraQty = infraestructuraQty + 1
      }
      if (item.sector === "HIDROCARBUROS") {
        hidrocarburosQty = hidrocarburosQty + 1
      }
      if (item.sector === "MEDIDA ADMINISTRATIVA") {
        medidaAdministrativaQty = medidaAdministrativaQty + 1
      }
      if (item.sector === "MINERIA") {
        mineriaQty = mineriaQty + 1
      }
      if (item.sector === "AMBIENTAL") {
        ambientalQty = ambientalQty + 1
      }
      if (item.sector === "ORDEN JUDICIAL") {
        ordenJudicialQty = ordenJudicialQty + 1
      }
    })

    let newData = () => {
      return (
        {
          labels: ['Telecomunicaciones', 'Investigación', 'Eléctrico', 'Infraestructura', 'Hidrocarburos', 'Medida Administrativa', 'Minería', 'Ambiental', 'Orden Judicial'],
          datasets: [
            {
              label: '# de POAS',
              data: [telecomunicacionesQty, investigacionQty, electricoQty, infraestructuraQty, hidrocarburosQty, medidaAdministrativaQty, mineriaQty, ambientalQty, ordenJudicialQty],
              backgroundColor: [
                'rgba(5, 154, 72, 1)',
                'rgba(214,105,38, 1)',
                'rgba(255,138,40, 1)',
                'rgba(251,74,56, 1)',
                'rgba(100,191,222, 1)',
                'rgba(123,202,196, 1)',
                'rgba(172,152,203, 1)',
                'rgba(177,118,182, 1)',
                'rgba(144,80,166, 1)',
              ],
              borderColor: [
                'rgba(5, 154, 72, 1)',
                'rgba(214,105,38, 1)',
                'rgba(255,138,40, 1)',
                'rgba(251,74,56, 1)',
                'rgba(100,191,222, 1)',
                'rgba(123,202,196, 1)',
                'rgba(172,152,203, 1)',
                'rgba(177,118,182, 1)',
                'rgba(144,80,166, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }
      )
    }
    setDataSector(newData())
  }
  const loadDataEstado = () => {
    let seguimientoQty = 0
    let desistimientoQty = 0
    let protocolizacionQty = 0
    let enEstudioQty = 0
    let activoQty = 0
    let testQty = 0
    let cierreQty = 0
    let suspendidoQty = 0
    let anuladoQty = 0
    POASGraphic.map((item) => {
      if (item.estado === "SEGUIMIENTO") {
        seguimientoQty = seguimientoQty + 1
      }
      if (item.estado === 'ANULADO') {
        anuladoQty = anuladoQty + 1
      }
      if (item.estado === "DESISTIMIENTO") {
        desistimientoQty = desistimientoQty + 1
      }
      if (item.estado === "PROTOCOLIZACION") {
        protocolizacionQty = protocolizacionQty + 1
      }
      if (item.estado === "EN ESTUDIO") {
        enEstudioQty = enEstudioQty + 1
      }
      if (item.estado === "ACTIVO") {
        activoQty = activoQty + 1
      }
      if (item.estado === "TEST") {
        testQty = testQty + 1
      }
      if (item.estado === "CIERRE") {
        cierreQty = cierreQty + 1
      }
      if (item.estado === "SUSPENDIDO") {
        suspendidoQty = suspendidoQty + 1
      }
    })

    let newData = () => {
      return (
        {
          labels: ['Seguimiento', 'Desistimiento', 'Protocolización', 'En Estudio', 'Activo', 'Test', 'Cierre', 'Suspendido', 'Anulado'],
          datasets: [
            {
              label: '# de POAS',
              data: [seguimientoQty, desistimientoQty, protocolizacionQty, enEstudioQty, activoQty, testQty, cierreQty, suspendidoQty, anuladoQty],
              backgroundColor: [
                'rgba(5, 154, 72, 1)',
                'rgba(214,105,38, 1)',
                'rgba(255,138,40, 1)',
                'rgba(251,74,56, 1)',
                'rgba(100,191,222, 1)',
                'rgba(123,202,196, 1)',
                'rgba(172,152,203, 1)',
                'rgba(177,118,182, 1)',
                'rgba(144,80,166, 1)',
              ],
              borderColor: [
                'rgba(5, 154, 72, 1)',
                'rgba(214,105,38, 1)',
                'rgba(255,138,40, 1)',
                'rgba(251,74,56, 1)',
                'rgba(100,191,222, 1)',
                'rgba(123,202,196, 1)',
                'rgba(172,152,203, 1)',
                'rgba(177,118,182, 1)',
                'rgba(144,80,166, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }
      )
    }
    setDataEstado(newData())
  }

  const loadDataEtapa = () => {
    let E00 = 0
    let E01 = 0
    let E02 = 0
    let E03 = 0
    let E04 = 0
    let E05 = 0
    let E06 = 0
    let E07 = 0
    let E08 = 0
    let E09 = 0
    let E10 = 0
    let E11 = 0
    let TEST01 = 0
    let TEST02 = 0
    let TEST03 = 0
    let TEST04 = 0
    let TEST05 = 0
    let TEST06 = 0
    let sinEtapaQty = 0

    POASGraphic.map((item) => {
      if (item.etapa === "E00-SUSPENDIDO") {
        E00 = E00 + 1
      }
      else if (item.etapa === "E01-POR INICIAR") {
        E01 = E01 + 1
      }
      else if (item.etapa === "E02-COORDINACIÓN Y PREPARACIÓN") {
        E02 = E02 + 1
      }
      else if (item.etapa === "E03-PRECONSULTA") {
        E03 = E03 + 1
      }
      else if (item.etapa === "E04-APERTURA") {
        E04 = E04 + 1
      }
      else if (item.etapa === "E05-TALLERES DE IMPACTOS") {
        E05 = E05 + 1
      }
      else if (item.etapa === "E06-FORMULACIÓN DE ACUERDOS") {
        E06 = E06 + 1
      }
      else if (item.etapa === "E07-PROTOCOLIZACION") {
        E07 = E07 + 1
      }
      else if (item.etapa === "E08-SEGUIMIENTO") {
        E08 = E08 + 1
      }
      else if (item.etapa === "E09-CIERRE") {
        E09 = E09 + 1
      }
      else if (item.etapa === "E10-TEST DE PROPORCIONALIDAD") {
        E10 = E10 + 1
      }
      else if (item.etapa === "E11-DESISTIMIENTO") {
        E11 = E11 + 1
      }
      else if (item.etapa === "TEST 01 - COORDINACIÓN Y PREPARACIÓN") {
        TEST01 = TEST01 + 1
      }
      else if (item.etapa === "TEST 02 - PRECONSULTA") {
        TEST02 = TEST02 + 1
      }
      else if (item.etapa === "TEST 03 - APERTURA") {
        TEST03 = TEST03 + 1
      }
      else if (item.etapa === "TEST 04 - TALLERES DE IMPACTOS") {
        TEST04 = TEST04 + 1
      }
      else if (item.etapa === "TEST 05 - PREACUERDOS") {
        TEST05 = TEST05 + 1
      }
      else if (item.etapa === "TEST 06 - PROTOCOLIZACIÓN") {
        TEST06 = TEST06 + 1
      }
      else {
        sinEtapaQty = sinEtapaQty + 1
      }
    })


    let newData = () => {
      return (
        {
          labels: [
            'Suspendido',
            'Por Iniciar',
            'Coordinación y Preparación',
            'Preconsulta',
            'Apertura',
            'Talleres de Impactos',
            'Formulación de Acuerdos',
            'Protocolización',
            'Seguimiento',
            'Cierre',
            'Test De Proporcionalidad',
            'Desistimiento',
            'Test 01 - Coordinación y Preparación',
            'Test 02 - Preconsulta',
            'Test 03 - Apertura',
            'Test 04 - Talleres de Impactos',
            'Test 05 - Preacuerdos',
            'Test 06 - Protocolización',
            'Sin Etapa'
          ],
          datasets: [
            {
              label: '# de POAS',
              data: [E00, E01, E02, E03, E04, E05, E06, E07, E08, E09, E10, E11, TEST01, TEST02, TEST03, TEST04, TEST05, TEST06, sinEtapaQty],
              backgroundColor: [
                'rgba(5, 154, 72, 1)',
                'rgba(214,105,38, 1)',
                'rgba(255,138,40, 1)',
                'rgba(251,74,56, 1)',
                'rgba(100,191,222, 1)',
                'rgba(123,202,196, 1)',
                'rgba(172,152,203, 1)',
                'rgba(177,118,182, 1)',
                'rgba(144,80,166, 1)',
                'rgba(80,85,167, 1)',
                'rgba(50,88,171, 1)',
                'rgba(76,129,195, 1)',
                'rgba(255,190,134, 1)',
                'rgba(255,255,86, 1)',
                'rgba(255,233,206, 1)',
                'rgba(255,181,194, 1)',
                'rgba(55,119,255, 1)',
                'rgba(255,242,0, 1)',
                'rgba(255,0,0, 1)'
              ],
              borderColor: [
                'rgba(5, 154, 72, 1)',
                'rgba(214,105,38, 1)',
                'rgba(255,138,40, 1)',
                'rgba(251,74,56, 1)',
                'rgba(100,191,222, 1)',
                'rgba(123,202,196, 1)',
                'rgba(172,152,203, 1)',
                'rgba(177,118,182, 1)',
                'rgba(144,80,166, 1)',
                'rgba(80,85,167, 1)',
                'rgba(50,88,171, 1)',
                'rgba(76,129,195, 1)',
                'rgba(255,190,134, 1)',
                'rgba(255,255,86, 1)',
                'rgba(255,233,206, 1)',
                'rgba(255,181,194, 1)',
                'rgba(55,119,255, 1)',
                'rgba(255,242,0, 1)',
                'rgba(255,0,0, 1)'
              ],
              borderWidth: 1,
            },
          ],
        }
      )
    }
    setDataEtapa(newData())
  }



  return (
    <>
      <div className='w-100'>
        <h5 className='mb-0'>Sectores Económicos</h5>
        <hr className="d-flex mt-0 justify-content-between  align-items-center divisor"></hr>
      </div>
      {/* <Bar data={dataSector} options={options} />
        <PolarArea data={dataSector} />
        <Doughnut data={dataSector} /> */}
      <Doughnut data={dataSector} options={optionsSectores} />
      <br />
      <div className='w-100'>
        <h5 className='mb-0'>Tipos de comunidad</h5>
        <hr className="d-flex mt-0 justify-content-between  align-items-center divisor"></hr>
      </div>
      <Bar data={dataTipoComunidad} options={options} />
      <br />
      <div className='w-100'>
        <h5 className='mb-0'>Estado</h5>
        <hr className="d-flex mt-0 justify-content-between  align-items-center divisor"></hr>
      </div>
      {/* <Bar data={dataSector} options={options} />
    <PolarArea data={dataSector} />
    <Doughnut data={dataSector} /> */}
      <Pie data={dataEstado} options={optionsEstado} />
      <br />
      <div className='w-100'>
        <h5 className='mb-0'>Etapa</h5>
        <hr className="d-flex mt-0 justify-content-between  align-items-center divisor"></hr>
      </div>
      {/* <Bar data={dataSector} options={options} />
    <PolarArea data={dataSector} />
    <Doughnut data={dataSector} /> */}
      <Doughnut data={dataEtapa} options={optionsEtapa} />
    </>

  )
};

export default Graphics;