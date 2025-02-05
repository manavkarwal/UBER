// controllers/locationController.js
const mapService = require('../services/map.services');
const { validationResult }= require('express-validator');

exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  const { address } = req.query; // Assuming the location query is sent in the request body
  
  try {
    const coordinates = await mapService.getAddressCoordinates(address);
    if (coordinates) {
      res.status(200).json({ coordinates });
    } else {
      res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
