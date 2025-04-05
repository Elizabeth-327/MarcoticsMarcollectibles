"use client";
import styles from "./page.module.css";
import List from "@/UI/list";
import SearchBar from "@/Hooks/SearchBar";
import { useState } from "react";
import { getMcDonaldsLocations } from "./api_call";
import dynamic from "next/dynamic";

// Dynamically import the Map component to ensure it only renders on the client
const LeafletMap = dynamic(() => import("@/UI/map"), { ssr: false });

type ResultData = {
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

const results = new Map<number, ResultData>();

export function ListResults() {
  return (
    <div>
      <ul>
        {Array.from(results.values()).map((result) => (
          <li key={result.name}>
            {result.name} - {result.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  const [data, setListItems] = useState<string[]>([]);
  const [isQueryDone, setIsQueryDone] = useState(false);

  const handleSearch = (query: string) => {
    console.log("Search query:", query);

    // Make the API call when the user searches
    setIsQueryDone(false); // Show loading state
    getMcDonaldsLocations(query) // Pass the query to the API call
      .then((data: string[]) => {
        console.log("Fetched data for query:", data);
        setListItems(data); // Update state with fetched data
        setIsQueryDone(true); // Mark query as done
      })
      .catch((error) => {
        console.error("Error fetching McDonald's locations for query:", error);
      });
  };

  return (
    <div className={styles.container}>
      {/* map area */}
      <div className={styles.mapArea}>
        <LeafletMap />
        <h1>{/* add map component here */}</h1>
      </div>
      {/* sidebar area */}
      <div className={styles.sidebar}>
        <div className={styles.SearchBar}>
        <SearchBar onSearch={handleSearch} />
          {/* Conditionally render the list based on the search results */}
          {isQueryDone ? (
            data.length > 0 ? (
              <List items={data} />
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
