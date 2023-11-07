import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Cards.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";

const CardUser = () => {
  const [user, setUser] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/users`)
    .then((res) => {
        setUser(res.data);
        setFirstName(res.data);
        setLastName(res.data);
        setCity(res.data);
    });
}, []);

  return (
    <article className="card">
      <img
        className="btn-like"
        src="../../images/pictos/like_off.svg"
        aria-label="Picto like désactivé"
      />
      <img
        className="card__background"
        src={`${process.env.REACT_APP_API}/images/users/${user.image}`} alt={user.firstName}
        aria-label={`Photo de ${user.firstName}, pet sitter à ${user.address}`}
      />
      <div className="card__content ">
        <div className="card__content--container ">
          <h2 className="card__title">{user.firstName}</h2>
          <section className="card__description">
            <p>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="margin-right-1"
              />
              {user.address}
            </p>
            <p>6 avis</p>
            <p>
              5/5 <FontAwesomeIcon icon={faStar} className="gold" />
            </p>
          </section>
        </div>
        <NavLink to={`/sitter/${user._id}`} className="card__button">
          Voir le profil
        </NavLink>
      </div>
    </article>
  );
};

export default CardUser;
