import "./Cards.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";

const CardUser = ({oneSitter}) => {
  // décomposition de oneSitter;
  const { user, image, _id } = oneSitter;

  // décomposition de l'adresse avec condition
  const city = user[0].address && user[0].address.length > 0 ? user[0].address[0].city : '';
  const firstName = user[0].firstName && user[0].firstName.length > 0 ? user[0].firstName : '';

  console.log('oneSitter:', oneSitter);
  console.log('image:', image);

  //const imageUrl = image
  //? `${process.env.REACT_APP_API}/images/users/${image}`
  //: 'path_to_default_image';


  return (
    <article className="card">
      <img
        className="btn-like"
        src="../../images/pictos/like_off.svg"
        aria-label="Picto like désactivé"
      />
      <img
        className="card__background"
        src={`${process.env.REACT_APP_API}/images/users/${image}`} alt={firstName}
        aria-label={`Photo de ${firstName}, pet sitter à ${city}`}
      />
      <div className="card__content ">
        <div className="card__content--container ">
          <h2 className="card__title">{firstName}</h2>
          <section className="card__description">
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
          </section>
        </div>
        <NavLink to={`/profil-sitter/${_id}`} className="card__button" aria-label="Lien vers le profil du pet Sitter">
          Voir le profil
        </NavLink>
      </div>
    </article>
  );
};

export default CardUser;
