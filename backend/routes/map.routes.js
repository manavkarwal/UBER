const express = require("express");
const router = express.Router();
const mapController = require("../controllers//map.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const { query } = require("express-validator");

// POST request to search location and get coordinates
router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getCoordinates
);

router.get(
  "/getdistancetime",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getDistanceAndTime
);

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getAutoCompleteSuggestions
);
module.exports = router;
