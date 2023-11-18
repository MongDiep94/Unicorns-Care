import "./Profils.css";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfilPet = () => {
  const [pet, setPet] = useState({});

  // identification du sitter par son ID
  const { id } = useParams();

  // Décomposition + condition d'objet vide si pas de données
  const { name, age, gender, specie, element, bio, image, owner } = pet || {};
  const { firstName, lastName, address, photo } = owner || {};
  //console.log('city', address[0].city)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/pet/${id}`).then((res) => {
      setPet(res.data);
      console.log("set one pet", pet);
    });
  }, [id]); // écoute sur le changement de l'ID

  return (
    <>
      <div className="bg--green"></div>
      <section className="container">
        <section className="profil__sitter">
          <article className="sitter__img">
            <img
              className="card__background"
              src={`${process.env.REACT_APP_API}/images/pets/${image}`}
              alt={`Photo de ${name}`}
            />
          </article>
          <article className="sitter__infos">
            <h1 className="green">{name}</h1>
            <section>
              <p>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="margin-right-1 orange"
                />{" "}
                {address && address.length > 0 && address[0].city}
              </p>
              <section className="sitter__rating">
                <p className="box bg--color-grey">{age} ans</p>
                <p className="box bg--color-grey">{gender}</p>
                <p className="box bg--color-grey">{specie}</p>
              </section>
              <section>
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
            </section>
            <section>
              <p>{bio}</p>
            </section>
          </article>
          <article className="sitter_availability">
            <section>
              <table>
                <thead>
                  <tr>
                    <th colspan="2">Gardes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="days">
                  Du 11 décembre 2023
                  </tr>
                  <tr className="days">
                  Au 22 décembre 2023
                  </tr>
                  <tr>Soit 12 jours</tr>
                </tbody>
              </table>
            </section>
            <NavLink to="#" className="btn__orange relative">
            <img
              className="avatar__contact"
              src={`${process.env.REACT_APP_API}/images/users/${photo}`}
              alt={`Photo de ${name}`}
            />
              Contacter {firstName}
            </NavLink>
          </article>
        </section>

        <section className="sitter__details">
          <section className="sitter__reviews">
            <article className="review__card">
              <img
                className="review__photo"
                src={`${process.env.REACT_APP_API}/images/users/${photo}`}
                alt={`Photo reviewer ${firstName}`}
              />
              <section>
                <p className="review__rating">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </p>
                <h3 className="size-text">Camille</h3>
                <p className="review__date">Juillet 2023</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis auctor elit sed vulputate mi sit amet mauris.
                </p>
              </section>
            </article>
            <article className="review__card">
              <img
                className="review__photo"
                src={`${process.env.REACT_APP_API}/images/users/${photo}`}
                alt={`Photo reviewer ${firstName}`}
              />
              <section>
                <p className="review__rating">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </p>
                <h3 className="size-text">Camille</h3>
                <p className="review__date">Juillet 2023</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis auctor elit sed vulputate mi sit amet mauris.
                </p>
              </section>
            </article>
          </section>
          <iframe
            src={address && address.length > 0 && address[0].location}
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            aria-hidden="false"
            title="Adresse Tohya"
          />
        </section>
      </section>
    </>
  );
};

export default ProfilPet;
