// services/locationService.js
const axios = require("axios");

// Function to fetch coordinates from OpenStreetMap API
exports.getAddressCoordinates = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;

  try {
    const response = await axios.get(url);

    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      return {
        lat: parseFloat(location.lat),
        lon: parseFloat(location.lon),
      };
    }

    console.error("No coordinates found for address:", address);
    return null; // ❌ Address not found
  } catch (error) {
    console.error("Error fetching location:", error);
    throw error;
  }
};
