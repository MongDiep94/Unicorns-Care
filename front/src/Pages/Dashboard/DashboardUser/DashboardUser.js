import "./../Dashboard.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import Chatroom from "./Chatroom/Chatroom.js";
import ProfilUser from "./ProfilUser.js";

const DashboardUser = () => {
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState(false);
  // menu dashboard
  const [showProfil, setShowProfil] = useState(true);
  const [showChatroom, setShowChatroom] = useState(false);

  const navigate = useNavigate();

  // identification du user par son ID
  const { id } = useParams();

  // Décomposition + condition d'objet vide si pas de données
<<<<<<< HEAD
  const { firstName, photo } = user || {};
=======
  const { _id, firstName, photo } = user || {};
>>>>>>> 17509a77f6e0e413154f28c3975a8219a536da7f

  //instanciation du port d'écoute de socketIO
  const socket = io.connect(process.env.REACT_APP_API);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/user/${id}`).then((res) => {
      setUser(res.data);
      console.log('user id', id)
      console.log('_id', user._id)
    });
  }, [id]); // rechargement 1 fois

  const handleClick = (value) => {
    if (value === "profil") {
      setShowProfil(true);
    } else {
      setShowProfil(false);
    }
    if (value === "chatroom") {
      setShowChatroom(true);
    } else {
      setShowChatroom(false);
    }
  };

  const handleDelete = async () => {
    console.log("userId", id);

    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce profil ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      if (!id) {
        console.error("L'utilisateur est introuvable.");
        return;
      }

      await axios.delete(`${process.env.REACT_APP_API}/user/delete/${id}`);
      Cookies.remove("userId");
      Cookies.remove("sessionToken");
      setAdmin(false);
      navigate("/");

    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="bg--green"></div>

      <main className="container dashboard__container">
        <section className="dashboard__nav">
          <img
            className="card__background"
            src={`${process.env.REACT_APP_API}/images/users/${photo}`}
            alt={`Photo de ${firstName}`}
            // // Si pas de src, on appelle default image
            // onError={(e) => {
            //   e.target.src = `${process.env.REACT_APP_API}/images/Avatar_Licorne.svg`;
            // }}
          />
          <nav className="dashboard__menu">
            <button
              title="Bouton de l'onglet Profil"
              className="dashboard__separator"
              value="profil"
              onClick={() => handleClick("profil")}
            >
              Profil
            </button>
            <button
              title="Bouton de l'onglet Messages"
              className="dashboard__separator"
              value="messages"
              onClick={() => handleClick("chatroom")}
            >
              Messages
            </button>
            <button
              title="Supprimer le profil"
              className="btn__delete dashboard__separator"
              value="messages"
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon={faCircleXmark} /> Supprimer profil
            </button>
          </nav>
        </section>

        <section className="dashboard__content">
          <>
            {showProfil && <ProfilUser id={id} />}
            {showChatroom && <Chatroom socket={socket} />}
          </>
        </section>
      </main>
    </>
  );
};

export default DashboardUser;
