import "./AuthForm.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import barcode from "../../assets/icons/barcode.svg";
import logo from "../../assets/logos/CLEARBITE_logo.svg";
import LoginPage from "../../pages/LoginPage/LoginPage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import IngredientsSetting from "../../pages/IngredientsSetting/IngredientsSetting";

function AuthForm() {
  const location = useLocation();
  const locationPath = location.pathname;
  //  === "/login" || location.pathname === "/";

  return (
    <section className="authForm">
      <header className="authForm__header">
        <img
          src={barcode}
          alt="barcode for design"
          className="authForm__design--icon"
        />
      </header>
      <div className="authForm__hero">
        <div className="authForm__hero--left">
          <img src={logo} alt="logo" className="authForm__logo" />
        </div>
        <div className="authForm__hero--right">
          <h1 className="authForm__title">Hello!</h1>
          <h2 className="authForm__subtitle">Welcome to ClearBite</h2>
        </div>
      </div>
      {/* Conditionally render LoginPage, SignupPage,IngredientsSetting  */}
      {locationPath === "/login" || locationPath === "/" ? (
        <LoginPage />
      ) : locationPath === "/setting" ? (
        <IngredientsSetting />
      ) : (
        <SignupPage />
      )}
    </section>
  );
}

export default AuthForm;
