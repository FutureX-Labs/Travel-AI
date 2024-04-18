import React, { useState } from "react";
import "./chat.css";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Box } from "@mui/material";
import Footer from "examples/Footer";

const Chat = () => {
  // State variables
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Function to handle sending a message
  const handleMessageSend = () => {
    if (inputValue.trim() !== "") {
      // Add the new message to the messages array
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      // Clear the input field
      setInputValue("");
      // You can handle sending the message to a server or API here
    }
  };

  return (
    <div className="main">
      <div className="chat-container">
        <DashboardNavbar />

        <div className="chat-body">
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
          <div className="chat-messages">Message</div>
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
