import React, { useState } from "react";
import "../../css/styles.css";
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";


const Login = ({socket}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
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

        if (res.data.sessionToken) {
          Cookies.set("sessionToken", res.data.sessionToken, {
            expires: 1,
            secure: true,
          });
          const userId = res.data.userId;
          Cookies.set('userId', userId, { expires: 1, secure: true });
          const userFirstName = res.data.userFirstName;
          Cookies.set('userFirstName', userFirstName, { expires: 1, secure: true });
          //sends the username and socketID to Node.js server
          if (socket) {
          socket.emit('newUser', {userName: userFirstName, socketID: socket.id});
          }
        }

        setLoginSuccess(true);
        navigate("/");

        return res.data;
      })

  };

  return (
    <main className="login__container">
      <section className="login__box">
        <h2>Se connecter</h2>

        <form method="post" onSubmit={handleSubmit}>
          <section className="textbox">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
            <label className="errorLabel" for="email">{emailError}</label>
          </section>

          <section className="textbox">
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handleChange}
            />
            <label className="errorLabel" for="password">{passwordError}</label>
          </section>

          <input type="submit" className="btn btn__orange" value={"Se connecter"} />

          <NavLink to={"/s-inscrire"} className="forgot-password">
            Pas encore inscrit•e ?
          </NavLink>
        </form>
      </section>
    </main>
  );
};

export default Login;
