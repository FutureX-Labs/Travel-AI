import React, { useState, useEffect } from "react";
import "./chat.css";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Box } from "@mui/material";
import Footer from "examples/Footer";
import Message from "components/Message";
const { io } = require("socket.io-client");
const socket = io("http://localhost:4000");

const Chat = () => {
  // State variables
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    socket.on("myEvent", (data) => {
      console.log("Received data Frontend: ", data);

      setMessages([...messages, { text: data, userType: "ai" }]);
    });

    return () => {
      socket.off("myEvent");
    };
  }, [messages]);

  // Function to handle sending a message
  const handleMessageSend = () => {
    if (inputValue.trim() !== "") {
      // Add user's message to messages array
      setMessages([...messages, { text: inputValue, userType: "User" }]);
      // Clear the input field
      setInputValue("");
      // Emit user's message via socket
      socket.emit("myEvent", inputValue);
    }
  };

  return (
    <div className="main">
      <div className="chat-container">
        <DashboardNavbar />

        <div className="chat-body">
          {/* Map through messages and render Message component */}
          {messages.map((message, index) => (
            <Message key={index} userType={message.userType} message={message.text} />
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Send a message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleMessageSend}>Submit</button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Chat;

// import React, { useState } from "react";
// import "./chat.css";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { Box } from "@mui/material";
// import Footer from "examples/Footer";
// import Message from "components/Message";
// const { io } = require("socket.io-client");
// const socket = io("http://localhost:4000");

// const Chat = () => {
//   // State variables
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState("");

//   // Function to handle sending a message
//   const handleMessageSend = () => {
//     if (inputValue.trim() !== "") {
//       // Add the new message to the messages array
//       setMessages([...messages, { text: inputValue, sender: "user" }]);
//       // Clear the input field
//       setInputValue("");

//     }
//   };

//   const [outputValue, setOutputValue] = useState("");

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   socket.on("connect", () => {
//     console.log(socket.connected); // true
//   });

//   socket.on("myEvent", (data) => {
//     console.log("Received data Frontend: ", data);
//     setOutputValue(data);
//   });
//   const handleSendEmit = () => {
//     socket.emit(
//       "myEvent",
//       // "i want to go to Goa, India from New Delhi and NCR, India on 2024-02-28 in an Economy class and with no stopovers"
//       inputValue
//     );
//   };

//   const dummyChatData = [
//     { userType: "User", message: "Hello, how are you?" },
//     { userType: "ai", message: "I'm fine, thank you. How can I assist you today?" },
//     { userType: "User", message: "I need help with my account settings." },
//     { userType: "User", message: "Can you guide me through the process?" },
//     { userType: "ai", message: "Of course! Please follow these steps..." },
//   ];

//   return (
//     <div className="main">
//       <div className="chat-container">
//         <DashboardNavbar />

//         <div className="chat-body">
//           {dummyChatData.map((data, index) => (
//             <Message key={index} userType={data.userType} message={data.message} />
//           ))}
//         </div>
//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Send a message"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//           />
//           <button onClick={handleMessageSend}>Submit</button>
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Chat;

// import logo from "./logo.svg";
// import { useState } from "react";
// import "./App.css";
// const { io } = require("socket.io-client");
// const socket = io("http://localhost:4000");

// function App() {
//   const [inputValue, setInputValue] = useState("");
//   const [outputValue, setOutputValue] = useState("");

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   socket.on("connect", () => {
//     console.log(socket.connected); // true
//   });

//   socket.on("myEvent", (data) => {
//     console.log("Received data Frontend: ", data);
//     setOutputValue(data);
//   });
//   const handleSendEmit = () => {
//     socket.emit(
//       "myEvent",
//       // "i want to go to Goa, India from New Delhi and NCR, India on 2024-02-28 in an Economy class and with no stopovers"
//       inputValue
//     );
//   };

//   return (
//     <div className="mainDiv">
//       <h3>Type Here</h3>
//       <textarea
//         rows={10}
//         cols={50}
//         placeholder="Enter your Flight details here"
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//       />
//       <button onClick={handleSendEmit}>send data</button>
//       <p>{outputValue}</p>
//     </div>
//   );
// }

// export default App;
