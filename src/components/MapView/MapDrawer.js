import React, { useState, useEffect, useMemo, useContext } from 'react';
import { MapContainer, TileLayer, Circle, FeatureGroup, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import EditControl from '../../logic/EditControl';
import { FormLabel } from '@material-ui/core';
import Markers from "./VenueMarkers";
import { defaultCenterMapDrawer, defaultZoomMapDrawer, defaultLabelMapDrawer, typesMapaIndex } from '../../types/types';
import { POAContext } from '../../context/POAContext';
import MarkerPopup from './MarkerPopup';
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";






// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
});


function MyClickAreasComponent(props) {

  //getting details of map event throw useMapevents hook
  //   const map = useMapEvents({
  //     click: (e) => {
  //       if (props.type === 'showing' && typesViewMapaIndex === typesMapaIndex.municipios && map.dragging._map._targets[e.originalEvent.path[0]._leaflet_id].feature) { //se verifica que se esté en modo showing, con un tipo de mapa por areas y que al dar click exista un objeto de features con caracteristicas del idLayer clickeado
  //         let idLayer = e.originalEvent.path[0]._leaflet_id //to get id layer
  //         let propertiesArea = map.dragging._map._targets[idLayer].feature.properties//obtiene un nombre de dep.
  //         console.log('propertiesArea: ', propertiesArea)
  //         setAreaMapCodigoMunicipio(propertiesArea.MPIO_CCNCT)
  //         // map.eachLayer((layer)=>{
  //         //   // layer.bindPopup('la cuca')  
  //         //   layer.bindPopup(ReactDOMServer.renderToString(<MarkerPopup />))
  //         // }) 
  //       }
  //       else if (props.type === 'showing' && typesViewMapaIndex === typesMapaIndex.departamentos && map.dragging._map._targets[e.originalEvent.path[0]._leaflet_id].feature) { //se verifica que se esté en modo showing, con un tipo de mapa por areas y que al dar click exista un objeto de features con caracteristicas del idLayer clickeado
  //         let idLayer = e.originalEvent.path[0]._leaflet_id //to get id layer
  //         let propertiesArea = map.dragging._map._targets[idLayer].feature.properties//obtiene un nombre de dep.
  //         console.log('propertiesArea: ', propertiesArea)
  //         setAreaMapNombreDepartamento(propertiesArea.NOMBRE_DPT)
  //       }
  //     }
  //   })
  //   return null
}

