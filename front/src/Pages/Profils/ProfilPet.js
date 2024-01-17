import "../../css/styles.css";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import CardSitterReviewer from "../../Components/Cards/CardSitterReviewer.js";

const ProfilPet = () => {
  const [pet, setPet] = useState({});
  const [sitterReviewer, setSitterReviewer] = useState([]);

  // identification du sitter par son ID
  const { id } = useParams();

  // Décomposition + condition d'objet vide si pas de données
  const { name, age, gender, specie, element, bio, image, owner } = pet || {};
  const { firstName, address } = owner || {};

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/pet/${id}`).then((res) => {
      setPet(res.data);
    });
    axios.get(`${process.env.REACT_APP_API}/random-sitters`).then((res) => {
      // Ensure that the response is an array
      const sitterData = Array.isArray(res.data) ? res.data : [res.data];
      setSitterReviewer(sitterData);
    });
  }, [id]); // écoute sur le changement de l'ID

  return (
    <>
      <div className="bg--green"></div>
      <section className="container">
        <section className="profil">
          <article className="profil__img">
            <img
              className="card__background"
              src={`${process.env.REACT_APP_API}/images/pets/${image}`}
              alt={`Photo de ${name}`}
            />
          </article>
          <article className="box__infos">
            <h1 className="green">{name}</h1>
            <section>
              <p>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="margin-right-1 orange"
                />{" "}
                {address && address.length > 0 && address[0].city}
              </p>
              <section className="box__specie">
                <p className="box bg--color-grey">{age} ans</p>
                <p className="box bg--color-grey">{gender}</p>
                <p className="box bg--color-grey">{specie}</p>
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
            </section>
            <section>
              <p>{bio}</p>
            </section>
          </article>
          <section className="box__availability">
            <section className="guard">
              <h2>Gardes</h2>
              <p className="guard__p">Du 11 décembre 2023</p>
              <p className="guard__p">Au 22 décembre 2023</p>
              <p className="total-days">Soit 12 jours</p>
            </section>
            <section>
            <NavLink to="#" className="btn__orange">
              Contacter {firstName}
            </NavLink>
            </section>
          </section>
        </section>

        <section className="box__details">
          <section className="box__reviews">
            {sitterReviewer.map((sr, i) => (
              <CardSitterReviewer key={i} sitterReviewer={sr} />
            ))}
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
