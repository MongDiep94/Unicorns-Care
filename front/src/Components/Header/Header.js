import React, { useEffect, useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Header = () => {
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(false);

  const user = Cookies.get("sessionToken");
  console.log('cookie', user)
  useEffect(() => {

    if (!user) {
      return;
    }

    if (user.isAdmin === true) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, []);

  const handleClick = () => {
    Cookies.remove("sessionToken");
    setAdmin(false);
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
          {user ? (
            <>
              <NavLink to={`/dashboard/${users.userId}`} className="btn__nav">
                Dashboard
              </NavLink>
              <NavLink to={"/login"} onClick={handleClick} className="btn__nav">
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
