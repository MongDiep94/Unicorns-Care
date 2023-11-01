import React from "react";
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
        <p>Logo</p>
      </article>
    </section>
  );
};

export default NotFound;
