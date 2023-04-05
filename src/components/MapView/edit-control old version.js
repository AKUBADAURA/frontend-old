import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, FeatureGroup } from 'react-leaflet';
import L from 'leaflet';
import  EditControl  from '../../logic/EditControl';
import { FormLabel } from '@material-ui/core';




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

//

let polyline;
let _editableFG = null;


const EditControlExample =(props)=>  {

  const defaultCenter = [4.60971, -74.08175]
  const defaultZoom = 13
  const defaultLabel = '' 
  let geoData = []

  const [state, setState] = useState(geoData)

  useEffect(() => {
    console.log('cambio en el state, valor: ', state)
  }, [state])

  const updateState =async ()=>{
   // await setState(geoData)

    await props.setObject({            
     ...props.object,[props.nameSelect]:geoData
    })

    console.log('actualizando estado')
    console.log('cambio en el state en fn, valor: ', state)

  }


  const _onEdited = async (e) => {
    // let numEdited = 0;
    // e.layers.eachLayer((layer) => {
    //   numEdited += 1;
    // });
    //console.log(`_onEdited: edited ${numEdited} layers`, e);

    await _onChange();
    await updateState(geoData);
  };

  const _onCreated =async (e) => {
    let type = e.layerType;
    let layer = e.layer;
    if (type === 'marker') {
      // Do marker specific actions
      //console.log('_onCreated: marker created', e);
    } else {
      //console.log('_onCreated: something else created:', type, e);
    }
    //Do whatever else you need to. (save to db; etc)

    await _onChange();
    await updateState();
  };

  const _onDeleted = async(e) => {
    let numDeleted = 0;
    e.layers.eachLayer((layer) => {
      numDeleted += 1;
    });
    //console.log(`onDeleted: removed ${numDeleted} layers`, e);

    await _onChange();
    await updateState();

  };

  function getGeoJson() {
    const featuresFn = [];
    // if (props.points) {
    //   props.points.forEach((point)=>{
    //     featuresFn.push (
    //       {
    //         type: 'Feature',
    //         properties: {},
    //         geometry: {
    //           type: 'Point',
    //           coordinates: [point[0], point[1]],
    //         },
    //       }
    //     )
    //   })
    // }
    // if(props.polygons) {
    //   props.polygons.forEach((polygon)=>{
    //     featuresFn.push (
    //       {
    //         type: 'Feature',
    //         properties: {},
    //         geometry: {
    //           type: 'Polygon',
    //           coordinates: [ polygon ]
    //         },
    //       }
    //     )
    //   })
    // }  
    props.selectOptions.forEach((polygon)=>{
      featuresFn.push (
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [ polygon ]
          },
        }
      )
    })
    return {
      type: 'FeatureCollection',
      features: featuresFn
    };
  }

  const _onFeatureGroupReady = async (reactFGref) => {
    // populate the leaflet FeatureGroup with the geoJson layers 
    let leafletGeoJSON = new L.GeoJSON(await getGeoJson());
    let leafletFG = reactFGref; 
    await leafletGeoJSON.eachLayer((layer) => {
      leafletFG.addLayer(layer);
    });
    // store the ref for future access to content
    _editableFG = reactFGref;
  };


  const _onChange = async () => {
    // _editableFG contains the edited geometry, which can be manipulated through the leaflet API
    //if (!_editableFG || !props.onChange)  {
    // if (!_editableFG)  {
    //   return;
    // }
    const geojsonData = _editableFG.toGeoJSON();

    //Ajust data'structure
    if(props.drawConfig.polygon===true && geojsonData.features){
      const polygons=[]
      //geoData =[]
      geojsonData.features.forEach((polygon)=>{
      //polygons.push ( polygon.geometry.coordinates )
      geoData.push ( polygon.geometry.coordinates )
      })
      // props.setObject({            
        //   ...props.object,[props.nameSelect]:polygons
        // })
        //setState(polygons)
        //await props.onChange(polygons);
        //await props.onChange(geoData);
        //await setState(polygons)
    }
    else if(props.drawConfig.marker===true && geojsonData.features){
      const markers=[]
      //geoData =[]
      geojsonData.features.forEach((marker)=>{
      //markers.push ( marker.geometry.coordinates )
      geoData.push ( marker.geometry.coordinates )
      })
      //await props.onChange(geoData);
      //await props.onChange(markers);
      //await setState(markers)
    }
    else {
      //geoData =[]
      //await props.onChange(geojsonData);
      //await setState(geojsonData)
      geoData=geojsonData
    }
  };

  const _onMounted = (drawControl) => {
    //console.log('_onMounted', drawControl);
  };

  const _onEditStart = (e) => {
    //console.log('_onEditStart', e);
  };

  const _onEditStop = (e) => {
    //console.log('_onEditStop', e);
  };

  const _onDeleteStart = (e) => {
    //console.log('_onDeleteStart', e);
  };

  const _onDeleteStop = (e) => {
    //console.log('_onDeleteStop', e);
  };

  
  return (
    <>
      <FormLabel  component="legend">{props.label || defaultLabel}</FormLabel>
      <MapContainer center={props.center || defaultCenter} zoom={props.zoom || defaultZoom} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup
          ref={(reactFGref) => {
            _onFeatureGroupReady(reactFGref);
          }}
        >
        {props.drawConfig.edit===true
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
                draw={{
                  rectangle: (props.drawConfig.rectangle || false ),
                  line: (props.drawConfig.line || false ),
                  polygon:(props.drawConfig.polygon || false ),
                  circle: (props.drawConfig.circle || false ),
                  polyline: (props.drawConfig.polyline || false ),
                  marker: (props.drawConfig.marker || false ),
                  circlemarker: (props.drawConfig.circlemarker || false ),                  
                }}
            />)
          : ''      
        }
        </FeatureGroup>
      </MapContainer>
    </>
  );






  // data taken from the example in https://github.com/PaulLeCam/react-leaflet/issues/176


}

export default EditControlExample