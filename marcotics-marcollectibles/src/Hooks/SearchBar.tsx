"use client";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (results: string[]) => void; // Prop to pass search results
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [data, setData] = useState<string[] | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    const query = formData.get("Search") as string;

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const mockResults = [
      `${query} mcdonalds 1`,
      `${query} mcdonalds 2`,
      `${query} mcdonalds 3`,
    ];
    setData(mockResults);
    onSearch(mockResults); // Pass results to parent component
    setPending(false);
  };

  return (  
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Search"
        disabled={pending}
        placeholder="Enter a location"
        style={{ width: "80%", height: "40px", fontSize: "16px" }}
      />
      <button type="submit" disabled={pending}>
        {pending ? "Searching..." : "Search"}
      </button>
      <br />
      <p>
        {pending
          ? "Loading..."
          : data
          ? `Here are the closest results to your search:`
          : ""}
      </p>
    </form>
  );
}