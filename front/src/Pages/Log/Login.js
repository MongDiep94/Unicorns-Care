import React, { useState } from "react";
import "./Log.css";
import { NavLink } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = () => {
    // Mettre les messages d'erreur à vide
    setEmailError("");
    setPasswordError("");

    // check pour les 2 inputs remplis
    if ("" === email) {
      setEmailError("Entrer votre addresse mail.");
      return;
    }
    // Regex
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Entrer une adresse mail valide, svp.");
      return;
    }

    if ("" === password) {
      setPasswordError("Entrer un mot de passe.");
      return;
    }

    if (password.length < 7) {
      setPasswordError("Entrer un mot de passe de 8 caractères ou plus.");
      return;
    }

    // Authentication calls will be made here...
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Se connecter</h2>

        <form method="post">
          <div className="textbox">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <label className="errorLabel">{emailError}</label>
          </div>

          <div className="textbox">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <label className="errorLabel">{passwordError}</label>
          </div>

          <input
            type="submit"
            className="btn__orange"
            onClick={handleSubmit}
            value={"Se connecter"}
          />

          <NavLink to={"/inscription"} className="forgot-password">
            Pas encore inscrit•e ?
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
