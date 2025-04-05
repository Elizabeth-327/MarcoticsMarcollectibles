import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for missing marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Define the default icon for markers
const DefaultIcon = L.icon({
  iconUrl: typeof markerIcon === "string" ? markerIcon : markerIcon.src, // Extract the `src` property if it's a StaticImageData object
  shadowUrl: typeof markerShadow === "string" ? markerShadow : markerShadow.src, // Extract the `src` property if it's a StaticImageData object
  iconSize: [25, 41], // Default size for Leaflet markers
  iconAnchor: [12, 41], // Anchor point of the icon
  popupAnchor: [1, -34], // Anchor point for popups
  shadowSize: [41, 41], // Size of the shadow
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Map() {
  return (
    <MapContainer
      center={[51.505, -0.09]} // Initial center of the map
      zoom={13} // Initial zoom level
      style={{ height: "100vh", width: "100%" }} // Fullscreen map
    >
      {/* Add a tile layer (e.g., OpenStreetMap) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Add a marker */}
      <Marker position={[51.505, -0.09]}>
        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
      </Marker>
    </MapContainer>
  );
}