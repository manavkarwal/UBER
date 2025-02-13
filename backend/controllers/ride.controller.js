const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require('../services/map.services');
const mapService2 = require('../services/map.service2');



module.exports.createride = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
     

     const pickupCoordinates = await mapService.getAddressCoordinates(pickup);

     const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.lat, pickupCoordinates.lon, 2)

    

      return res.status(201).json({ ride, captainsInRadius });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.getFaree = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
