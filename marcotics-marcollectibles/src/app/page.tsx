"use client";
import Image from "next/image";
import styles from "./page.module.css";
import List from "@/UI/list";
import SearchBar from "@/Hooks/SearchBar";
import { useState } from "react";
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
  const [ListItems, setListItems] = useState<string[]>([]);
  const [isQueryDone, setIsQueryDone] = useState(false);
  const handleSearchResults = (results: string[]) => {
    setListItems(results);
    setIsQueryDone(true);
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
