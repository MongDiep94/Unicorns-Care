import "./Chatroom.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";


const ChatLog = ({socket}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();

    setUserName(Cookies.get("userFirstName"));
    localStorage.setItem('userName', userName);
    //sends the username and socketID to Node.js server
    socket.emit('newUser', {userName, socketID: socket.id});
    navigate('/mon-dashboard');
  };
  return (
    <form style={{ background: 'grey', justifyContent: 'space-between' }} onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username (min. 6 characters)</label>
      <input
      style={{ background: 'white', justifyContent: 'space-between' }}
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button style={{ background: 'orange'}}>SIGN IN</button>
    </form>
  );
};

export default ChatLog;
