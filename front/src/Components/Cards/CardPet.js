import React from "react";
import "./Cards.css";
import { NavLink } from "react-router-dom";

const CardPet = ({ onePet }) => {
  /*
  const [pet, setPet] = useState("");
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/pet/${id}`).then((res) => {
      setPet(res.data);
      console.log("data pet", res.data);
    });
  }, []);
  */

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
        <div className="card__content">
          <div className="card__content--container">
            <h2 className="card__title">{name}</h2>
            <section className="card__pet__description">
              <div>
                <p>{specie}</p>
                <p>{age} ans</p>
              </div>
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
            </section>
          </div>
          <NavLink
            to={`/pet/${_id}`}
            className="card__button"
            aria-label={`Lien vers profil de ${name}`}
          >
            Voir le profil
          </NavLink>
        </div>
      </article>
    </>
  );
};

export default CardPet;
