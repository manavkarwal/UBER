const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid desxtination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid vehicleType'),
    rideController.createride
)

module.exports = router;