const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../models/auth.js");
const bcrypt = require("bcrypt");
require("dotenv").config();
router.get("/", (req, res) => {
  res.send("Authentication");
});

let refreshTokens = [];
router.post("/refresh", (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, process.env.MY_REFRESH_KEY, (err, user) => {
    console.log("user", user);
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });

  //if everything is ok, create new access token, refresh token and send to user
});

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.MY_SECRET_KEY, {
    expiresIn: "60s",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.MY_REFRESH_KEY);
};

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userFound = await auth.findOne({ username }).exec();
  if (!userFound || !(await bcrypt.compare(password, userFound.password))) {
    res.status(400).json("Username or password incorrect!");
  } else {
    // Generate an access token
    const accessToken = generateAccessToken(userFound);
    const refreshToken = generateRefreshToken(userFound);
    refreshTokens.push(refreshToken);
    console.log("refreshTokens from login", refreshTokens);
    res.json({
      username,
      accessToken,
      refreshToken,
    });
  }
});

// register
router.post("/register", async (req, res) => {
  const { fullname, username, password } = req.body;
  const userFound = await auth.findOne({ username }).exec();
  if (userFound) {
    res.status(400).json("Username already exists!");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    await auth.create({
      fullname,
      username,
      password: hashedPassword,
    });

    res.json({
      fullname,
      username,
      password: hashedPassword,
    });
  }
});
const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.MY_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

router.delete("/users/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId) {
    res.status(200).json("User has been deleted.");
  } else {
    res.status(403).json("You are not allowed to delete this user!");
  }
});

router.post("/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
});

module.exports = router;
