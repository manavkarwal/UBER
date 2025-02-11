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

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

const sendMessageToSocketId = (socketId, message) => {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.log("Socket.io not initialized.");
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
