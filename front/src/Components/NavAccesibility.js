import React from "react";
import { NavLink } from "react-router-dom";

const NavAccesibility = () => {
  return (
    <>
      <div class="nav__access">
        <NavLink to="#help">Aide</NavLink>
        <NavLink to="#">Haut de page</NavLink>
        <NavLink to="#search">Recherche</NavLink>
        <NavLink to="#myAccount">Mon compte</NavLink>
        <NavLink to="#mainMenu">Menu principal</NavLink>
        <NavLink to="#section-5">Sommaire</NavLink>
      </div>
      <div class="container nav__top">
        <p>Option d'affichage/accessibilité</p>
        <p>
          Thème : <button id="btn-darkMode">sombre contrasté</button>
          <button id="lightMode">clair</button>
        </p>
        <p>
          Interlignage <NavLink to="#">simple</NavLink>{" "}
          <NavLink to="#">augmenté</NavLink>
        </p>
      </div>
    </>
  );
};

export default NavAccesibility;
