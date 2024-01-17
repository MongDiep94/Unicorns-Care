import "../../../../css/styles.css";
import React, { useEffect, useState } from "react";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

  return (
    <aside className="chat__usersList">
      <h3>Discussions</h3>
      {users.map((user) => (
        <p key={user.socketID}>{user.userName}</p>
      ))}
    </aside>
  );
};

export default ChatBar;
