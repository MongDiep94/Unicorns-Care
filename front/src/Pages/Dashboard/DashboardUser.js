import "./Dashboard.css";

import React from 'react';
import io from 'socket.io-client';

import Chatroom from '../Chatroom/Chatroom.js';
import ChatLog from '../Chatroom/ChatLog.js';

const DashboardUser = () => {
  //instanciation du port d'écoute de socketIO
  const socket = io.connect(process.env.REACT_APP_API);

  return (
    <>
      <div className="bg--green"></div>

      <ChatLog socket={socket}/>
      <Chatroom socket={socket}/>

    </>
  );
};

export default DashboardUser;
