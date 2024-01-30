import "../../../../css/styles.css";
import Cookies from "js-cookie";

const ChatBody = ({ messages }) => {
  const userFirstName = Cookies.get("userFirstName");

  return (
    <>
      {/*This shows messages sent from you*/}
      <section className="message__container">
        {messages.map((message) =>
          message.name === userFirstName ? (
            <div className="sender__box" key={message.id}>
              <p className="sender__name">Moi :</p>
              <span className="message__sender">
                <p>{message.text}</p>
              </span>
            </div>
          ) : (
            <div className="recipient__box" key={message.id}>
              <p className="recipient__name">{message.name} :</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
      </section>
    </>
  );
};

export default ChatBody;
