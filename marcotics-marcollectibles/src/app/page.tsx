"use client";
import styles from "./page.module.css";
import List from "@/UI/list";
import SearchBar from "@/Hooks/SearchBar";
import { useState, useEffect } from "react";
import { getMcDonaldsLocations } from "./api_call";
import dynamic from "next/dynamic";
// Dynamically import the Map and ResultPins components to ensure they only render on the client
const LeafletMap = dynamic(() => import("@/UI/map"), { ssr: false });
const ResultPins = dynamic(() => import("@/UI/resultPins"), { ssr: false });

type ResultData = {
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

type LocationInfo = {
  displayName: string;
  wayId: string;
  coordinates: [number, number];
}

export default function Home() {
  const [locations, setLocations] = useState<ResultData[]>([]);
  const [isQueryDone, setIsQueryDone] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // tracks if a search has been initiated
  const [results, setResults] = useState<Map<number, ResultData>>(new Map());

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  
    // Make the API call when the user searches
    setIsQueryDone(false); // Show loading state
    getMcDonaldsLocations(query) // Pass the query to the API call
      .then((locations: LocationInfo[]) => {
        console.log("Fetched data for query:", locations);
  
        // Transform LocationInfo to ResultData
        const transformedLocations: ResultData[] = locations.map((location) => ({
          name: location.displayName, // Map displayName to name
          address: `Way ID: ${location.wayId}`, // Use wayId as part of the address
          coordinates: {
            lat: location.coordinates[0], // Extract latitude from coordinates
            lng: location.coordinates[1], // Extract longitude from coordinates
          },
        }));
  
        setLocations(transformedLocations); // Update state with transformed data
        setIsQueryDone(true); // Mark query as done
      })
      .catch((error) => {
        console.error("Error fetching McDonald's locations for query:", error);
      });
  };

  const addResult = (location: ResultData) => {
    setResults(() => {
      const updatedResults = new Map(); // Clear all existing pins
      updatedResults.set(1, location); // Add the new marker with a unique key
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
          {/* Conditionally render the list based on the search results */}
          {isQueryDone ? (
            locations.length > 0 ? (
              <List
                items={locations}
                onViewInfo={(location) => addResult(location)} // Pass the callback to handle button clicks
              />
            ) : (
              <p>No results found</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}