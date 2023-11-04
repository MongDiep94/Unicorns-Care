import { useState } from 'react';
import "./Contact.css";

const Contact = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    subject: '',
    content: ''
  });

  const sendEmail = event => {
    event.preventDefault();

    console.log('We will fill this up shortly.');
    // code to trigger Sending email
  };

  const onInputChange = event => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value
    });
  };

  return (
    <>
      <section className="banner__mini">
        <h1>Contact</h1>
      </section>
        <article className="container">
          <form method="post" onSubmit={sendEmail} className="contact">

            <select name="subject" id="contact">
              <option value="">-- Choississez un sujet --</option>
              <option value="incident">Incident technique</option>
              <option value="reclamation">Reclamation</option>
              <option value="other">Autre</option>
            </select>
            <label><textarea type="textarea" name="content" rows="10" maxlength="500" placeholder="Ecrivez votre texte ici..."></textarea></label>

            <button type="submit" name="Envoyer" className="btn__orange">Envoyer</button>
          </form>
          <p className="message margin-top-3">Votre demande a été envoyée</p>
        </article>
    </>

  );
};

export default Contact;
