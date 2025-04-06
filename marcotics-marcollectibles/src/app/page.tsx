"use client";
import styles from "./page.module.css";
import List from "@/UI/list";
import SearchBar from "@/Hooks/SearchBar";
import { useState } from "react";
import { getMcDonaldsLocations } from "./api_call";
import dynamic from "next/dynamic";
import Throbber from "@/UI/Throbber";
import toys from "./toys.json";

// Dynamically import the Map and ResultPins components to ensure they only render on the client
const LeafletMap = dynamic(() => import("@/UI/map"), { ssr: false });
const ResultPins = dynamic(() => import("@/UI/resultPins"), { ssr: false });

type ResultData = {
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  },
  toys: string;
};

type LocationInfo = {
  displayName: string;
  wayId: string;
  coordinates: [number, number],
  toys: string;
}

const toysData = JSON.parse(JSON.stringify(toys));

export default function Home() {
  const [locations, setLocations] = useState<ResultData[]>([]);
  const [isQueryDone, setIsQueryDone] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // New state to track if a search is in progress
  const [hasSearched, setHasSearched] = useState(false); // tracks if a search has been initiated
  const [results, setResults] = useState<Map<number, ResultData>>(new Map());

  const handleSearch = (query: string) => {
    console.log("Search query:", query);

    setIsSearching(true); // Start the search
    setIsQueryDone(false); // Reset query state

    getMcDonaldsLocations(query)
      .then((locations: LocationInfo[]) => {
        console.log("Fetched data for query:", locations);

        // Transform LocationInfo to ResultData
        const transformedLocations: ResultData[] = locations.map((location) => ({
          name: location.displayName,
          address: `Way ID: ${location.wayId}`,
          coordinates: {
            lat: location.coordinates[0],
            lng: location.coordinates[1],
          },
          toys: toysData["W" + location.wayId] || "No toys available", // Use wayId to find toys
        }));

        setLocations(transformedLocations); // Update state with transformed data
        setIsQueryDone(true); // Mark query as done
      })
      .catch((error) => {
        console.error("Error fetching McDonald's locations for query:", error);
      })
      .finally(() => {
        setIsSearching(false); // End the search
      });
  };

  const addResult = (location: ResultData) => {
    setResults(() => {
      const updatedResults = new Map();
      updatedResults.set(1, location);
      return updatedResults;
    });
  };

  return (
    <div className={styles.container}>
      {/* map area */}
      <div className={styles.mapArea}>
        <LeafletMap>
          <ResultPins results={results} />
        </LeafletMap>
      </div>
      {/* sidebar area */}
      <div className={styles.sidebar}>
        <div className={styles.SearchBar}>
          <SearchBar onSearch={handleSearch} />
          {/* Show Throbber only when searching */}
          {isSearching && <Throbber loading={true} />}
          {isQueryDone ? (
            locations.length > 0 ? (
              <List
                items={locations}
                onViewInfo={(location) => addResult(location)}
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