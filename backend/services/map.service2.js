// services/locationService.js
const axios = require("axios");

const mapService = require("../services/map.services");

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  try {
    const originCoords = await mapService.getAddressCoordinates(origin);
    const destinationCoords = await mapService.getAddressCoordinates(destination);

    if (!originCoords || !destinationCoords) {
      throw new Error("Invalid origin or destination address");
    }

    const apiKey = process.env.OSM_MAP_API;

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${originCoords.lon},${originCoords.lat}&end=${destinationCoords.lon},${destinationCoords.lat}`;


    console.log(url)
    const response = await axios.get(url);

    if (response.data?.features?.length > 0) {
      const route = response.data.features[0].properties;
      return {
        distance: route.segments ? route.segments[0].distance : "N/A",
        duration: route.segments ? route.segments[0].duration : "N/A",
      };
    } else {
      throw new Error("Invalid API response: No routes or segments found.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
