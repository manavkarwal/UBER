// services/locationService.js
const axios = require('axios');

// Function to fetch coordinates from OpenStreetMap API
exports.getAddressCoordinates = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  
  try {
    const response = await axios.get(url);
    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      return {
        ltd: location.lat,
        lng: location.lon
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching location:', error);
    throw error;
  }
};
