import React from "react";
import "../../css/styles.css";
import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <section className="banner">
      <article className="intro">
        <h1>
          Lorem ipsum dolor sit amet. Sit voluptate quam 33 eaque maiores sed
          voluptatibus dolores sit rerum .
        </h1>
        <div className="cta-area">
          <NavLink to="/recherche-sitters" className="btn__gold style-h3 bold">
            Trouver votre Pet Sitter
          </NavLink>
          <NavLink to="/recherche-creatures" className="btn__gold style-h3 bold">
            Trouver votre créature
          </NavLink>
        </div>
      </article>
      <img src="../../images/beast1_outline_cream.svg" alt="Dessin d'un griffon." aria-label="Dessin d'un griffon."/>
    </section>
  );
};

export default Banner;
