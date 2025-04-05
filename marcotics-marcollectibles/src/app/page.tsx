"use client";
import Image from "next/image";
import styles from "./page.module.css";
import List from "@/UI/list";
import SearchBar from "@/Hooks/SearchBar";
import { useState } from "react";
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
  const [ListItems, setListItems] = useState<string[]>([]);
  const [isQueryDone, setIsQueryDone] = useState(false);
  const [results, setResults] = useState<Map<number, ResultData>>(new Map());

  const handleSearchResults = (results: string[]) => {
    setListItems(results);
    setIsQueryDone(true);
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
          {/* Search bar component receives items and displays the list */}
          <h1>Search for locations</h1>
          <SearchBar
            onSearch={(results: string[]) => {
              handleSearchResults(results);
            }}
          />
          {/* Conditionally render the list based on the search results */}
          {isQueryDone && <List items={ListItems} />}
        </div>
      </div>
    </div>
  );
}
