import React, { useEffect, useState } from "react";
import "./Modals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from "react-router-dom";

const ModalUpdate = ({ closeModal }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [file, setFile] = useState(null);

  // identification du sitter par son ID
  const { id } = useParams();
  // Décomposition + condition d'objet vide si pas de données
  // const { bio, species, user } = sitter || {};
  const { firstName, lastName, email, password, address } = user || {};

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API}/user/${id}`).then((res) => {
      setUser(res.data);
    });

    axios.patch(`${process.env.REACT_APP_API}/userRouter.patch("/user/update/${id}", UpdateUser)
    `).then((res) => {
      setUser(res.data);
    });
  }, [id]); // écoute sur le changement de l'ID



  const handleInputChange = (e) => {
    setUser({
      ...user,


    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal(true);
  };

  return (
    <div className="modal__backgound">
      <section className="modal__content">
        <button
          className="btn__close"
          onClick={() => closeModal(false)}
          titre ="Bouton pour fermer le modal"
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>

        <section>
          <h1>Editez le profil</h1>

          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="form__profil"
          >
              <section className="profil__infos">
                <section className="civility">
                  <label>Prénom</label>
                  <input type="text" name="firstName" value={firstName} />
                  <label>Nom</label>
                  <input type="text" name="lastName" value={lastName} />
                  <label>Email</label>
                  <input type="email" name="email" value={email} />
                  <label>Mot de passe</label>
                  <input type="text" name="password" value={password} />
                  <label>Photo</label>
                  <input type="file" name="file" onChange={handleInputChange} />
                </section>
                <fieldset>
                  <legend>Adresse</legend>
                  <label>Numéro</label>
                  <input type="text" name="number" value="{address[0].number}" />
                  <label>Rue</label>
                  <input type="text" name="street" value="{address[0].street}" />
                  <label>code postale</label>
                  <input type="text" name="zipcode" value="{address[0].zipcode}" />
                  <label>city</label>
                  <input type="text" name="city" value="{address[0].city}" />
                </fieldset>
              </section>

            <input className="btn__submit btn__orange " type="submit" name="Mettre à jour" />

          </form>
        </section>
      </section>
    </div>
  );
};

export default ModalUpdate;
