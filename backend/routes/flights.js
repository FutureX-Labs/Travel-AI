const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

router.get("/flight", async (req, res) => {
  try {
    const {
      flying_from,
      flying_to,
      departure_date,
      class_selections,
      stopovers,
    } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    let config = {
      headers: {
        "X-RapidAPI-Key": "f32c78986cmsh12ef2c5be09aae5p1ec3adjsne50e1b1deffa",
      },
    };

    const RapidApiData = await axios.get(
      `https://agoda-com.p.rapidapi.com/flights/one-way/search?flying_from=${flying_from}&flying_to=${flying_to}&departure_date=${departure_date}`,
      config
    );
    console.log(RapidApiData.data.data);
    if (RapidApiData.data.data === null) {
      res.status(200).send(RapidApiData.data.message);
    } else {
      let RapidDataResponse = JSON.stringify(RapidApiData.data);

      let words = RapidDataResponse.split(" ");
      words = words.slice(0, 260);
      RapidDataResponse = words.join(" ");
      const prompt =
        RapidDataResponse +
        `\n \n the travelers recomendations are  class of service:${class_selections} and stopovers: ${stopovers} recommend the traveler one flight from the data above that suites the best these bases with total price and always give the most matched recommendation, even if the data is not matched then five the first flight and do not repeat anything twice `;
      console.log(prompt);
      if (RapidDataResponse) {
        const result = await model.generateContent(prompt);

        const text = result.response.text();
        res.status(200).json(text);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/accommodation", verify, async (req, res) => {
  try {
    const { location, date, noOfRooms, hotelStars, breakfast, budget } =
      req.body;
    console.log(location, date, noOfRooms, hotelStars, breakfast, budget);
    //   const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    //   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    //   let config = {
    //     headers: {
    //       "X-RapidAPI-Key": "de2f16aa52mshdb743e2289c0f04p1a95c3jsndb01f6316d87",
    //     },
    //   };

    //   const RapidApiData = await axios.get(
    //     "https://booking-com.p.rapidapi.com/v1/metadata/exchange-rates?currency=AED&locale=en-gb",
    //     config
    //   );

    //   const RapidDataResponse = JSON.stringify(RapidApiData.data);
    //   const operation = "mention one lowest rate with currency asap";
    //   const prompt = RapidDataResponse.concat(operation);
    //   if (RapidDataResponse) {
    //     const result = await model.generateContent(prompt);

    //     const text = result.response.text();
    //     res.status(200).send(text);
    //   }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/travel", verify, async (req, res) => {
  try {
    const { departureAirports, date, destination, budget } = req.body;
    console.log(location, date, noOfRooms, hotelStars, breakfast, budget);
    //   const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    //   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    //   let config = {
    //     headers: {
    //       "X-RapidAPI-Key": "de2f16aa52mshdb743e2289c0f04p1a95c3jsndb01f6316d87",
    //     },
    //   };

    //   const RapidApiData = await axios.get(
    //     "https://booking-com.p.rapidapi.com/v1/metadata/exchange-rates?currency=AED&locale=en-gb",
    //     config
    //   );

    //   const RapidDataResponse = JSON.stringify(RapidApiData.data);
    //   const operation = "mention one lowest rate with currency asap";
    //   const prompt = RapidDataResponse.concat(operation);
    //   if (RapidDataResponse) {
    //     const result = await model.generateContent(prompt);

    //     const text = result.response.text();
    //     res.status(200).send(text);
    //   }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
