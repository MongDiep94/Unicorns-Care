import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";

const CardUser = () => {
  return (
    <article className="card">
      <img
        className="btn-like"
        src="../../images/pictos/like_off.svg"
        aria-label="Picto like désactivé"
      />
      <img
        className="card__background"
        src="../../images/users/camille-riviere.png"
        alt="Photo de Camille, pet sitter à Paris 8e."
        aria-label="Photo de Camille, pet sitter à Paris 8e."
      />
      <div className="card__content ">
        <div className="card__content--container ">
          <h2 className="card__title">Camille</h2>
          <section className="card__description">
            <p>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="margin-right-1"
              />
              Paris 8e
            </p>
            <p>6 avis</p>
            <p>
              5/5 <FontAwesomeIcon icon={faStar} className="gold" />
            </p>
          </section>
        </div>
        <NavLink to="/sitter/:id" className="card__button">
          Voir le profil
        </NavLink>
      </div>
    </article>
  );
};

export default CardUser;
