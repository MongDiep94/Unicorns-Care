import React from "react";
import "../css/styles.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="credits">
        <a
          href="https://woodsplitterleecross.com/"
          target="_blank"
          rel="noreferrer"
        >
          ©Lee Cross
        </a>
        <a
          href="https://www.linkedin.com/in/mong-diep-le-devfullstackjs/"
          target="_blank"
          rel="noreferrer"
        >
          ©Mong Diep LÊ
        </a>
      </section>
      <nav>
        <NavLink to="/" className="footer__nav">
          <FontAwesomeIcon icon={faHouse} />
        </NavLink>
        <NavLink to="/contact" className="footer__nav">
          Contact
        </NavLink>
        <NavLink to="/mentions-legales" className="footer__nav">
          Mentions légales
        </NavLink>
      </nav>
    </footer>
  );
};

export default Footer;
