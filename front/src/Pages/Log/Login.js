import React, { useState } from "react";
import "./Log.css";
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";
import { auth } from "../../utils/Auth.js";

const Login = ({ socket }) => {
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
<<<<<<< HEAD
      .post(`${process.env.REACT_APP_API}/login`, request_data)
      .then((res) => {
=======
      .post(`${process.env.REACT_APP_API}/login`, request_data, {
        headers: auth(),
      })
      .then(async (res) => {
        console.log("Server Response:", res.data);
        const { userId, sessionToken } = res.data;
>>>>>>> 17509a77f6e0e413154f28c3975a8219a536da7f

        if (sessionToken) {
          Cookies.set("sessionToken", sessionToken, {
            expires: 1,
            secure: true,
          });
          console.log("Cookies:", Cookies.get());

          const userInfoResponse = await axios.get(
            `${process.env.REACT_APP_API}/user/${userId}`,
            {
              headers: auth(),
              withCredentials: true,
            },
          );
          const { firstName } = userInfoResponse.data;


          //sends the username and socketID to Node.js server
          if (socket) {
            socket.emit("newUser", {
              userName: firstName,
              socketID: socket.id,
            });
          }
        }

        setLoginSuccess(true);
        navigate("/");

        return res.data;
      })
<<<<<<< HEAD

=======
      .catch((error) => {
        if (error.response && error.response.data) {
          // Handle specific error messages from the server
          console.log("Server error:", error.response.data.message);
        } else {
          // Handle generic error
          console.error("Error during login:", error.message);
        }
      });
>>>>>>> 17509a77f6e0e413154f28c3975a8219a536da7f
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
            <label className="errorLabel">{emailError}</label>
          </section>

          <section className="textbox">
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handleChange}
            />
            <label className="errorLabel">{passwordError}</label>
          </section>

          <input type="submit" className="btn__orange" value={"Se connecter"} />

          <NavLink to={"/s-inscrire"} className="forgot-password">
            Pas encore inscrit•e ?
          </NavLink>
        </form>
      </section>
    </main>
  );
};

export default Login;
