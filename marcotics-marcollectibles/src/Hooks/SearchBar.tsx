"use client";
import {useState} from 'react';
import List from '@/UI/list';


export default function SearchBar() {
  const [data, setData] = useState<string[] | null>(null);
  const [pending, setPending ] = useState(false);
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    const query = formData.get("Search") as string;
  
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const mockResults = [ `${query}mcdonalds 1`, `${query} mcdonalds 2`, `${query}mcdonalds 3`];
    setData(mockResults);
    setPending(false);
  }


  return (
    <form onSubmit={handleSubmit}>
      <h3>search for locations </h3>
      <input type="text" name="Search" disabled={pending} placeholder='Enter a location'/>
      <button type="submit" disabled={pending}>
        {pending ? "Searching..." : "Search"}
      </button>
      <br />
      <p>{pending 
      ? "Loading..." 
      :  data 
      ? `Here are the closest resutls to your search:` 
      :  ""}</p>
      <List items={data || []} />
      </form>
  );
}
