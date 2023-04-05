import React, { useContext, useEffect } from "react";
import { Marker } from "react-leaflet";
import { VenueLocationIcon } from "./VenueLocationIcon";
import MarkerPopup from "./MarkerPopup";
import { POAContext } from "../../context/POAContext";

const VenueMarkersPOAIndex = (props) => {
  //useContext 
  const {setOpenPopupMarker} = useContext(POAContext)

 //const { venues } = props;
  const markers = props.venues.map((venue, i) => (
    <Marker
      key={i}
      position={venue.ubicacion}
      icon={VenueLocationIcon}
      // onClick={(venue) => console.log('click con evento onclick venue:', venue)}
      eventHandlers={{
        click: (e) => {
          setOpenPopupMarker(true);
          props.getDetailsMarker(e);
        }
      }}
    >
      <MarkerPopup
        data={venue}
        simpleVenues={props.simpleVenues}
      />
    </Marker>
  ));
  return <>{markers}</>;
};

export default VenueMarkersPOAIndex;
