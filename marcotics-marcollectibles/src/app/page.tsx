"use client";
import styles from "./page.module.css";
import List from "@/UI/list";
import SearchBar from "@/Hooks/SearchBar";
import { useState } from "react";
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

export default function Home() {
  const [displayNames, setListItems] = useState<string[]>([]);
  const [isQueryDone, setIsQueryDone] = useState(false);
const [results, setResults] = useState<Map<number, ResultData>>(new Map());
  const handleSearch = (query: string) => {
    console.log("Search query:", query);

    // Make the API call when the user searches
    setIsQueryDone(false); // Show loading state
    getMcDonaldsLocations(query) // Pass the query to the API call
      .then((locations) => {
        console.log("Fetched data for query:", locations);
        const displayNames = locations.map((location) => location.displayName);
        setListItems(displayNames); // Update state with display names
        setIsQueryDone(true); // Mark query as done
      })
      .catch((error) => {
        console.error("Error fetching McDonald's locations for query:", error);
      });
  };

  const addResult = (id: number, data: ResultData) => {
    setResults(prevResults => {
      const updatedResults = new Map(prevResults);
      updatedResults.set(id, data);
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
        <h1>{/* add map component here */}</h1>
      </div>
      {/* sidebar area */}
      <div className={styles.sidebar}>
        <div className={styles.SearchBar}>
        <SearchBar onSearch={handleSearch} />
          {/* Conditionally render the list based on the search results */}
          {isQueryDone ? (
            displayNames.length > 0 ? (
              <List items={displayNames} />
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
