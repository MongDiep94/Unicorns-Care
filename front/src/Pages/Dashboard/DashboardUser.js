import "./Dashboard.css";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import Chatroom from "./Chatroom/Chatroom.js";
import ChatLog from "./Chatroom/ChatLog.js";
import axios from "axios";
import { useParams } from "react-router-dom";

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
        <nav className="dashboard__nav">
          <img
            className="card__background"
            src={`${process.env.REACT_APP_API}/images/users/${photo}`}
            alt={`Photo de ${firstName}`}
          />


        </nav>

        <section className="dashboard__content">
          <h1 className="dashboard__title">Title</h1>
          <ChatLog socket={socket} />
          <Chatroom socket={socket} />
        </section>
      </main>
    </>
  );
};

export default DashboardUser;
