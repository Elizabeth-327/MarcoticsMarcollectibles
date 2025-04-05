"use client";
import styles from "./page.module.css";
import List from "@/UI/list";
import SearchBar from "@/Hooks/SearchBar";
import { useState } from "react";
import { getMcDonaldsLocations } from "./api_call";

export default function Home() {
  const [data, setListItems] = useState<string[]>([]);
  const [isQueryDone, setIsQueryDone] = useState(false);

  const handleSearch = (query: string) => {
    console.log("Search query:", query);

    // Make the API call when the user searches
    setIsQueryDone(false); // Show loading state
    getMcDonaldsLocations(query) // Pass the query to the API call
      .then((fetchedData: string[]) => {
        console.log("Fetched data for query:", fetchedData);
        setListItems(fetchedData); // Update state with fetched data
        setIsQueryDone(true); // Mark query as done
      })
      .catch((error) => {
        console.error("Error fetching McDonald's locations for query:", error);
      });
  };

  return (
    <div className={styles.container}>
      {/* Sidebar area */}
      <div className={styles.sidebar}>
        <div className={styles.SearchBar}>
          <h1>Search for locations</h1>
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