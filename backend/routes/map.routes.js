const express = require("express");
const router = express.Router();
const mapController = require("../controllers//map.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const { query } = require("express-validator");

// POST request to search location and get coordinates
router.get("/get-coordinates",
    query('address').isString().isLength({ min:3 }),
    authMiddleware.authUser,
    mapController.getCoordinates);

module.exports = router;
