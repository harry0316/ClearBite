import React from "react";
import { slide as Menu } from "react-burger-menu";
import hamburgerMenu from "../../assets/icons/hamburger-menu.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";

// import "../css/index.scss";
import "./burger.scss";

class Burger extends React.Component {
  showSetting(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div id="outer-container">
        <Menu
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
          right
          customBurgerIcon={
            <img
              src="../../../src/assets/icons/hamburger-menu.svg"
              className="icon"
            />
          }
        >
          <main id="page-wrap">
            <Link to="/homepage" className="menu-item">
              Home Page
            </Link>
            <Link to="/favorite" className="menu-item">
              My favorite
            </Link>
            <Link to="/homepage" className="menu-item">
              Setting
            </Link>
          </main>
        </Menu>
      </div>
    );
  }
}
export default Burger;
