import "../../../../css/styles.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const userFirstName = Cookies.get("userFirstName");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && userFirstName) {
      socket.emit("message", {
        text: message,
        name: userFirstName,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };

  const navigate = useNavigate();

  const handleLeaveChat = () => {
    Cookies.remove("userFirstName");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <section className="chat__footer">
        <form className="chat__form" onSubmit={handleSendMessage}>
          <textarea
            type="text"
            placeholder="Ecrivez un message"
            className="message__chat"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button title="Envoyer message" className="btn__send">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </section>
      <button
        type="button"
        className="leaveChat__btn"
        title="Quitter la dicussion"
        onClick={handleLeaveChat}
      >
        <FontAwesomeIcon icon={faCircleXmark} /> Quitter la discussion
      </button>
    </>
  );
};

export default ChatFooter;
