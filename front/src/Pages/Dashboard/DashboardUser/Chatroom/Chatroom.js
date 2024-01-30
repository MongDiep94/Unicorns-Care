import "../../../../css/styles.css";
import React, { useEffect, useState } from "react";
import ChatBody from "./ChatBody.js";
import ChatFooter from "./ChatFooter.js";
import ChatBar from "./ChatBar.js";

const Chatroom = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      return setMessages([...messages, data]);
    });
  }, [socket, messages]);

  return (
    <>
      <h1 className="dashboard__title">Messages</h1>
      <section className="chat">
        {/* <ChatBar socket={socket} /> */}
        <div className="chat__main">
          <ChatBody messages={messages} />
          <ChatFooter socket={socket} />
        </div>
      </section>
    </>
  );
};

export default Chatroom;
