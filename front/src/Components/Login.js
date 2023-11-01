import React from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Se connecter</h2>
        <form method="post">
          <div className="textbox">
            <input type="email" placeholder="Email" name="email" />
          </div>
          <div className="textbox">
            <input type="password" placeholder="Mot de passe" name="password" />
          </div>
          <button type="submit" className="btn__orange">
            {" "}
            Se connecter
          </button>
          <NavLink to={"/inscription"} className="forgot-password">
            Pas encore inscrit•e ?
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
