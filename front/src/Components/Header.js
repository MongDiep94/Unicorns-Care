import React, { useEffect, useState } from "react";
import "../css/styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Header = () => {
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

  const handleLogOut = () => {
    Cookies.remove("userId");
    Cookies.remove("sessionToken");
    setAdmin(false);
    navigate("/");
  };

  //Interlignage
  const handleLineLargeClick = (e) => {
    document.body.style.lineHeight = "3rem";
    document.body.style.fontSize = "2rem";
  };
  const handleLineNormalClick = (e) => {
    document.body.style.lineHeight = "1.15";
    document.body.style.fontSize = "1.6rem";
  };

  return (
    <>
      <header>
        <section className="accessibility">
          <section className="nav__access">
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
          </section>

          <section className="container nav__top">
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
          </section>
        </section>

        <section className="menu__header">
          <NavLink to="/" id="home" className="btn__nav">
            <img
              src="../images/Logo_UnicornsCare_cream.svg"
              alt="Logo Unicorns & Care"
              aria-label="Logo Unicorns & Care"
            />
          </NavLink>
          <nav className="navbar">
            <NavLink
              to="/recherche-sitters"
              id="search-sitters"
              className="btn__nav"
            >
              Trouver un pet Sitter
            </NavLink>
            <NavLink
              to="/recherche-creatures"
              id="search-creatures"
              className="btn__nav"
            >
              Trouver une créature
            </NavLink>
            {userId || sessionToken ? (
              <>
                <NavLink
                  to={"/se-connecter"}
                  onClick={handleLogOut}
                  id="logout"
                  className="btn__nav"
                >
                  Se déconnecter
                </NavLink>
                <NavLink
                  to={`/dashboard/${_id}`}
                  id="dashboard"
                  className="btn__nav"
                >
                  <img
                    className="navbar__avatar"
                    src={`${process.env.REACT_APP_API}/images/users/${photo}`}
                    alt={`Photo de ${firstName}`}
                  />
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/se-connecter" id="login" className="btn__nav">
                  Connexion
                </NavLink>
                <NavLink
                  to="/s-inscrire"
                  id="register"
                  className="btn btn__camel margin-left-3"
                >
                  Inscription
                </NavLink>
              </>

            )}
          </nav>
        </section>
      </header>
    </>
  );
};

export default Header;
