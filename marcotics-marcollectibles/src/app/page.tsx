"use client";
import styles from "./page.module.css";
import List from "@/UI/list";
import SearchBar from "@/Hooks/SearchBar";
import { useState } from "react";
import { getFoodLocations } from "./api_call";
import dynamic from "next/dynamic";
import Throbber from "@/UI/Throbber";
import toys from "./toys.json";
import food from "./food.json";

const LeafletMap = dynamic(() => import("@/UI/map"), { ssr: false });
const ResultPins = dynamic(() => import("@/UI/resultPins"), { ssr: false });

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
    image?: string;
    items?: {
      eggs?: string;
      banana?: string;
      cuties?: string;
      grapes?: string;
    };
  };
};

type LocationInfo = {
  displayName: string;
  wayId: string;
  coordinates: [number, number];
};

const toysData = JSON.parse(JSON.stringify(toys));
const foodData = JSON.parse(JSON.stringify(food));

export default function Home() {
  const [locations, setLocations] = useState<ResultData[]>([]);
  const [isQueryDone, setIsQueryDone] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Map<number, ResultData>>(new Map());
  const [query, setQuery] = useState<string>(""); // Add query state

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  
    setQuery(query); // Update the query state
    setLocations([]); // Clear previous search results
    setResults(new Map()); // Clear previous pins
    setIsSearching(true);
    setIsQueryDone(false);
  
    getFoodLocations(query)
      .then((locations: LocationInfo[]) => {
        console.log("Fetched data for query:", locations);
  
        const transformedLocations: ResultData[] = locations.map((location) => {
          const toyData = toysData["W" + location.wayId];
          const foodDataEntry = foodData["W" + location.wayId];
  
          let additionalData: ResultData["additionalData"];
          if (toyData) {
            additionalData = {
              type: "toy",
              name: toyData.name || "No toys available",
              image: toyData.image || "add_image_icon.jpg",
            };
          } else if (foodDataEntry) {
            additionalData = {
              type: "food",
              name: foodDataEntry.name || "No food available",
              items: {
                eggs: foodDataEntry.eggs || "N/A",
                banana: foodDataEntry.banana || "N/A",
                cuties: foodDataEntry.cuties || "N/A",
                grapes: foodDataEntry.grapes || "N/A",
              },
            };
          } else {
            additionalData = {
              type: "unknown",
              name: "No data available",
            };
          }
  
          return {
            name: location.displayName,
            address: `Way ID: ${location.wayId}`,
            coordinates: {
              lat: location.coordinates[0],
              lng: location.coordinates[1],
            },
            additionalData,
          };
        });
  
        setLocations(transformedLocations);
        setIsQueryDone(true);
      })
      .catch((error) => {
        console.error("Error fetching locations for query:", error);
      })
      .finally(() => {
        setIsSearching(false);
      });
  };
  // Define the addResult function
  const addResult = (location: ResultData) => {
    setResults((prevResults) => {
      const updatedResults = new Map(prevResults);
      updatedResults.set(location.coordinates.lat, location); // Use latitude as a unique key
      return updatedResults;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.mapArea}>
        <LeafletMap>
          <ResultPins results={results} query={query} /> {/* Pass the query prop */}
        </LeafletMap>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.SearchBar}>
          <SearchBar onSearch={handleSearch} />
          {isSearching && <Throbber loading={true} />}
          {isQueryDone ? (
            locations.length > 0 ? (
              <List
                items={locations}
                query={query}
                onViewInfo={(location) => {
                  setResults(new Map()); // Clear previous pins
                  addResult(location); // Add the new pin
                }}
              />
            ) : (
              <p>No results found</p>
            )
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}