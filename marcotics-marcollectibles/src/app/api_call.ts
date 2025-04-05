import React, { useState, useEffect } from "react";
import axios from 'axios';

/*
const McDonaldsLocations = () => {
    const [locations, setLocations] = useState<any[]>([]); // State to store results
    const [query, setQuery] = useState<string>("McDonald's"); 
    const [error, setError] = useState<string>("");
    // This function makes 5 API calls for 5 different "way" objects (the 5 different McDonald's in Lawrence)
    const getLocations = async (query: string) => {
        const baseUrl = "https://nominatim.openstreetmap.org/lookup";
        const ways = [
            "W218982343",
            "W219358913",
            "W218961994",
            "W219637466",
            "W44904587"
        ];

        if (query.toLowerCase() !== "mcdonald's") {
            setError("We only support searching for McDonald's locations.");
            setLocations([]); // Clear any previous locations
            return; // Don't make API calls if the query is not "McDonald's"
        }
        try {
            const requests = ways.map((way) => 
                axios.get(`${baseUrl}?osm_ids=way${way}&format=json`)); // array of promises
            const responses = await Promise.all(requests); // contains the results of the API calls (when all the calls are complete)
            
            console.log("API Responses: ", responses);
            const results = responses.map((response) => response.data[0]?.display_name);
            setLocations(results); // set results in state
        } catch (error) {
            console.error("Error fetching OSM data:", error);
        }
    };

    // Trigger API call when component mounts or query changes
    useEffect(() => {getLocations(query)}, [query]);
    // Log the locations array to the console
    useEffect(() => {
        console.log("McDonald's Locations:", locations); // This will log every time locations change
    }, [locations]);
    return locations;
};
export default McDonaldsLocations;
*/

/*
export const getLocationByOsmId = async (osmIds: string[]) => {
    const baseUrl = "https://nominatim.openstreetmap.org/lookup";
    const url = `${baseUrl}?osm_ids=${osmIds.join(",")}&format=json`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching OSM data:', error);
        throw error;
    }
};
*/

export const getMcDonaldsLocations = async () => {
    const baseUrl = "https://nominatim.openstreetmap.org/lookup";
    const ways = [
            "W218982343",
            "W219358913",
            "W218961994",
            "W219637466",
            "W44904587"
    ];
    const locations = [];
    for (let i = 0; i < 5; i++) {
        try {
            const url = `${baseUrl}?osm_ids=${ways[i]}&format=json`;
            const response = await axios.get(url);
            if (response.data && response.data[0]) {
                locations.push(response.data[0].display_name); // Store the display name
            }
        } catch (error) {
            console.error('Error fetching OSM data:', error);
            throw error;
        }
    }
    return locations;
};

/*
when "McDonald's" is typed into the search bar, there will be 5 api calls:
- W218982343
- W219358913
- W218961994
- W219637466
- W44904587
*/



