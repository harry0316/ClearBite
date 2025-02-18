import "./HomePage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import Header from "../../components/Header/Header";

function HomePage() {
  //state
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  //userId fetching from ingredientsSetting
  const location = useLocation();
  const { id } = location.state || {};

  //set Input
  const handleChangeInput = (e) => {
    setInput(e.target.value);
    if (error) setError("");
  };

  const validation = () => {
    if (input.trim().length === 0) {
      setError("Please type UPC code or Products Name");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) {
      return;
    }
    try {
      const { data } = await axios.get();
      setError("");
    } catch (e) {
      console.error("can not search the product", e);
    }
  };

  return (
    <section className="home">
      <Header />
      <div className="home__container">
        <h2 className="home__title">What food would you like to search for?</h2>
      </div>
      <form className="home__form">
        <label className="home__label">
          <input
            id="input"
            name="input"
            className="home__input"
            type="text"
            placeholder="Type UPC code or Product Name"
            value={input}
            onChange={handleChangeInput}
          />
        </label>
        <button
          className="home__submit"
          type="submit"
          aria-label="Search"
          onClick={handleSubmit}
        ></button>
      </form>
      {error && <p className="home__error">{error}</p>}
      <div className="home__result">
        <div className="home__list">
          <div className="home__item">procuts 1</div>
          <div className="home__item">procuts 2</div>
          <div className="home__item">procuts 3</div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
