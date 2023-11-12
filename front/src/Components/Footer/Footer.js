import React from "react";
import "./Footer.css"
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="credits">
        <a href="https://woodsplitterleecross.com/" target= "_blank">©Lee Cross</a>
        <a href="https://www.linkedin.com/in/mong-diep-le-devfullstackjs/" target="_blank">©Mong Diep LÊ</a>
      </section>
      <section>
        <NavLink to="/" className="footer__nav"><FontAwesomeIcon icon={faHouse} /></NavLink>
        <NavLink to="/contact" className="footer__nav">Contact</NavLink>
        <NavLink to="/mentions-legales" className="footer__nav">Mentions légales</NavLink>
      </section>
    </footer>
  );
};

export default Footer;
