import "./Chatroom.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
      <form className="chat__form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Ecrivez un message"
          className="message__chat"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button title="Envoyer message" className="btn__send"><FontAwesomeIcon icon={faPaperPlane} /></button>
      </form>
    </div>
  );
};

export default ChatFooter;
