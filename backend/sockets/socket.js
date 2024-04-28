const { Server } = require("socket.io");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
const { LocalStorage } = require("node-localstorage");
const { handleChat } = require('../utils/chatController');

module.exports = (httpServer) => {
  // Specify the directory where data will be stored
  const localStorage = new LocalStorage("./localStorage");

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("myEvent", async (prompt) => {
      try {
        if (prompt) {
          // make historyKeywith user id
          // const historyKey
          socket.emit("myEvent", "!processing");

          const DataCondition = `
          [Prompt]: ["${prompt}"] \n
          Now if the [Prompt] or chat history text has these all 4 things : ( flying from, flying to, departure date, class selections ) of a flight mentioned in anywhere, then return the following json after extract those values an filled. do not return the following json with even one null value.
          {
            flight : true,
            data : 
            {
              flying_from:"",
              flying_to:"",
              departure_date:"",
              class_selections: ""
            }
          }
          \n
          Otherwise, if the [Prompt] or chat history text have not available one or more from the 4 above things, return the following json:
          {
            flight : false,
            data : [give normal gemini response and answers friendly. but ask different questions friendly until the user provide all 4 details.]
          }
          \n
          do not give any other results.`

          const chatResult = await handleChat(prompt, DataCondition);
          const jsonResponse = JSON.parse(chatResult.response);

          if (jsonResponse.flight === false) {
            socket.emit("myEvent", jsonResponse.data);
          } else {
            console.log(jsonResponse.data);

            const config = {
              headers: {
                "X-RapidAPI-Key":
                  "f32c78986cmsh12ef2c5be09aae5p1ec3adjsne50e1b1deffa",
              },
            };

            const RapidApiData = await axios.get(
              `https://agoda-com.p.rapidapi.com/flights/one-way/search?flying_from=${jsonResponse.data.flying_from}&flying_to=${jsonResponse.data.flying_to}&departure_date=${jsonResponse.data.departure_date}`, config
            );

            console.log("Api Data: ", RapidApiData.data);

            // if (RapidApiData && RapidApiData.data.data === null) {
            //   socket.emit(
            //     "myEvent",
            //     ` Unable to fetch flight data ${RapidApiData.data.message}`
            //   );
            // } else {
            //   let RapidDataResponse = JSON.stringify(RapidApiData.data);
            //   let words = RapidDataResponse.split(" ");
            //   words = words.slice(0, 260);
            //   RapidDataResponse = words.join(" ");
            //   const prompt =
            //     RapidDataResponse +
            //     `\n \n The travelers preferences are ${data} recommend the traveler a flight from the data above with total price and always give the most matched recommendation, even if the data is not matched then the first flight and do not repeat anything twice and `;

            //   // console.log(prompt);
            //   if (prompt) {
            //     const resultNonJson = await model.generateContent(prompt);
            //     const textNonJson = resultNonJson.response.text();

            //     const promptJson =
            //       textNonJson +
            //       `\n \n Please provide the details for each category in the following JSON format and just add original data into this this is dumy data :

            //       {
            //         "Departure Flights": {
            //           "flight_number": "ABC123",
            //           "departure_time": "2024-04-07T12:00:00Z",
            //           "arrival_time": "2024-04-07T15:00:00Z",
            //           "departure_airport": "JFK",
            //           "arrival_airport": "LAX",
            //           "price": "500",
            //           "airline": "Example Airlines"
            //         },
            //         "Accommodations": {
            //           "name": "Hotel ABC",
            //           "check_in_date": "2024-04-07",
            //           "check_out_date": "2024-04-10",
            //           "address": "123 Main St, City",
            //           "price_per_night": "100",
            //           "amenities": ["Wi-Fi", "Breakfast", "Pool"]
            //         },
            //         "Arrival Flights": {
            //           "flight_number": "XYZ456",
            //           "departure_time": "2024-04-15T12:00:00Z",
            //           "arrival_time": "2024-04-15T15:00:00Z",
            //           "departure_airport": "LAX",
            //           "arrival_airport": "JFK",
            //           "price": "550",
            //           "airline": "Example Airlines"
            //         },
            //         "Places to Visit": {
            //           "name": "Museum XYZ",
            //           "location": "Downtown",
            //           "opening_hours": "9:00 AM - 5:00 PM",
            //           "entry_fee": "10",
            //           "description": "A must-visit museum showcasing..."
            //         }
            //       }
            //     \n\n`;

            //     if (promptJson) {
            //       const result = await chat.sendMessage(promptJson);
            //       const response = await result.response;
            //       const text = response.text();
            //       console.log("text", text);
            //       // const result = await model.generateContent(prompt);
            //       // const text = result.response.text();
            //       socket.emit("myEvent", text);
            //       localStorage.setItem(
            //         historyKey,
            //         JSON.stringify(
            //           history.concat([
            //             { role: "user", parts: data },
            //             { role: "model", parts: text },
            //           ])
            //         )
            //       );
            //     }
            //   }
            // }


          }

        }
      } catch (error) {
        console.error("Error processing message:", error.message);
        socket.emit("myEvent", "Error processing message");
      }
    });
  });

  return io;
};
