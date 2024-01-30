import "../../css/styles.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";

const CardUser = ({ oneSitter }) => {
  // décomposition de oneSitter;
  const { user, _id } = oneSitter;
  const { firstName, photo } = user;

  // décomposition de l'adresse avec condition
  const city =
    user && user.address && user.address.length > 0 ? user.address[0].city : "";

  return (
    <article className="card">
      <img
        className="btn-like"
        src="../../images/pictos/like_off.svg"
        aria-label="Picto like désactivé"
      />
      <img
        className="card__background"
        src={`${process.env.REACT_APP_API}/images/users/${photo}`}
        alt={`Photo de ${firstName}, pet sitter à ${city}`}
      />
      <section className="card__content ">
        <span className="card__content--container ">
          <h2 className="card__title">
            {firstName && firstName.length > 0 && firstName}
          </h2>
          <div className="card__description">
            <p>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="margin-right-1"
              />
              {city}
            </p>
            <p>
              5/5 <FontAwesomeIcon icon={faStar} className="gold" />
            </p>
          </div>
        </span>
        <NavLink
          to={`/profil-sitter/${_id}`}
          className="card__button"
          aria-label="Lien vers le profil du pet Sitter"
        >
          Voir le profil
        </NavLink>
      </section>
    </article>
  );
};

export default CardUser;
