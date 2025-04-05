import React, { useState, useEffect } from "react";
import axios from 'axios';

export const getMcDonaldsLocations = async (query: string): Promise <string[]> => {
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
                const displayName = response.data[0].display_name;

                // Filter results based on the query (case-insensitive)
                if (displayName.toLowerCase().includes(query.toLowerCase())) {
                  locations.push(displayName); // Add matching location to the results
                }
            }
        } catch (error) {
            console.error('Error fetching OSM data:', error);
            throw error;
        }
    }
    return locations;
};