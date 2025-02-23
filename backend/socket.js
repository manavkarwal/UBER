const SocketIo = require("socket.io");
const userModel = require("./models/user.models.js");
const captainModel = require("./models/captain.models.js");

let io;

const initializeSocket = (server) => {
  io = SocketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location || !location.lat || !location.lon) {
        return socket.emit("error", { message: "Invalid  location" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          lat: location.lat,
          lon: location.lon,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(`Sending message to ${socketId}, messageObject.event, messageObject.data`);
  
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
