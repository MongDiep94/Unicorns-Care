import React, { useState } from "react";
import "./Log.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let request_data = {
      email: email,
      password: password,
    };

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

    axios
      .post(`${process.env.REACT_APP_API}/login`, request_data)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Se connecter</h2>

        <form method="post" onClick={handleSubmit}>
          <div className="textbox">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
            <label className="errorLabel">{emailError}</label>
          </div>

          <div className="textbox">
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handleChange}
            />
            <label className="errorLabel">{passwordError}</label>
          </div>

          <input type="submit" className="btn__orange" value={"Se connecter"} />

          <NavLink to={"/inscription"} className="forgot-password">
            Pas encore inscrit•e ?
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