const MapDrawer = (props) => {
  const {
    typesViewMapaIndex,
    setAreaMapNombreDepartamento,
    setAreaMapCodigoMunicipio,
    
  openPopupMarker, setOpenPopupMarker
  } = useContext(POAContext)



  let geojsonData;

  const _onEdited = (e) => {
    //console.log('on Editing')
    let numEdited = 0;
    e.layers.eachLayer((layer) => {
      numEdited += 1;
    });
    //console.log(`_onEdited: edited ${numEdited} layers`, e);

    _onChange();
    //updateState();
  };

  const saveLayers = (e) => {
    props.setObject({
      ...props.object, [props.nameSelect]: geojsonData
    })
  }

  const _onCreated = async (e) => {
    let type = e.layerType;
    let layer = e.layer;
    if (type === 'marker') {
      // Do marker specific actions
      //console.log('_onCreated: marker created', e);
    } else {
      //console.log('_onCreated: something else created:', type, e);
    }
    // Do whatever else you need to. (save to db; etc)

    _onChange();
    //updateState();
  };

  const _onDeleted = (e) => {
    //console.log('on deleting')
    let numDeleted = 0;
    e.layers.eachLayer((layer) => {
      numDeleted += 1;
    });
    //console.log(`onDeleted: removed ${numDeleted} layers`, e);

    _onChange();
    //updateState();
  };

  const _onMounted = (drawControl) => {

    //console.log('_onMounted', drawControl);
  };

  const _onEditStart = (e) => {
    //console.log('_onEditStart', e);
  };

  const _onEditStop = (e) => {
    //console.log('_onEditStop', e);
    saveLayers(e)
  };

  const _onDeleteStart = (e) => {
    //console.log('_onDeleteStart', e);
  };

  const _onDeleteStop = (e) => {
    //console.log('_onDeleteStop', e);
    saveLayers(e)
  };

  const _onDrawStop = (e) => {
    //console.log('_onDrawStop', e);
    saveLayers(e)
  };


  let _editableFG = null;

  const _onFeatureGroupReady = (reactFGref) => {
    // populate the leaflet FeatureGroup with the geoJson layers 
    let leafletGeoJSON = new L.GeoJSON(getGeoJson());
    let leafletFG = reactFGref;
    leafletGeoJSON.eachLayer((layer) => {
      // if (props.type === 'showing' && typesViewMapaIndex === typesMapaIndex.municipios) {
      //   layer.bindPopup("<MarkerPopup />");
      // }

      leafletFG.addLayer(layer);

    });
    // store the ref for future access to content
    _editableFG = reactFGref;
  };


  function getGeoJson() {
    //let featuresFn = [];
    //featuresFn = props.geoData

    let featuresFn

    //if(props.selectOptions && Object.keys(props.selectOptions).length > 0){
    if (props.type === 'showing') {
      featuresFn = props.selectOptions
      //return props.selectOptions
    }
    else {
      featuresFn = {
        type: 'FeatureCollection',
        features: []
      }
    }
    //console.log('geodata in function:', featuresFn)

    // props.selectOptions.forEach((polygon)=>{
    //   featuresFn.push (
    //     {
    //       type: 'Feature',
    //       properties: {},
    //       geometry: {
    //         type: 'Polygon',
    //         coordinates: [ polygon ]
    //       },
    //     }
    //   )
    // })
    // return {
    //   type: 'FeatureCollection',
    //   features: featuresFn
    // };  


    return featuresFn
  }

  const _onChange = () => {
    // _editableFG contains the edited geometry, which can be manipulated through the leaflet API
    if (!_editableFG) {
      return;
    }
    geojsonData = _editableFG.toGeoJSON();
    //props.dataLet = _editableFG.toGeoJSON();




    //props.onChange(geojsonData);

    //Ajust data'structure
    // if(props.drawConfig.polygon===true && geojsonData.features){
    //   geoData=[]
    //   geojsonData.features.forEach((polygon)=>{
    //     geoData.push ( polygon.geometry.coordinates[0] )
    //   })
    //   props.onChange(geoData);
    // }      
  }

  const getDetailsLayer = (e) => {
    setOpenPopupMarker(true)
    console.log('e: ', e.layer.feature.properties)
    if (props.type === 'showing' && typesViewMapaIndex === typesMapaIndex.municipios) { //se verifica que se esté en modo showing, con un tipo de mapa por areas 
      setAreaMapCodigoMunicipio(e.layer.feature.properties.MPIO_CCNCT)
      console.log('setting area map codigo municipio')
    }
    else if (props.type === 'showing' && typesViewMapaIndex === typesMapaIndex.departamentos) { //se verifica que se esté en modo showing, con un tipo de mapa por areas
      setOpenPopupMarker(true)
      setAreaMapNombreDepartamento(e.layer.feature.properties.NOMBRE_DPT)
      console.log('setting area map nombre departamento')
    }
  }

  return (
    <>
      {props.label ? (<FormLabel component="legend">{props.label}</FormLabel>) : (defaultLabelMapDrawer)}
      <MapContainer
        center={props.center || defaultCenterMapDrawer}
        zoom={props.zoom || defaultZoomMapDrawer}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.venues
          ?
          <Markers
            venues={props.venues}
            simpleVenues={props.simpleVenues === true ? true : false}
          />
          : ''
        }
        <FeatureGroup
          ref={(reactFGref) => {
            if (reactFGref !== null) {
              _onFeatureGroupReady(reactFGref);
            }
          }}
          eventHandlers={{
            click: (e) => {
              getDetailsLayer(e)
              // console.log('map: ', map)
            }
          }}
        >
          <Popup>
            <MarkerPopup />
          </Popup>
          {props.drawConfig.edit === true
            ? (<EditControl
              position="topleft"
              onEdited={_onEdited}
              onCreated={_onCreated}
              onDeleted={_onDeleted}
              onMounted={_onMounted}
              onEditStart={_onEditStart}
              onEditStop={_onEditStop}
              onDeleteStart={_onDeleteStart}
              onDeleteStop={_onDeleteStop}
              onDrawStop={_onDrawStop}
              draw={{
                rectangle: (props.drawConfig.rectangle || false),
                line: (props.drawConfig.line || false),
                polygon: (props.drawConfig.polygon || false),
                circle: (props.drawConfig.circle || false),
                polyline: (props.drawConfig.polyline || false),
                marker: (props.drawConfig.marker || false),
                circlemarker: (props.drawConfig.circlemarker || false),
              }}
            />)
            : ''
          }
        </FeatureGroup>
      </MapContainer>
    </>
  );
}

export default MapDrawer

