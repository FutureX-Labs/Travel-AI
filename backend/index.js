const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
app.use(express.json());
const auth = require("./routes/auth.js");
const flight = require("./routes/flights.js");
const http = require("http").createServer(app);
const socket = require("./sockets/socket.js");

const { Server } = require("socket.io");
const io = socket(http);
const cors = require("cors");
app.use(cors());
// middleware
app.use("/api", auth);
app.use("/api", flight);

http.listen(4000, () => {
  console.log("listening on *:4000");
});

const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Db Connected");
  } catch (error) {
    throw error;
  }
};
app.listen(5000, async () => {
  // DbConnect();
  console.log("Backend server is running!");
});
