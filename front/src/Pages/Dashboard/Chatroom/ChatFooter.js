import "./Chatroom.css";
import { useState } from "react";

const ChatFooter = ({socket}) => {
  const [message, setMessage] = useState('')

  const handleSendMessage = (e) => {

    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
    console.log(message, socket.id)
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Ecrivez un message"
          className="message__chat"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn__send">Envoyer</button>
      </form>
    </div>
  );
};

export default ChatFooter;
