const rideModel = require("../models/ride.models");
const { sendMessageToSocketId } = require("../socket");
const mapService = require("./map.service2");
const crypto = require('crypto');


async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destiontion are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

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

module.exports.getFare = getFare


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

module.exports.confirmRide = async ( ride, captain ) => {

  
  try {
    if (!ride) {
      throw new Error("Ride id is required");
    }

    await rideModel.findOneAndUpdate(
      { _id: ride },
      {
        status: "accepted",
        captain: captain,
        
      }
    );

    const ridee = await rideModel.findOne({ _id: ride }).populate('user').populate('captain').select('+otp');
    if (!ridee) {
      throw new Error("Ride id not found");
    }
    return ridee;
  } catch (error) {
    console.log(error, "in ride services");
    throw error; // Ensure error is propagated
  }
};


module.exports.startRide = async (rideId, otp) => {


  if(!rideId || !otp) {
    throw new Error('Ride if and OTP are required');
  }

  const ride = await rideModel.findOne({
    _id : rideId
  }).populate('user').populate('captain').select('+otp');


  if(!ride) {
    throw new Error ('Ride not found');
  }

  if (ride.status !== 'accepted'){
    throw new Error('Ride not accepted');
  }


  if( ride.otp !== otp){
    throw new Error ('Invalid OTP');
  }


  await rideModel.findOneAndUpdate({
    _id :rideId
  },{
    status: 'ongoing'
  })


  // sendMessageToSocketId(ride.user.socketId,{
  //   event: 'ride-started',
  //   data:ride
  // })

  return ride



}

module.exports.endRide = async ( rideId ) => {

  if (!rideId) {
      throw new Error('Ride id is required');
  }

  const ride = await rideModel.findOne({
      _id: rideId,
     
      
  }).populate('user').populate('captain').select('+otp');

  if (!ride) {
      throw new Error('Ride not found');
  }

  if (ride.status !== 'ongoing') {
      throw new Error('Ride not ongoing');
  }

  await rideModel.findOneAndUpdate({
      _id: rideId
  }, {
      status: 'completed'
  })

  return ride;
}