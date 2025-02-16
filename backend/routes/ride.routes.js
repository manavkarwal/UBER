const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid desxtination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("Invalid vehicleType"),
  rideController.createride
);

router.get(
  "/get-fare",
  authMiddleware.authUser,
  query("pickup")
    .isString()
    .isLength({
      min: 3,
    })
    .withMessage("Invalid pickup"),
  query("destination")
    .isString()
    .isLength({
      min: 3,
    })
    .withMessage("Invalid destination"),

  rideController.getFaree
);

try {
  router.post(
    "/confirm",
    authMiddleware.authCaptain,
    body("rideId").isMongoId().withMessage("Invalid ride id"),
    rideController.createRide
  );
} catch (error) {
  console.log(error,"issue in route")
}
module.exports = router;
