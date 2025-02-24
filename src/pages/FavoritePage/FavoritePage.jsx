import "./FavoritePage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
const API_URL = "http://localhost:8080";

function FavoritePage() {
  const [favList, setFavList] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  //access to favorite database to get list
  const getAllFav = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/favorite`, {
        params: { userId },
      });
      setFavList(data);
    } catch (e) {
      console.error("can not fetch data from server", e);
    }
  };

  const getIngredient = async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/brandedfood/search`, {
        params: { query: id },
      });

      if (!data) {
        return console.error("no data in database");
      }
      navigate(`/detail/${data[0].fdc_id}`, {
        state: { productData: data[0] },
      });
    } catch (e) {
      console.error("can not fetch data from server", e);
    }
  };

  //useEffect
  useEffect(() => {
    getAllFav();
  }, []);

  return (
    <section className="fav">
      <Header />
      <div className="fav__container">
        <h2 className="fav__title">My Favorite</h2>
        <div className="fav__list">
          {favList.map((item, index) => (
            <div
              className="fav__item"
              key={item.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                onClick={() => getIngredient(item.gtin_upc)}
                className="fav__link"
              >
                {index + 1} : {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FavoritePage;
