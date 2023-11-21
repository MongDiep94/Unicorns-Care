import React from 'react';
import socketIO from 'socket.io-client';

import Chatroom from '../Chatroom/Chatroom.js';
import ChatLog from '../Chatroom/ChatLog.js';

const DashboardUser = () => {
  //instanciation du port d'écoute de socketIO
  const socket = socketIO.connect(process.env.REACT_APP_API);

  return (
    <div>
      <ChatLog socket={socket}/>
      <Chatroom socket={socket}/>

    </div>
  );
};

export default DashboardUser;
