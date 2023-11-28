import "./../Dashboard.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

import Chatroom from "./Chatroom/Chatroom.js";
import ProfilUser from "./ProfilUser.js";

const DashboardUser = () => {
  const [user, setUser] = useState([]);
  // menu dashboard
  const [showProfil, setShowProfil] = useState(true);
  const [showChatroom, setShowChatroom] = useState(false);


  // identification du sitter par son ID
  const { id } = useParams();

  // Décomposition + condition d'objet vide si pas de données
  const { firstName, lastName, address, photo, phone } = user || {};

  //instanciation du port d'écoute de socketIO
  const socket = io.connect(process.env.REACT_APP_API);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/user/${id}`).then((res) => {
      setUser(res.data);
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
  }

  return (
    <>
      <div className="bg--green"></div>

      <main className="container dashboard__container">
        <section className="dashboard__nav">
          <img
            className="card__background"
            src={`${process.env.REACT_APP_API}/images/users/${photo}`}
            alt={`Photo de ${firstName}`}
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
          </nav>
        </section>

        <section className="dashboard__content">
            <>
            {showProfil && <ProfilUser id={id}/>}
            {showChatroom && <Chatroom socket={socket} />}
            </>
        </section>
      </main>
    </>
  );
};

export default DashboardUser;
