const rideModel = require("../models/ride.models");
const mapService = require("./map.service2");
const crypto = require('crypto');


async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destiontion are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  console.log(distanceTime.value);

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance / 1000) * perKmRate.auto +
        (distanceTime.duration / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance / 1000) * perKmRate.car +
        (distanceTime.duration / 60) * perMinuteRate.car
    ),
    motorcycle: Math.round(
      baseFare.motorcycle +
        (distanceTime.distance / 1000) * perKmRate.motorcycle +
        (distanceTime.duration / 60) * perMinuteRate.motorcycle
    ),
  };

  return fare;
}


function getOtp(num) {
    function generateOtp(num) {
      const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
      return otp;
    }

    return generateOtp(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};
