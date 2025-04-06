import React, { useState, useEffect } from "react";
import axios from 'axios';
import toys from './toys.json';

const toysData = JSON.parse(JSON.stringify(toys));

 export type LocationInfo = {
    displayName: string;
    wayId: string;
    coordinates: [number, number],
    toys: string;
};

export const getMcDonaldsLocations = async (query: string): Promise <LocationInfo[]> => {
    const baseUrl = "https://nominatim.openstreetmap.org/lookup";
    const ways = [
            "W218982343",
            "W219358913",
            "W218961994",
            "W219637466",
            "W44904587"
    ];
    const locations: LocationInfo[] = [];

    for (let i = 0; i < 5; i++) {
        try {
            const url = `${baseUrl}?osm_ids=${ways[i]}&format=json`;
            const response = await axios.get(url);
            if (response.data && response.data[0]) {
                const displayName = response.data[0].display_name;
                const wayId = response.data[0].osm_id; 
                const coordinates: [number, number] = [
                    parseFloat(response.data[0].lat), 
                    parseFloat(response.data[0].lon)
                ];
                const toys = toysData["W" + wayId] || "No toys available"; // Use wayId to find toys
                const info: LocationInfo = {
                    displayName,
                    wayId,
                    coordinates,
                    toys
                };
                // Filter results based on the query (case-insensitive)
                if (displayName.toLowerCase().includes(query.toLowerCase())) {
                  locations.push(info); // Add matching location to the results
                }
            }
        } catch (error) {
            console.error('Error fetching OSM data:', error);
            throw error;
        }
    }
    return locations;
};