import React from "react";
import { NavLink } from "react-router-dom";

const CardPet = () => {
  return (
    <article className="card margin-top-">
      <img
        className="btn-like"
        src="../../images/pictos/like_off.svg"
        aria-label="Picto like désactivé"
      />
      <img
        className="card__background"
        src="../../images/pets/tigrou.png"
        alt="Photo de Tigrou, chat de glace"
        aria-label="Photo de Tigrou, chat de glace"
      />
      <div className="card__content">
        <div className="card__content--container">
          <h2 className="card__title">Bibi</h2>
          <section className="card__pet__description">
            <div>
              <p>Chat des glaces</p>
              <p>89 ans</p>
            </div>
            <img
              className="picto__element"
              src="../../images/pictos/element_ice.svg"
              alt="Icône élément de glace"
              aria-label="Icône élément de glace"
            />
          </section>
        </div>
        <NavLink to="/pet/:id" className="card__button">
          Voir le profil
        </NavLink>
      </div>
    </article>
  );
};

export default CardPet;
