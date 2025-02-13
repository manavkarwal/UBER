const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require('../models/blacklistToken.models')
const captainModel = require('../models/captain.models')

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blackListTokenModel.findOne({ token: token});

  if (isBlacklisted){
    return res.status(401).json({ message:'Unauthorized'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
  

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};


module.exports.authCaptain = async (req, res, next) => {
  const tokenn = req.cookies.tokenn || req.headers.authorization?.split(" ")[ 1 ];

  if (!tokenn) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blackListTokenModel.findOne({ tokenn: tokenn});

  if (isBlacklisted){
    return res.status(401).json({ message:'Unauthorized'});
  }

  try {
    const decoded = jwt.verify(tokenn, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
  
    req.captain = captain;
  

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
