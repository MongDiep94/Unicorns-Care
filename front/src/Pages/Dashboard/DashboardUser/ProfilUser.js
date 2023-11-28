import "./../Dashboard.css";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import CardOwnerReviewer from "../../../Components/Cards/CardOwnerReviewer.js";
import axios from "axios";

const ProfilUser = ({ id }) => {
  const [user, setUser] = useState({});
  const [ownerReviewer, setOwnerReviewer] = useState([]);


  // Décomposition + condition d'objet vide si pas de données
  const { firstName, lastName, address,  sitter } = user || {};

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/user/${id}`).then((res) => {
      setUser(res.data);
    });

    axios.get(`${process.env.REACT_APP_API}/random-pets`).then((res) => {
      // Ensure that the response is an array
      const ownerData = Array.isArray(res.data) ? res.data : [res.data];
      setOwnerReviewer(ownerData);
    });
  }, [id]); // écoute sur le changement de l'ID

  return (
    <>
      <section className="container">
        <section className="profil">
          <article className="box__infos">
            <h1 className="green">
              {firstName} {lastName && lastName.toUpperCase()}
            </h1>
            <p>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="margin-right-1 orange"
              />{" "}
              {address && address.length > 0 && address[0].city}
            </p>
            <section className="sitter__rating">
              <p>6 avis</p>
              <p>
                <FontAwesomeIcon icon={faStar} className="gold" /> 5/5
              </p>
            </section>
            {sitter &&
              <>
                <p>{sitter.bio}</p>
                <h2 className="style-h3 orange">Préférences d'espèce</h2>
                <section className="box__specie">
                  {sitter.species &&
                    sitter.species.length > 0 &&
                    sitter.species.map((s, i) => (
                      <p className="box bg--color-grey" key={i}>
                        {s}
                      </p>
                    ))}
                </section>
              </>
            }
          </article>
          <section className="box__availability">
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
          </section>
        </section>

        <section className="box__details">
          <section className="box__reviews">
            {ownerReviewer.map((or, i) => (
              <CardOwnerReviewer key={i} ownerReviewer={or} />
            ))}
          </section>
          <iframe
            src={address && address.length > 0 && address[0].location}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-hidden="false"
            aria-label={`Adresse de ${firstName}`}
          />
        </section>
      </section>
    </>
  );
};

export default ProfilUser;
