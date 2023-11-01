import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";

const ProfilSitter = () => {
  return (
    <>
      <div className="bg--green"></div>
      <section className="container">
        <section className="profil__sitter">
          <article className="sitter__img">
            <img
              src="../../images/users/tohya.png"
              alt="Photo pet-sitter Tohya Sakuria"
              aria-label="Photo pet-sitter Tohya Sakuria"
            />
          </article>
          <article className="sitter__infos">
            <h1 className="green">Tohya Sakuria</h1>
            <p>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="margin-right-1 orange"
              />
              Paris 20e
            </p>
            <section className="sitter__rating">
              <p>6 avis</p>
              <p>
                <FontAwesomeIcon icon={faStar} className="gold" /> 5/5
              </p>
            </section>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              auctor elit sed vulputate mi sit amet mauris.
            </p>
            <h2 className="style-h3 orange">Races en préférence</h2>
            <section className="sitter__specie">
              <p className="box bg--color-grey">Specie</p>
              <p className="box bg--color-grey">Specie</p>
              <p className="box bg--color-grey">Specie</p>
            </section>
          </article>
          <article className="sitter_availability">
            <h2>Disponibilités</h2>
            <section className="row">
              <p className="box bg--color-white">lundi &gt; vendredi</p>
              <p className="box bg--color-white">06:00 &gt; 20:00</p>
            </section>
            <section className="row">
              <p className="box bg--color-white">samedi &gt; dimanche</p>
              <p className="box bg--color-white">10:00 &gt; 22:00</p>
            </section>
          </article>
        </section>
        <section className="sitter_reviews">

        </section>
      </section>
    </>
  );
};

export default ProfilSitter;
