import React from 'react'
import MapView from '../../MapView/MapView'


const POAindexModalDetailsTabPOA = (props) => {

    const { POA, venues, centerMap, zoom } = props
    return (
        <div className="row TabsModalDetailPOA">
            <div className="col-4 columnaA">
                <div className="row">
                    <div className="col-12 form-group ">
                        <label htmlFor="codigo">Código </label>
                        <span className="form-control">{POA.codigo ? POA.codigo : ''} </span>
                    </div>
                    <div className="col-12 form-group ">
                        <label htmlFor="nombrePOA">Nombre del POA</label>
                        <span className="form-control">{POA.nombrePOA ? POA.nombrePOA : ''} </span>
                    </div>
                    <div className="col-12 form-group ">
                        <label htmlFor="ejecutorPOA">Nombre del ejecutor</label>
                        <span className="form-control">{POA.ejecutorPOA ? POA.ejecutorPOA : ''} </span>
                    </div>
                    <div className="col-12 form-group  ">
                        <label htmlFor="nombreSector">Nombre del sector</label>
                        <span className="form-control">{POA.sector ? POA.sector : ''} </span>
                    </div>
                    <div className="col-12 form-group ">
                        <label htmlFor="etapa">Etapa</label>
                        <span className="form-control">{POA.etapa ? POA.etapa : ''} </span>
                    </div>
                    <div className="col-12 form-group  ">
                        <label htmlFor="estado">Estado</label>
                        <span className="form-control">{POA.estado ? POA.estado : ''} </span>
                    </div>
                    <div className="col-12 form-group  ">
                        <label htmlFor="esPOMCAS">¿Es POMCAS?</label>
                        <span className="form-control">{POA.esPOMCAS ? POA.esPOMCAS : ''} </span>
                    </div>
                </div>
            </div>
            <div className="col-4 columnaB">
                <div className="row">
                    <div className="col-6 form-group">
                        <label htmlFor="estadoGestion">Estado gestión</label>
                        <span className="form-control">{POA.estadoGestion ? POA.estadoGestion : ''} </span>
                    </div>
                    <div className="col-6 form-group">
                        <label htmlFor="etapaFinalizada">Etapa Finalizada</label>
                        <span className="form-control">{POA.etapaFinalizada ? POA.etapaFinalizada : ''} </span>
                    </div>
                    <div className="col-6 form-group">
                        <label htmlFor="esConAcuerdos">¿Con acuerdos?</label>
                        <span className="form-control">{POA.esConAcuerdos ? POA.esConAcuerdos : ''} </span>
                    </div>
                    <div className="col-6 form-group">
                        <label htmlFor="pine">PINE</label>
                        <span className="form-control">{POA.pine ? POA.pine : ''} </span>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="comunidad">Comunidad</label>
                        <span className="form-control">{POA.comunidad ? POA.comunidad : ''} </span>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="totalComunidades">Total de comunidades</label>
                        <span className="form-control">{POA.totalComunidades ? POA.totalComunidades : ''} </span>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="tipoComunidad">Tipo de Comunidad</label>
                        <span className="form-control">{POA.tipoComunidad ? POA.tipoComunidad : ''} </span>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="etnia">Pueblo</label>
                        <span className="form-control">{POA.pueblo ? POA.pueblo : ''} </span>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="departamento">Departamento</label>
                        <span className="form-control">{POA.departamento ? POA.departamento : ''} </span>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="region">Región</label>
                        <span className="form-control">{POA.region ? POA.region : ''} </span>
                    </div>
                </div>
            </div>
            <div className="col-4 columnaC">
                <div className="row">
                    <div className="col-12 form-group ">
                        <label htmlFor="fechaPlaneacion">Fecha de planeación</label>
                        <span className="form-control">{POA ? POA.fechaPlaneacion : ''} </span>
                    </div>
                    <div className="col-12 form-group ">
                        <label htmlFor="fechaReal">Fecha Real</label>
                        <span className="form-control">{POA.fechaReal ? POA.fechaReal : ''} </span>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="fechaActoAdmin">Fecha de Acto Administrativo</label>
                        <span className="form-control">{POA.fechaActoAdmin ? POA.fechaActoAdmin : ''} </span>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="numActoAdmin">Número de Acto Administrativo</label>
                        <span className="form-control">{POA.numActoAdmin ? POA.numActoAdmin : ''} </span>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="tieneLicencia">¿Tiene Licencia?</label>
                        <span className="form-control">{POA.tieneLicencia ? POA.tieneLicencia : ''} </span>
                    </div>

                    <div className="col-12 form-group">
                        <label htmlFor="createAt">Fecha registro sistema</label>
                        <span className="form-control">{POA.createAt ? POA.createAt : ''} </span>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="fechaRadicado">Coordenadas</label>
                        <span className="form-control">{`Lat: ${POA.latitud ? POA.latitud : ''}`} <br />{`Lgt: ${POA.longitud ? POA.longitud : ''}`} </span>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="municipio">Municipio</label>
                        <span className="form-control">{POA.municipio ? POA.municipio : ''} </span>
                    </div>
                    <div className="col-12 form-group">
                        <label htmlFor="codigoMunicipio">Código del municipio</label>
                        <span className="form-control">{POA.codigoMunicipio ? POA.codigoMunicipio : ''} </span>
                    </div>
                </div>
            </div>
            <div className="col-12 w-100" id="containerMapDetailsPOA">
                <MapView
                    id="mapViewPoaDetails"
                    venues={venues}
                    center={centerMap}
                    zoom={zoom}
                    draw={false}
                    simpleVenues={true}
                />
            </div>
        </div>
    )
}

export default POAindexModalDetailsTabPOA
