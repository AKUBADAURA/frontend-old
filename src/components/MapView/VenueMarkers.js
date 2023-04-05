import React, { useEffect } from "react";
import { Marker } from "react-leaflet";
import { VenueLocationIcon } from "./VenueLocationIcon";
import MarkerPopupSimple from "./MarkerPopupSimple";

const VenueMarkers = (props) => {

  //const { venues } = props;
  const markers = props.venues.map((venue, i) => (
    <Marker
      key={i}
      position={venue.ubicacion}
      icon={VenueLocationIcon}
    >
      <MarkerPopupSimple
        data={venue}
        simpleVenues={props.simpleVenues}
      />
    </Marker>
  ));
  return <>{markers}</>;
};

export default VenueMarkers;
