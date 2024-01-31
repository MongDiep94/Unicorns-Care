import React, { useEffect, useState } from "react";
import "../css/styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Header = () => {
  // Burger fermé par défaut
  const [showBurger, SetShowBurger] = useState(false);
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  const userId = Cookies.get("userId");
  const sessionToken = Cookies.get("sessionToken");

  // Décomposition + condition d'objet vide si pas de données
  const { _id, firstName, isAdmin, photo } = user || {};

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/user/${userId}`).then((res) => {
      setUser(res.data);
    });

    if (!userId || !sessionToken) {
      return;
    }

    if (isAdmin === true) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [userId, sessionToken]);

  // Menu Burger
  const handleShowBurger = () => {
    // Menu Burger s'active seulement si valeur différent de false
    SetShowBurger(!showBurger);
  };

  // Interlignage
  const handleLineLargeClick = (e) => {
    document.body.style.lineHeight = "3rem";
    document.body.style.fontSize = "2rem";
  };
  const handleLineNormalClick = (e) => {
    document.body.style.lineHeight = "1.15";
    document.body.style.fontSize = "1.6rem";
  };

  // Déconnexion
  const handleLogOut = () => {
    Cookies.remove("userId");
    Cookies.remove("sessionToken");
    setAdmin(false);
    navigate("/");
  };

  return (
    <>
      <header>
        <section className="accessibility">
          <div className="nav__access">
            <a href="#home">Home page</a>
            <a href="#">Haut de page</a>
            <a href="#search-sitters">recherche pet sitters</a>
            <a href="#search-creatures">recherche créatures</a>
            {userId || sessionToken ? (
              <>
                <a href="#dahboard">mon dashboard</a>
                <a href="#logout">Déconnexion</a>
              </>
            ) : (
              <>
                <a href="#login">Connexion</a>
                <a href="#register">Inscription</a>
              </>
            )}
          </div>

          <div className="nav__top">
            <p>
              <strong>Interlignage :</strong>{" "}
              <button id="line-normal" onClick={handleLineNormalClick}>
                simple
              </button>{" "}
              |{" "}
              <button id="line-large" onClick={handleLineLargeClick}>
                augmenté
              </button>
            </p>
          </div>
        </section>

        <nav className={`navbar ${showBurger ? "show-nav" : "hide-nav"}`}>
          <NavLink to="/" id="home" className="navbar__logo">
            <img
              src="../images/Logo_UnicornsCare_cream.svg"
              alt="Logo Unicorns & Care"
              aria-label="Logo Unicorns & Care"
            />
          </NavLink>
          <ul className="navbar__links">
            <li className="navbar__item">
              <NavLink
                to="/recherche-sitters"
                id="search-sitters"
                className="navbar__link"
              >
                Trouver un pet Sitter
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink
                to="/recherche-creatures"
                id="search-creatures"
                className="navbar__link"
              >
                Trouver une créature
              </NavLink>
            </li>
            {userId || sessionToken ? (
              <>
                <li className="navbar__item">
                  <NavLink
                    to={"/se-connecter"}
                    onClick={handleLogOut}
                    id="logout"
                    className="navbar__link"
                  >
                    Se déconnecter
                  </NavLink>
                </li>
                <li className="navbar__item">
                  <NavLink
                    to={`/dashboard/${_id}`}
                    id="dashboard"
                    className="navbar__link"
                  >
                    <>
                      {photo ? (
                        <img
                          className="navbar__avatar"
                          src={`${process.env.REACT_APP_API}/images/users/${photo}`}
                          alt={`Photo de ${firstName}`}
                        />
                      ) : (
                        <img
                          className="navbar__avatar"
                          src={`${process.env.REACT_APP_API}/images/avatar_licorne.svg`}
                          alt={`Photo de ${firstName}`}
                        />
                      )}
                    </>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="navbar__item">
                  <NavLink
                    to="/se-connecter"
                    id="login"
                    className="navbar__link"
                  >
                    Connexion
                  </NavLink>
                </li>
                <li className="navbar__item">
                  <NavLink
                    to="/s-inscrire"
                    id="register"
                    className="navbar__link"
                  >
                    Inscription
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <button className="navbar__burger" onClick={handleShowBurger}>
            <span className="burger--line"></span>
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
