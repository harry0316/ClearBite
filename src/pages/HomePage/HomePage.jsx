import "./HomePage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
const API_URL = "http://localhost:8080";
import Header from "../../components/Header/Header";
import DetailPage from "../DetailPage/DetailPage";

function HomePage() {
  //state
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");

  //userId fetching from ingredientsSetting
  const location = useLocation();
  const { currentId } = location.state || {};

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
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) {
      return;
    }
    try {
      const { data } = await axios.get(`${API_URL}/api/brandedfood/search`, {
        params: { query: input },
      });

      if (!data || !Array.isArray(data) || data.length === 0) {
        setError("No matching food found");
        setResult([]);
        return;
      }
      setResult(data);
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
            {Array.isArray(result) &&
              result.length > 0 &&
              result.map((item, index) => (
                <div
                  className="home__item"
                  key={item.fdc_id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link
                    to={`/detail/${item.fdc_id}`}
                    state={{ productData: item, id: currentId }}
                    className="home__item--title"
                  >
                    {index + 1} : {item.description}
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
