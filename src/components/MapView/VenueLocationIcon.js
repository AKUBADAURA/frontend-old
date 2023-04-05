import L from "leaflet";
const urlIcon = process.env.PUBLIC_URL + '/img/venue_location_icon.svg'

export const VenueLocationIcon = L.icon({
  //iconUrl: ("img/venue_location_icon.svg"),
  iconUrl: (urlIcon),
  //iconRetinaUrl: ("img/venue_location_icon.svg"),
  iconRetinaUrl: (urlIcon),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});
