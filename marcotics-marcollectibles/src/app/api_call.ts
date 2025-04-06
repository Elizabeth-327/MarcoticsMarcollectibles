import React, { useState, useEffect } from "react";
import axios from 'axios';
import toys from './toys.json';
import food from "./food.json";

const toysData = JSON.parse(JSON.stringify(toys));
const foodData = JSON.parse(JSON.stringify(food));
export type LocationInfo = {
    displayName: string;
    wayId: string;
    coordinates: [number, number];
    additionalData: {
        type: "toy" | "food" | "unknown"; // Indicates whether the data is for a toy or food
        name: string; // Name of the toy or food location
        image?: string; // Optional: Image for toys
        price?: string; // Optional: Price for food (if applicable)
        items?: { // Optional: Prices for individual food items
            eggs?: string;
            banana?: string;
            cuties?: string;
            grapes?: string;
        };
    };
};

export const getFoodLocations = async (query: string): Promise<LocationInfo[]> => {
    const baseUrl = "https://nominatim.openstreetmap.org/lookup";
    const ways = [
        "W218982343",
        "W219358913",
        "W218961994",
        "W219637466",
        "W44904587",
        "W205580695",
        "W180772453",
        "W205798388",
        "W165083365"
    ];
    const locations: LocationInfo[] = [];

    for (let i = 0; i < ways.length; i++) {
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

                // Check if the wayId corresponds to toy data or food/price data
                let additionalData: LocationInfo["additionalData"];
                if (toysData["W" + wayId]) {
                    // If the wayId corresponds to toy data
                    additionalData = {
                        type: "toy",
                        name: toysData["W" + wayId]["name"] || "No toys available",
                        image: toysData["W" + wayId]["image"] || "add_image_icon.jpg"
                    };
                } else if (foodData["W" + wayId]) {
                    // If the wayId corresponds to food data
                    additionalData = {
                        type: "food",
                        name: foodData["W" + wayId]?.["name"] || "No food available",
                        items: {
                            eggs: foodData["W" + wayId]?.["eggs"] || "N/A",
                            banana: foodData["W" + wayId]?.["banana"] || "N/A",
                            cuties: foodData["W" + wayId]?.["cuties"] || "N/A",
                            grapes: foodData["W" + wayId]?.["grapes"] || "N/A"
                        }
                    };
                } else {
                    // If no matching data is found
                    additionalData = {
                        type: "unknown",
                        name: "No data available"
                    };
                }

                const info: LocationInfo = {
                    displayName,
                    wayId,
                    coordinates,
                    additionalData
                };

                // Add all food locations regardless of the query
                if (
                    (additionalData.type === "food" &&
                      (query.toLowerCase() === "banana" ||
                       query.toLowerCase() === "eggs" ||
                       query.toLowerCase() === "grapes" ||
                       query.toLowerCase() === "cuties")) || // Match specific food items
                    displayName.toLowerCase().includes(query.toLowerCase()) // Match locations by displayName
                  ) {
                    locations.push(info); // Add matching location to the results
                  }
            }
        } catch (error) {
            console.error("Error fetching OSM data:", error);
            throw error;
        }
    }
    return locations;
};