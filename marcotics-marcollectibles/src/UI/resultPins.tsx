import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

type ResultData = {
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export default function ResultPins({ results }: { results: Map<number, ResultData> }) {
  const map = useMap(); // Access the Leaflet map instance

  // Define a custom icon for the markers
  const customIcon = L.icon({
    iconUrl: "/dropped_pin.jpg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  
  useEffect(() => {
    // Clear existing markers before adding new ones
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add new markers based on the results map
    results.forEach((result) => {
      const marker = L.marker([result.coordinates.lat, result.coordinates.lng], {icon: customIcon}).addTo(map);
      // Create and bind a Leaflet popup
      const popup = L.popup().setContent(`<h1>${result.name}</h1><p>${result.address}</p>`);
      marker.bindPopup(popup);
    });
  }, [map, results]); // Re-run effect whenever `results` changes

  return null; // No JSX is returned because we're adding markers directly to the Leaflet map
}