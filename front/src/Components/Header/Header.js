import React, { useEffect, useState } from "react";
import "./Header.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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
      console.log("set one User", user);
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

  const handleClick = () => {
    Cookies.remove("userId");
    Cookies.remove("sessionToken");
    setAdmin(false);
    navigate("/");
  };
  return (
    <>
      <header className="menu__header">
        <NavLink to="/" className="btn__nav">
          <img
            src="../images/Logo_UnicornsCare_cream.svg"
            alt="Logo Unicorns & Care"
            aria-label="Logo Unicorns & Care"
          />
        </NavLink>
        <nav className="navbar">
          <NavLink to="/recherche-sitters" className="btn__nav">
            Trouver un pet Sitter
          </NavLink>
          <NavLink to="/recherche-creatures" className="btn__nav">
            Trouver une créature
          </NavLink>
          {userId || sessionToken ? (
            <>
              <NavLink to={`/dashboard/${_id}`} className="btn__nav">
                <img
                  className="navbar__avatar"
                  src={`${process.env.REACT_APP_API}/images/users/${photo}`}
                  alt={`Photo de ${firstName}`}
                />
              </NavLink>
              <NavLink
                to={"/login"}
                onClick={handleClick}
                className="btn__camel margin-left-3"
              >
                Se déconnecter
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/se-connecter" className="btn__nav">
                Connexion
              </NavLink>
              <NavLink to="/register" className="btn__camel margin-left-3">
                Inscription
              </NavLink>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
