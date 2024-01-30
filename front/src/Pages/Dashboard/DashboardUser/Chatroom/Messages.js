import "../../../../css/styles.css";

import { useState, useEffect } from "react";

const Messages = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          createdtime: data.__createdtime__,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <section className="messagesColumn">
      {messagesRecieved.map((msg, i) => (
        <div className="message" key={i}>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="msgMeta">{msg.username}</span>
            <span className="msgMeta">
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </span>
          <p className="msgText">{msg.message}</p>
          <br />
        </div>
      ))}
    </section>
  );
};

export default Messages;
