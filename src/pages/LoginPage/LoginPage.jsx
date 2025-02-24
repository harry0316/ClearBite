import "./LoginPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="login__input--form">
      <div className="login__wrapper">
        <h2 className="login__input--title">Login</h2>
        <form className="login__form">
          <label htmlFor="username" className="login__label">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="👤Username"
              className="login__input"
            />
          </label>
          <label htmlFor="password" className="login__label">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="🔒password"
              className="login__input"
            />
          </label>
          <div className="login__footer">
            <button className="login__button">Login</button>
          </div>
        </form>
        <p className="login__link">
          Don't have account?
          <Link to="/signup" className="login__href">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
