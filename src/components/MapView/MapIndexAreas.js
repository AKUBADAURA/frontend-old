import React, { useState, useEffect, useMemo, useContext } from 'react';
import { MapContainer, TileLayer, Circle, FeatureGroup, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import EditControl from '../../logic/EditControl';
import { FormLabel } from '@material-ui/core';
import Markers from "./VenueMarkers";
import { defaultCenterMapDrawer, defaultZoomMapDrawer, defaultLabelMapDrawer, typesMapaIndex, zoomDefaultIndex, centerMapDrawerDefault } from '../../types/types';
import { POAContext } from '../../context/POAContext';
import MarkerPopup from './MarkerPopup';
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { useRef } from 'react';






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

const MapIndexAreas = (props) => {
    const popupElRef = useRef(null);
    const [map, setMap] = useState(null);
    const {
        typesViewMapaIndex,
        setAreaMapNombreDepartamento,
        setAreaMapCodigoMunicipio,
        openPopupMarker,
        setOpenPopupMarker
    } = useContext(POAContext)

    const [isFirstTime, setIsFirstTime] = useState(true)
    const [isFirstTimeLayer, setIsFirstTimeLayer] = useState(true)

    useEffect(() => {
    //   console.log('firsttime change: ', isFirstTime)
      return () => {
        
      }
    }, [isFirstTime])
    


    let _editableFG = null;

    const _onFeatureGroupReady = (reactFGref) => {
        // console.log('inside render layer')
        if (isFirstTime === true) {
            let leafletGeoJSON = new L.GeoJSON(props.selectOptions);
            let leafletFG = reactFGref;
            leafletGeoJSON.eachLayer((layer) => {
                leafletFG.addLayer(layer);
            });
        }
        _editableFG = reactFGref;
        setIsFirstTime(false)
    };

    const getDetailsLayer = async (e) => {
        setOpenPopupMarker(true);
        if (isFirstTimeLayer=== true) {
            // console.log('is first time on function')
            // console.log('popupElRef: ', popupElRef)
            // console.log('map: ', map)
            // if (!popupElRef.current || !map) return;
            // console.log('before validation')
            popupElRef.current._close();
            // popupElRef.current._open();
            setIsFirstTimeLayer(false)
        }
        console.log('is NOT first time')
        console.log('paso 1 getDetailsLayer on mapIndexAreas')
        // setOpenPopupMarker(true)
        if (typesViewMapaIndex === typesMapaIndex.municipios) { //se verifica que se esté en modo showing, con un tipo de mapa por areas 
            await props.getDetailsLayerPopup(e.layer.feature.properties.MPIO_CCNCT, 'municipio')
            // setAreaMapCodigoMunicipio(e.layer.feature.properties.MPIO_CCNCT)
        }
        else if (typesViewMapaIndex === typesMapaIndex.departamentos) { //se verifica que se esté en modo showing, con un tipo de mapa por areas
            // setOpenPopupMarker(true)
            await props.getDetailsLayerPopup(e.layer.feature.properties.NOMBRE_DPT, 'departamento')
            // setAreaMapNombreDepartamento()
        }
    }

    return (
        <>
            {props.label ? (<FormLabel component="legend">{props.label}</FormLabel>) : (defaultLabelMapDrawer)}
            <MapContainer
                center={centerMapDrawerDefault}
                zoom={zoomDefaultIndex}
                zoomControl={true}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FeatureGroup
                    ref={(reactFGref) => {
                        if (reactFGref !== null) {
                            _onFeatureGroupReady(reactFGref);
                        }
                    }}
                    eventHandlers={{ click: async (e) => { await getDetailsLayer(e) } }}
                >
                    <Popup ref={popupElRef}>
                        {/* <span>Item showing</span> */}
                        <MarkerPopup  />
                    </Popup>
                </FeatureGroup>
            </MapContainer>
        </>
    );
}

export default MapIndexAreas

