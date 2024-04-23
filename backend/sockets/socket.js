const { Server } = require("socket.io");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
const { LocalStorage } = require("node-localstorage");

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

    socket.on("myEvent", async (data) => {
      try {
        if (data) {
          const genAI = new GoogleGenerativeAI(process.env.API_KEY);
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });

          console.log("Received data on Server: ", data);
          socket.emit("myEvent", "Processing...");

          const historyKey = `chatHistory_${socket.id}`;
          const historyJSON = localStorage.getItem(historyKey);
          const history = historyJSON ? JSON.parse(historyJSON) : [];
          console.log("history", history);
          const chat = model.startChat({
            history: history.concat([
              {
                role: "user",
                parts: data,
              },
              {
                role: "model",
                parts: "Great to meet you. What would you like to know?",
              },
            ]),
          });
          const getClientDataCondition = await model.generateContent(
            ` Previous chat response: \n
          ${history}

          \n \n
          users Current text: \n
          ${data}

          \n \n
          Now if the users current text has these three things flying_from, flying_to and departure_date of a flight mentioned then return true else false
          `
          );
          // or false as a boolean nothing else, if not then reply the user upon the previous chat data
          console.log(
            "Flight:",
            getClientDataCondition.response.candidates[0].content.parts[0].text.toLowerCase()
          );

          if (
            getClientDataCondition.response.candidates[0].content.parts[0].text
              .trim()
              .toLowerCase() === "true"
          ) {
            console.log("inside the true case:");
            const DataTypeObject = await model.generateContent(
              data +
                `\n \n extract the from flying_from, flying_to , departure_date , class_selections and stopovers from the data above and paste in the the values of the object below and return only the json object below nothing else
              \n \n
            {
              flying_from:"",
              flying_to:"",
              departure_date:"",
              class_selections: "",
              stopovers: ""
            }
            `
            );
            console.log("DataTypeObject", DataTypeObject);
            const trimmedString =
              DataTypeObject.response.candidates[0].content.parts[0].text
                .trim()
                .replace(/`/g, "");
            console.log("trimmedString", trimmedString);
            let apiBody;
            try {
              apiBody = JSON.parse(trimmedString);
            } catch (error) {
              console.error("Error parsing JSON:", error.message);
            }
            console.log("apiBody", apiBody);
            //   const {
            //     flying_from,
            //     flying_to,
            //     departure_date,
            //     class_selections,
            //     stopovers,
            //   } = req.body;

            let config = {
              headers: {
                "X-RapidAPI-Key":
                  "f32c78986cmsh12ef2c5be09aae5p1ec3adjsne50e1b1deffa",
              },
            };

            let RapidApiData;
            if (apiBody) {
              RapidApiData = await axios.get(
                `https://agoda-com.p.rapidapi.com/flights/one-way/search?flying_from=${apiBody.flying_from}&flying_to=${apiBody.flying_to}&departure_date=${apiBody.departure_date}`,
                config
              );
            }
            console.log("Api Data: ", RapidApiData);
            if (RapidApiData && RapidApiData.data.data === null) {
              socket.emit(
                "myEvent",
                ` Unable to fetch flight data ${RapidApiData.data.message}`
              );
            } else {
              let RapidDataResponse = JSON.stringify(RapidApiData.data);
              let words = RapidDataResponse.split(" ");
              words = words.slice(0, 260);
              RapidDataResponse = words.join(" ");
              const prompt =
                RapidDataResponse +
                `\n \n The travelers preferences are ${data} recommend the traveler a flight from the data above with total price and always give the most matched recommendation, even if the data is not matched then the first flight and do not repeat anything twice and `;
              // console.log(prompt);
              if (prompt) {
                const resultNonJson = await model.generateContent(prompt);
                const textNonJson = resultNonJson.response.text();

                const promptJson =
                  textNonJson +
                  `\n \n Please provide the details for each category in the following JSON format and just add original data into this this is dumy data :

                {
                  "Departure Flights": {
                    "flight_number": "ABC123",
                    "departure_time": "2024-04-07T12:00:00Z",
                    "arrival_time": "2024-04-07T15:00:00Z",
                    "departure_airport": "JFK",
                    "arrival_airport": "LAX",
                    "price": "500",
                    "airline": "Example Airlines"
                  },
                  "Accommodations": {
                    "name": "Hotel ABC",
                    "check_in_date": "2024-04-07",
                    "check_out_date": "2024-04-10",
                    "address": "123 Main St, City",
                    "price_per_night": "100",
                    "amenities": ["Wi-Fi", "Breakfast", "Pool"]
                  },
                  "Arrival Flights": {
                    "flight_number": "XYZ456",
                    "departure_time": "2024-04-15T12:00:00Z",
                    "arrival_time": "2024-04-15T15:00:00Z",
                    "departure_airport": "LAX",
                    "arrival_airport": "JFK",
                    "price": "550",
                    "airline": "Example Airlines"
                  },
                  "Places to Visit": {
                    "name": "Museum XYZ",
                    "location": "Downtown",
                    "opening_hours": "9:00 AM - 5:00 PM",
                    "entry_fee": "10",
                    "description": "A must-visit museum showcasing..."
                  }
                }
              \n\n`;

                if (promptJson) {
                  const result = await chat.sendMessage(promptJson);
                  const response = await result.response;
                  const text = response.text();
                  console.log("text", text);
                  // const result = await model.generateContent(prompt);
                  // const text = result.response.text();
                  socket.emit("myEvent", text);
                  localStorage.setItem(
                    historyKey,
                    JSON.stringify(
                      history.concat([
                        { role: "user", parts: data },
                        { role: "model", parts: text },
                      ])
                    )
                  );
                }
              }
            }
          } else {
            console.log("else statement called ");
            const gptPrompt = `Previous chat response: \n \n
            ${history}
    
            users Current text: \n \n
            ${data} \n\n

            Reply on the bases of the chat history above
            
            `;

            const result = await chat.sendMessage(gptPrompt);
            const response = await result.response;
            const text = response.text();

            socket.emit("myEvent", text);
            localStorage.setItem(
              historyKey,
              JSON.stringify(
                history.concat([
                  { role: "user", parts: data },
                  { role: "model", parts: text },
                ])
              )
            );
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
