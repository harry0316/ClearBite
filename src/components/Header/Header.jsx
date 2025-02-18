import "./Header.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logos/CLEARBITE_logo.svg";
import Burger from "../Burger/Burger";

function Header() {
  return (
    <section className="header">
      <div className="header__container">
        <div className="header__left">
          <img src={logo} alt="clearBite logo" className="header__logo" />
        </div>
        <div className="header__right">
          <Burger />
        </div>
      </div>
    </section>
  );
}

export default Header;
