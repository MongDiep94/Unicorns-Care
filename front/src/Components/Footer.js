import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <p>©Lee Cross / ©LMD</p>
      <section>
        <NavLink to="/" className="footer__nav"><FontAwesomeIcon icon={faHouse} /></NavLink>
        <NavLink to="/contact" className="footer__nav">Contact</NavLink>
        <NavLink to="/mentions-legales" className="footer__nav">Mentions légales</NavLink>
      </section>
    </footer>
  );
};

export default Footer;
