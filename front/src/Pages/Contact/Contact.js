import { useState } from 'react';
import "./Contact.css";

const Contact = () => {
  const [message, setMessage] = useState("")
  const [content, setContent] = useState("")
  const [state, setState] = useState({
    name: '',
    email: '',
    subject: '',
    content: ''
  });

  const onInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = event => {
    event.preventDefault();

    setMessage("Votre demande a été envoyée")

  };

  return (
    <>
      <section className="banner__mini">
        <h1>Contact</h1>
      </section>
        <article className="container">
          <form method="post" onSubmit={sendEmail} className="contact">
          <label><input
            type="text"
            name="name"
            value ={state.name}
            placeholder="Ecrivez votre nom ici..."
            onChange={onInputChange}>
            </input></label>

            <label><input
            type="email"
            name="email"
            value ={state.email}
            placeholder="Ecrivez votre email ici..."
            onChange={onInputChange}>
            </input></label>

            <select name="subject" id="subject" onChange={onInputChange} value={state.subject}>
              <option value="">-- Choississez un sujet --</option>
              <option value="incident">Incident technique</option>
              <option value="reclamation">Reclamation</option>
              <option value="other">Autre</option>
            </select>
            <label><textarea
            type="textarea"
            name="content"
            value ={state.content}
            rows="10"
            maxLength="500"
            placeholder="Ecrivez votre texte ici..."
            onChange={onInputChange}>
            </textarea></label>

            <button type="submit" name="Envoyer" className="btn__orange">Envoyer</button>
          </form>
          {message &&
          <p className="message margin-top-3">{message}</p>
          }
        </article>
    </>

  );
};

export default Contact;
