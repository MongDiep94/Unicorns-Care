import React from "react";
import "./NotFound.css";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="bg__not-found">
      <article>
        <img
          className="licorne-dab"
          src="../../images/licorne.svg"
          alt="Dessin d'une licorne qui fait un DAB"
          aria-label="Dessin d'une licorne qui fait un DAB"
        />
        <div className="text-not-found">
          <p className="style-h2">Une licorne ?... Vous avez dit une licorne ?!</p>
          <p>Malheureusement, vous n'en trouverez pas ici...</p>
          <NavLink className="btn__seeMore--pink" to="/">Mais peut-être là !</NavLink>
        </div>
        <img src="../images/Logo_UnicornsCare_pink.svg" alt="Logo Unicorns & Care" aria-label="Logo Unicorns & Care" className="logo"/>
      </article>
    </section>
  );
};

export default NotFound;
