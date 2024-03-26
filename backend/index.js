const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
app.use(express.json());
const auth = require("./routes/auth.js");
const flight = require("./routes/flights.js");

// middleware
app.use("/auth", auth);
app.use("/flight", flight);

const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Db Connected");
  } catch (error) {
    throw error;
  }
};
app.listen(5000, async () => {
  DbConnect();
  console.log("Backend server is running!");
});
