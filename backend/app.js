const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const rideRoutes = require('./routes/ride.routes')

const cookieParser = require("cookie-parser");
const app = express();
app.use(cors());
connectToDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const mapsRoutes = require("./routes/map.routes");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", userRoutes);
app.use("/captain", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/ride", rideRoutes )

module.exports = app;
