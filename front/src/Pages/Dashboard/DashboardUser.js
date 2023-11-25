import "./Dashboard.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

import Chatroom from "./Chatroom/Chatroom.js";
import ChatBar from "./Chatroom/ChatBar.js";

const DashboardUser = () => {
  const [user, setUser] = useState([]);

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
            <button title="Bouton de l'onglet Profil">Profil</button>
            <button title="Bouton de l'onglet Gardes" className="separator">Gardes</button>
            <button title="Bouton de l'onglet Messages" className="separator">Messages</button>
          </nav>
        </section>

        <section className="dashboard__content">
          <h1 className="dashboard__title">Title</h1>
          <Chatroom socket={socket} />
        </section>
      </main>
    </>
  );
};

export default DashboardUser;
