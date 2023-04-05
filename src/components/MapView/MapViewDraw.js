import React, { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css'
import "leaflet-draw/dist/leaflet.draw.css";
import '../../css/maps.css';
import { FormLabel } from "@material-ui/core";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import Markers from "./VenueMarkers";
import { EditControl } from "react-leaflet-draw";

const MapViewDraw = (props) => {
  
  //vars & const
  
  //useLocation & useHistory (HOOKS REACT ROUTER)
 
  //useContext 
  
  //useState
  const [mapLayers, setMapLayers] = useState([]);

  
  //useEffect 

  useEffect(() => {
    saveLayers()
  }, [mapLayers])


//functions
  const saveLayers =()=>{
    //setLayersExport( JSON.stringify(mapLayers, 0, 2))
    //console.log('el mapa layers to export',layersExport)
    props.setObject({            
      ...props.object,[props.nameSelect]:mapLayers
    })   
  }



    const _onCreate = (e) => {
        //console.log(e);
        const { layerType, layer } = e;
        if (layerType === "polygon") {
          const { _leaflet_id } = layer;    
          setMapLayers((layers) => [
            ...layers,
            { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
          ]);    
        }
    };    



  const _onEdited = (e) => {
      //console.log(e);
      const {
        layers: { _layers },
      } = e;
          
      Object.values(_layers).map(({ _leaflet_id, editing }) => {
        setMapLayers((layers) =>
          layers.map((l) =>
            l.id === _leaflet_id
              ? { ...l, latlngs: { ...editing.latlngs[0] } }
              : l
          )
        );
      });
  };

  const _onDeleted = (e) => {
      console.log(e);
      const {
        layers: { _layers },
      } = e;  
      Object.values(_layers).map(({ _leaflet_id }) => {
        setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
      });
  }; 

  const _onMounted = (e) => {
    console.log('e:', e)
    console.log('mounting')
    console.log('selected options: ', props.selectOptions)
    setMapLayers(props.selectOptions);   

  };

  useEffect(() => {
    console.log('props.selectOptions2:', props.selectOptions2)
    //setMapLayers(props.selectOptions2); 
  }, [])

        


  return (
    <>
      {props.label?(<FormLabel  component="legend">{props.label}</FormLabel>):('')}
        <MapContainer center={props.center} zoom={props.zoom} scrollWheelZoom={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          <Markers venues={props.venues} /> 
          {props.show===true
          ?(
            <FeatureGroup>
              <EditControl
                position="topleft"
                onCreated={_onCreate}
                onEdited={_onEdited}
                onDeleted={_onDeleted}
                onMounted={_onMounted}
                draw={{
                  rectangle: false,
                  polyline: false,
                  circle: false,
                  circlemarker: false,
                  marker: false,
                }}
                />                
            </FeatureGroup>
          ):(
            ''
          )}
  
        </MapContainer>      
    </>
  );
};

export default MapViewDraw;

