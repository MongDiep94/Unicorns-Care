import "./Chatroom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const ChatBody = ({messages}) => {

  console.log(messages);
  const navigate = useNavigate();
  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <section className="chat__mainHeader">
        <p>Conversation avec Pet Sitter</p>
        <button
        type="button"
        className="leaveChat__btn "
        title="Quitter la dicussion"
        onClick={handleLeaveChat}
        >
        <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      </section>

      {/*This shows messages sent from you*/}
      <div className="message__container">
      {messages.map((message)=>
        message.name === localStorage.getItem('userName') ? (
          <div className="message__chats" key={message.id}>
            <p className="sender__name">You</p>
            <div className="message__sender">
              <p>{message.text}</p>
            </div>
          </div>
        ) : (
          <div className="message__chats" key={message.id}>
            <p>{message.name}</p>
            <div className="message__recipient">
              <p>{message.text}</p>
            </div>
          </div>
        )
        )}

        {/*This is triggered when a user is typing*/}
        <div className="message__status">
          <p>Quelqu'un écrit...</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
