import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="menu__header">
      <NavLink to="/" className="btn__nav"><img src="../images/Logo_UnicornsCare_cream.svg" alt="Logo Unicorns & Care" aria-label="Logo Unicorns & Care" /></NavLink>
        <nav className="navbar">
          <NavLink to="/recherche-sitters" className="btn__nav">Trouver un pet Sitter</NavLink>
          <NavLink to="/recherche-creatures" className="btn__nav">Trouver une créature</NavLink>
          <NavLink to="/login" className="btn__nav">Connexion</NavLink>
          <NavLink to="/register" className="btn__camel margin-left-3">
            Inscription
          </NavLink>
        </nav>
      </header>
    </>
  );
};

export default Header;
