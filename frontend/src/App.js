import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
const { io } = require("socket.io-client");
const socket = io("http://localhost:4000");

function App() {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  socket.on("connect", () => {
    console.log(socket.connected); // true
  });

  socket.on("myEvent", (data) => {
    console.log("Received data Frontend: ", data);
    setOutputValue(data);
  });
  const handleSendEmit = () => {
    socket.emit(
      "myEvent",
      // "i want to go to Goa, India from New Delhi and NCR, India on 2024-02-28 in an Economy class and with no stopovers"
      inputValue
    );
  };

  return (
    <div className="mainDiv">
      <h3>Type Here</h3>
      <textarea
        rows={10}
        cols={50}
        placeholder="Enter your Flight details here"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSendEmit}>send data</button>
      <p>{outputValue}</p>
    </div>
  );
}

export default App;
