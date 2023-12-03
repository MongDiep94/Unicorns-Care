import React, { useReducer, useEffect, useState } from "react";
import "./Modals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from "react-router-dom";
import { userReducer } from "../../utils/userReducer";

const ModalUpdate = ({ closeModal }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: {
      firstName: "",
      lastName: "",
      email: "",
      addressNumber: "",
      addressStreet: "",
      addressCity: "",
      addressZipcode: "",
    },
  });
  console.log("state", state);
  const { user } = state;

  // identification du user par son ID
  const { id } = useParams();

  // Décomposition + condition d'objet vide si pas de données
  // const { firstName, lastName, email, password, address } = user || {};

  // useEffect(() => {

  // axios.get(`${process.env.REACT_APP_API}/user/${id}`).then((res) => {
  //   setUser(res.data);
  // });

  // }, [id]); // écoute sur le changement de l'ID

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${process.env.REACT_APP_API}/user/update/${id}`, user
q      .then((res) => {});

    closeModal(true);
  };

  return (
    <div className="modal__backgound">
      <section className="modal__content">
        <button
          className="btn__close"
          onClick={() => closeModal(false)}
          titre="Bouton pour fermer le modal"
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
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={(e) =>
                    dispatch({
                      type: "update",
                      input: "firstName",
                      value: e.target.value,
                    })
                  }
                />
                <label>Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={(e) =>
                    dispatch({
                      type: "update",
                      input: "lastName",
                      value: e.target.value,
                    })
                  }
                />
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) =>
                    dispatch({
                      type: "update",
                      input: "email",
                      value: e.target.value,
                    })
                  }
                />
                {/* <label>Photo</label>
                  <input type="file" name="file" onChange={handleInputChange} /> */}
              </section>
              <fieldset className="address">
                <legend>Adresse</legend>
                <label>Numéro</label>
                <input
                  type="text"
                  name="number"
                  value={user.addressNumber}
                  onChange={(e) =>
                    dispatch({
                      type: "update",
                      input: "addressNumber",
                      value: e.target.value,
                    })
                  }
                />
                <label>Rue</label>
                <input
                  type="text"
                  name="street"
                  value={user.addressStreet}
                  onChange={(e) =>
                    dispatch({
                      type: "update",
                      input: "addressStreet",
                      value: e.target.value,
                    })
                  }
                />

                <label>code postal</label>
                <input
                  type="text"
                  name="zipcode"
                  value={user.addressZipcode}
                  onChange={(e) =>
                    dispatch({
                      type: "update",
                      input: "addressZipcode",
                      value: e.target.value,
                    })
                  }
                />

                <label>city</label>
                <input
                  type="text"
                  name="city"
                  value={user.addressCity}
                  onChange={(e) =>
                    dispatch({
                      type: "update",
                      input: "addressCity",
                      value: e.target.value,
                    })
                  }
                />
              </fieldset>
            </section>

            <input
              className="btn__submit btn__orange "
              type="submit"
              name="Mettre à jour"
            />
          </form>
        </section>
      </section>
    </div>
  );
};

export default ModalUpdate;
