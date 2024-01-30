import "../../css/styles.css";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    }
    if (e.target.name === "lastName") {
      setLastName(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    // Mettre les messages d'erreur à vide
    setEmailError("");
    setPasswordError("");

    // check pour les 2 inputs remplis
    if ("" === email) {
      setEmailError("Entrer votre addresse mail.");
      console.log("email not empty");
      return;
    }
    // Regex vérif email
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i.test(
        email
      )
    ) {
      setEmailError("Entrer une adresse mail valide, svp.");
      console.log("email OK");
      return;
    }

    if ("" === password) {
      setPasswordError("Entrer un mot de passe.");
      console.log("password not empty");
      return;
    }

    if (password.length < 7) {
      setPasswordError("Entrer un mot de passe de 8 caractères ou plus.");
      console.log("password not OK");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API}/register`, userData)
      .then((res) => {
        navigate("/se-connecter");
        return res.data;
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Server responded with:", error.response.data);
          console.error("Status code:", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
      });
  };
  return (
    <main className="login__container">
      <section className="register__box">
        <h2>S'incrire</h2>

        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <label for="firstName">Prénom</label>
          <input
            className="register__box--input"
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
          <label for="lastName">Nom</label>
          <input
            className="register__box--input"
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
          <label for="email">Email</label>
          <input
            className="register__box--input"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          <label className="errorLabel">{emailError}</label>

          <label for="password">Mot de passe *</label>
          <input
            className="register__box--input"
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handleChange}
          />
          <span className="note margin-bottom-2">
            * Au minimum 8 caratères, comprenant au moins 1 chiffre, 1 majuscule
            et 1 caractère spécial.
          </span>

          <label className="errorLabel" for="password">{passwordError}</label>

          <input
            type="submit"
            className="btn btn__orange"
            value={"Se connecter"}
          />

          <NavLink to={"/se-connecter"} className="forgot-password">
            Déjà inscrit•e ?
          </NavLink>
        </form>
      </section>
    </main>
  );
};

export default Register;
