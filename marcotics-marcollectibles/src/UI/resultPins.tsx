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
  additionalData: {
    type: "toy" | "food" | "unknown";
    name: string;
    image?: string; // Optional for toys
    items?: { // Optional for food
      eggs?: string;
      banana?: string;
      cuties?: string;
      grapes?: string;
    };
  };
};

export default function ResultPins({
  results,
  query,
}: {
  results: Map<number, ResultData>;
  query: string;
}) {
  const map = useMap(); // Access the Leaflet map instance

  // Define a custom icon for the markers
  const customIcon = L.icon({
    iconUrl: "/dropped_pin.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    // Clear existing markers before adding new ones
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
  
    // Add new markers based on the results map
    results.forEach((result) => {
      const marker = L.marker([result.coordinates.lat, result.coordinates.lng], {
        icon: customIcon,
      }).addTo(map);
  
      // Dynamically create popup content based on the type of data
      let popupContent = `<h1>${result.name}</h1><p>${result.address}</p>`;
      if (result.additionalData.type === "toy") {
        // Toy-specific content
        popupContent += `
          <p>Toy: ${result.additionalData.name}</p>
          <img src="${result.additionalData.image}" alt="${result.additionalData.name}" style="width: 100px; height: auto;" />
        `;
      } else if (result.additionalData.type === "food") {
        // Food-specific content based on the query
        const foodItems = result.additionalData.items;
        const normalizedQuery = query.toLowerCase();
  
        // Debugging: Log the foodItems and query
        console.log("Food Items:", foodItems);
        console.log("Query:", normalizedQuery);
  
        if (foodItems) {
          if (normalizedQuery === "eggs" && foodItems.eggs) {
            popupContent += `<p>Eggs: ${foodItems.eggs}</p>`;
          } else if (normalizedQuery === "banana" && foodItems.banana) {
            popupContent += `<p>Banana: ${foodItems.banana}</p>`;
          } else if (normalizedQuery === "cuties" && foodItems.cuties) {
            popupContent += `<p>Cuties: ${foodItems.cuties}</p>`;
          } else if (normalizedQuery === "grapes" && foodItems.grapes) {
            popupContent += `<p>Grapes: ${foodItems.grapes}</p>`;
          } else {
            popupContent += `<p>No matching food item found for query: ${query}</p>`;
          }
        } else {
          popupContent += `<p>No food items available</p>`;
        }
      } else {
        // Unknown type
        popupContent += `<p>No additional data available</p>`;
      }
  
      const popup = L.popup().setContent(popupContent);
      marker.bindPopup(popup);
    });
  }, [map, results, query]); // Re-run effect whenever `results` or `query` changes

  return null; // No JSX is returned because we're adding markers directly to the Leaflet map
}