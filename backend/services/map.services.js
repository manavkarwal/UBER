// services/locationService.js
const axios = require("axios");
const captainModel = require("../models/captain.models");

// Function to fetch coordinates from OpenStreetMap API
module.exports.getAddressCoordinates = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;

  try {
    const response = await axios.get(url);

    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      return {
        lat: parseFloat(location.lat),
        lon: parseFloat(location.lon)
      };
    }

    console.error("No coordinates found for address:", address);
    return null; 
  } catch (error) {
    console.error("Error fetching location:", error);
    throw error;
  }
};


module.exports.getCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Query is required");
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    input
  )}&addressdetails=1`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.length > 0) {
      return response.data.map((suggestion) => ({
        label: suggestion.display_name,
        latitude: suggestion.lat,
        longitude: suggestion.lon,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching search suggestions:", error);
    throw error;
  }
};

module.exports.getCaptainsInTheRadius = async (lat, lon, radius) => {
  const captains = await captainModel.find({
    location:{
      $geoWithin:{
        $centerSphere:[ [lat, lon], radius / 6371]
      }
    }
  });
  
  return captains;

 
}