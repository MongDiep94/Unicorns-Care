import React from "react";
import "../../css/styles.css";
import { NavLink } from "react-router-dom";

const CardPet = ({ onePet }) => {
  const { name, specie, element, age, image, _id } = onePet;

  return (
    <>
      <article className="card margin-top-">
        <img
          className="btn-like"
          src="../../images/pictos/like_off.svg"
          aria-label="Picto like désactivé"
        />
        <img
          className="card__background"
          src={`${process.env.REACT_APP_API}/images/pets/${image}`}
          alt={`${name}, ${specie} ${element}`}
        />
        <section className="card__content">
          <span className="card__content--container">
            <h2 className="card__title">{name}</h2>
            <div className="card__pet__description">
              <p>{specie}</p>
              <p>{age} ans</p>
              {element === "Glace" && (
                <img
                  className="picto__element"
                  src={`${process.env.REACT_APP_API}/images/pictos/element_ice.svg`}
                  alt={`Icône élément ice`}
                />
              )}
              {element === "Feu" && (
                <img
                  className="picto__element"
                  src={`${process.env.REACT_APP_API}/images/pictos/element_fire.svg`}
                  alt={`Icône élément fire`}
                />
              )}
              {element === "Eau" && (
                <img
                  className="picto__element"
                  src={`${process.env.REACT_APP_API}/images/pictos/element_water.svg`}
                  alt={`Icône élément fire`}
                />
              )}
              {element === "Terre" && (
                <img
                  className="picto__element"
                  src={`${process.env.REACT_APP_API}/images/pictos/element_earth.svg`}
                  alt={`Icône élément fire`}
                />
              )}
              {element === "Air" && (
                <img
                  className="picto__element"
                  src={`${process.env.REACT_APP_API}/images/pictos/element_wind.svg`}
                  alt={`Icône élément fire`}
                />
              )}
            </div>
          </span>
          <NavLink
            to={`/profil-pet/${_id}`}
            className="card__button"
            aria-label={`Lien vers profil de ${name}`}
          >
            Voir le profil
          </NavLink>
        </section>
      </article>
    </>
  );
};

export default CardPet;
