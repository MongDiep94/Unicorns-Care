import "./Chatroom.css";
import Cookies from "js-cookie";

const ChatBody = ({messages}) => {
  const userFirstName = Cookies.get("userFirstName");

  console.log('messages',messages);


  return (
    <>
      {/*This shows messages sent from you*/}
      <section className="message__container">
      {messages.map((message)=>
        message.name === userFirstName ? (
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
      </section>
    </>
  );
};

export default ChatBody;
