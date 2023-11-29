import "./../Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import CardOwnerReviewer from "../../../Components/Cards/CardOwnerReviewer.js";
import CardSitterReviewer from "../../../Components/Cards/CardSitterReviewer.js";
import axios from "axios";

const ProfilUser = ({ id }) => {
  const [user, setUser] = useState({});
  const [pets, setPets] = useState([]);
  const [ownerReviewer, setOwnerReviewer] = useState([]);
  const [sitterReviewer, setSitterReviewer] = useState([]);

  // Décomposition + condition d'objet vide si pas de données
  const { firstName, lastName, address, sitter, pet } = user || {};

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/user/${id}`).then((res) => {
      setUser(res.data);
      setPets(res.data.pets);
    });

    axios.get(`${process.env.REACT_APP_API}/random-pets`).then((res) => {
      // Ensure that the response is an array
      const ownerData = Array.isArray(res.data) ? res.data : [res.data];
      setOwnerReviewer(ownerData);
    });

    axios.get(`${process.env.REACT_APP_API}/random-sitters`).then((res) => {
      // Ensure that the response is an array
      const sitterData = Array.isArray(res.data) ? res.data : [res.data];
      setSitterReviewer(sitterData);
    });
  }, [id]); // écoute sur le changement de l'ID

  return (
    <>
      <section className="container">
        <section className="dashboard__profil">
          <section className="box__infos">
            <h1 className="green">
              {firstName} {lastName && lastName.toUpperCase()}
            </h1>
            <section className="sitter__rating">
              <p>6 avis</p>
              <p>
                <FontAwesomeIcon icon={faStar} className="gold" /> 5/5
              </p>
            </section>
            <section className="address">
              <p>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="margin-right-1 orange"
                />
              </p>
              <section>
                {address && address.length > 0 && (
                  <>
                    <p>
                      {address[0].number} {address[0].street}
                    </p>
                    <p>
                      {address[0].zipcode} {address[0].city}
                    </p>
                  </>
                )}
              </section>
            </section>
            {sitter && <p>{sitter.bio}</p>}
          </section>

          <section className="box__availability">
            {sitter ? (
              <section className="profil__table">
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
              </section>
            ) : (
              <section className="dashboard__guard">
                <h2>Gardes</h2>
                <p className="guard__p">Du 11 décembre 2023</p>
                <p className="guard__p">Au 22 décembre 2023</p>
                <p className="total-days">Soit 12 jours</p>
              </section>
            )}
          </section>
        </section>
        {sitter && (
          <section className="dashboard__species">
            <h2 className="style-h3 orange">Préférences d'espèces</h2>
            <section className="box__specie">
              {sitter.species &&
                sitter.species.length > 0 &&
                sitter.species.map((s, i) => (
                  <p className="box bg--color-grey" key={i}>
                    {s}
                  </p>
                ))}
            </section>
          </section>
        )}
        {pets && pets.length > 0 && (
          <>
            <h2 className="green">Créatures</h2>
            {pets.map((pet) => (
              <section className="dashboard__pets" key={pet._id}>
                <article className="profil__img">
                  <img
                    className="card__background"
                    src={`${process.env.REACT_APP_API}/images/pets/${pet.image}`}
                    alt={`Photo de ${pet.name}`}
                  />
                </article>
                <article className="box__infos">
                  <h1 className="green">{pet.name}</h1>
                  <section>
                    <section className="box__specie">
                      <p className="box bg--color-grey">{pet.age} ans</p>
                      <p className="box bg--color-grey">{pet.gender}</p>
                      <p className="box bg--color-grey">{pet.specie}</p>
                      <section>
                        {pet.element === "Glace" && (
                          <img
                            className="picto__element"
                            src={`${process.env.REACT_APP_API}/images/pictos/element_ice.svg`}
                            alt={`Icône élément ice`}
                          />
                        )}
                        {pet.element === "Feu" && (
                          <img
                            className="picto__element"
                            src={`${process.env.REACT_APP_API}/images/pictos/element_fire.svg`}
                            alt={`Icône élément fire`}
                          />
                        )}
                        {pet.element === "Eau" && (
                          <img
                            className="picto__element"
                            src={`${process.env.REACT_APP_API}/images/pictos/element_water.svg`}
                            alt={`Icône élément fire`}
                          />
                        )}
                        {pet.element === "Terre" && (
                          <img
                            className="picto__element"
                            src={`${process.env.REACT_APP_API}/images/pictos/element_earth.svg`}
                            alt={`Icône élément fire`}
                          />
                        )}
                        {pet.element === "Air" && (
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
                    <p>{pet.bio}</p>
                  </section>
                </article>
              </section>
            ))}
          </>
        )}
      </section>
      <section className="dashboard__reviews">
        {sitter ? (
          <>
            <h2 className="orange">Avis des propriétaires</h2>
            {ownerReviewer.map((or, i) => (
              <CardOwnerReviewer key={i} ownerReviewer={or} />
            ))}
          </>
        ) : (
          <>
            <h2 className="orange">Avis des pet sitters</h2>
            {sitterReviewer.map((sr, i) => (
              <CardSitterReviewer key={i} sitterReviewer={sr} />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default ProfilUser;
