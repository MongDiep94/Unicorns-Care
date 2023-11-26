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
          <section className="message__chats" key={message.id}>
            <p className="sender__name">Moi :</p>
            <div className="message__sender">
              <p>{message.text}</p>
            </div>
          </section>
        ) : (
          <section className="message__chats" key={message.id}>
            <p>{message.name}</p>
            <div className="message__recipient">
              <p>{message.text}</p>
            </div>
          </section>
        )
        )}
      </section>
    </>
  );
};

export default ChatBody;
