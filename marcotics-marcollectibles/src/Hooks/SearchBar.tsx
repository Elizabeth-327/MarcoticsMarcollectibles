"use client";

interface SearchBarProps {
  onSearch: (query: string) => void; // Pass the search query to the parent
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("Search") as string;

    // Pass the search query to the parent component
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Search"
        placeholder="Enter a location"
        style={{ width: "80%", height: "40px", fontSize: "16px" }}
      />
      <button type="submit">Search</button>
    </form>
  );
}