import "../../../css/styles.css";
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
import DashboardAdmin from "../DashboardAdmin.js";

const DashboardUser = () => {
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState(false);
  // menu dashboard
  const [showAdmin, setShowAdmin] = useState(false);
  const [showProfil, setShowProfil] = useState(true);
  const [showChatroom, setShowChatroom] = useState(false);

  const navigate = useNavigate();

  // identification du user par son ID
  const { id } = useParams();

  // Décomposition + condition d'objet vide si pas de données
  const { firstName, photo } = user || {};

  //instanciation du port d'écoute de socketIO
  const socket = io.connect(process.env.REACT_APP_API);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/user/${id}`).then((res) => {
      setUser(res.data);
      setAdmin(res.data.role);
      console.log("user id", id);
    });
  }, [id]); // rechargement 1 fois

  const handleClick = (value) => {
    if (value === "admin") {
      setShowAdmin(true);
    } else {
      setShowAdmin(false);
    }
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
      Cookies.remove("firstName");
      Cookies.remove("sessionToken");
      setAdmin(false);
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="banner__mini"></div>

      <main>
        <nav>
          <ul className="dashboard__nav">
            {/* <img
              className="card__background"
              src={`${process.env.REACT_APP_API}/images/users/${photo}`}
              alt={`Photo de ${firstName}`}
              // Si pas de src, on appelle default image
              onError={(e) => {
                e.target.src = `${process.env.REACT_APP_API}/images/avatar_licorne.svg`;
              }}
            /> */}
            <li>
              <button
                title="Bouton de l'onglet Profil"
                className="dashboard__separator"
                value="profil"
                onClick={() => handleClick("profil")}
              >
                Profil
              </button>
            </li>
            {admin === "admin" && (
              <li>
                <button
                  title="Bouton de l'onglet Profil"
                  className="dashboard__separator"
                  value="profil"
                  onClick={() => handleClick("admin")}
                >
                  Tableau de bord
                </button>
              </li>
            )}
            <li>
              <button
                title="Bouton de l'onglet Messages"
                className="dashboard__separator"
                value="messages"
                onClick={() => handleClick("chatroom")}
              >
                Messages
              </button>
            </li>
            <li>
              <button
                title="Supprimer le profil"
                className="btn__delete dashboard__separator"
                value="messages"
                onClick={handleDelete}
              >
                <FontAwesomeIcon icon={faCircleXmark} /> Supprimer profil
              </button>
            </li>
          </ul>
        </nav>
        <div className="dashboard__content">
          {showAdmin && <DashboardAdmin />}
          {showProfil && <ProfilUser id={id} />}
          {showChatroom && <Chatroom socket={socket} />}
        </div>
      </main>
    </>
  );
};

export default DashboardUser;
