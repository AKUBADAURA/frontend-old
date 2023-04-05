import React, { useState } from "react";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import '../../css/maps.css';
import Markers from "./VenueMarkers";
import MarkersPOAindex from "./VenueMarkersPOAIndex";
import { CircularProgress, FormLabel } from "@material-ui/core";
import ModalNoData from "./ModalNoData";

const MapView = (props) => {

  //vars & const

  const purpleOptions = { color: 'purple' }

  //useLocation & useHistory (HOOKS REACT ROUTER)

  //useContext 

  //useState

  //useEffect 

  return (
    <>
      {props.label ? (<FormLabel component="legend">{props.label}</FormLabel>) : ('')}
      <MapContainer center={props.center} zoom={props.zoom} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {props.simpleVenues === true
          ? <Markers
            simpleVenues={props.simpleVenues}
            venues={props.venues}
          />
          : <MarkersPOAindex
            simpleVenues={props.simpleVenues}
            getDetailsMarker={props.getDetailsMarker}
            venues={props.venues}
          />
        }

        {props.polygon === true
          ? (<Polygon pathOptions={purpleOptions} positions={props.data} />)
          : ('')
        }
      </MapContainer>
      {props.loadingMap === true
        ? <CircularProgress id="loading" color="primary" />
        : ''
      }
      {/* {props.modalNoData===true
      ? <ModalNoData />
      : null
      }  */}
    </>

  );
};

export default MapView;

