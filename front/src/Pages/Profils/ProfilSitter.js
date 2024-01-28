import "../../css/styles.css";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import CardOwnerReviewer from "../../Components/Cards/CardOwnerReviewer.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProfilSitter = ({ socket }) => {
  const [sitter, setSitter] = useState({});
  const [ownerReviewer, setOwnerReviewer] = useState([]);
  const [userName, setUserName] = useState("");

  const currentUserId = Cookies.get("userId");

  const navigate = useNavigate();

  // identification du sitter par son ID
  const { id } = useParams();

  // Décomposition + condition d'objet vide si pas de données
  const { bio, species, user } = sitter || {};
  const { firstName, lastName, address, photo } = user || {};

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/sitter/${id}`).then((res) => {
      setSitter(res.data);
    });

    axios.get(`${process.env.REACT_APP_API}/random-pets`).then((res) => {
      // Ensure that the response is an array
      const ownerData = Array.isArray(res.data) ? res.data : [res.data];
      setOwnerReviewer(ownerData);
    });
  }, [id]); // écoute sur le changement de l'ID

  const handleContact = (e) => {
    e.preventDefault();
    setUserName(firstName);

    if (socket && socket.connected) {
      //sends the username and socketID to Node.js server
      socket.emit("newUser", { userName, socketID: socket.id });
    } else {
      console.error("Socket is undefined or not connected.");
    }

    navigate(`/dashboard/${currentUserId}`);
  };

  return (
    <>
      <div className="banner__mini"></div>
      <section className="profil">
        <article className="profil__img">
          <img
            className="card__background"
            src={`${process.env.REACT_APP_API}/images/users/${photo}`}
            alt={`Photo de ${firstName}`}
          />
        </article>
        <article className="box__infos">
          <h1 className="green">
            {firstName} {lastName && lastName.toUpperCase()}
          </h1>
          <p>
            <FontAwesomeIcon
              icon={faLocationDot}
              className="margin-right-1 orange"
            />{" "}
            {address && address.length > 0 && address[0].city}
          </p>
          <div className="sitter__rating">
            <p>6 avis</p>
            <p>
              <FontAwesomeIcon icon={faStar} className="gold" /> 5/5
            </p>
          </div>
          <p>{bio}</p>
          <h2 className="style-h3 orange">Préférences d'espèce</h2>
          <div className="box__specie">
            {species &&
              species.length > 0 &&
              species.map((s, i) => (
                <p className="box bg--color-grey" key={i}>
                  {s}
                </p>
              ))}
          </div>
        </article>
        <article className="box__availability">
          <div className="profil__table">
            <table>
              <thead>
                <tr>
                  <th colSpan="2">Disponibilités</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="days">lundi &gt; vendredi</td>
                  <td className="hours">07:00 &gt; 20:00</td>
                </tr>
                <tr>
                  <td className="days">samedi &gt; dimanche</td>
                  <td className="hours">09:00 &gt; 22:00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <NavLink to="#" className="btn btn__orange" onClick={handleContact}>
            Contacter {firstName}
          </NavLink>
        </article>
      </section>

      <section className="box__details">
        <iframe
          src={address && address.length > 0 && address[0].location}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-hidden="false"
          aria-label={`Adresse de ${firstName}`}
        />
        <div className="box__reviews">
          <h2>Les avis</h2>
          {ownerReviewer.map((or, i) => (
            <CardOwnerReviewer key={i} ownerReviewer={or} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProfilSitter;
