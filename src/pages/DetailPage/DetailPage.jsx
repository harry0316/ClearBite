import "./DetailPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
const API_URL = "http://localhost:8080";
import Header from "../../components/Header/Header";
import no_img from "../../assets/icons/no_img.png";

function DetailPage() {
  const location = useLocation();
  const productData = location.state?.productData || {};
  const userId = sessionStorage.getItem("userId");

  // States
  const [img, setImg] = useState(""); // Image URL
  const [ingredients, setIngredients] = useState([]); // User's avoided ingredients
  const [ingredientsArray, setIngredientsArray] = useState([]); // Processed ingredients from product
  const [detectedFood, setDetectedFood] = useState(false);

  // Fetch product image
  const getPicture = async () => {
    try {
      const result = await axios.get(`${API_URL}/api/barcode`, {
        params: { upc: productData.gtin_upc },
      });
      const topImg = result.data.items?.[0]?.images?.[0] || no_img;
      setImg(topImg);
    } catch (e) {
      console.log("Cannot get img from web API");
    }
  };

  // Fetch user's avoided ingredients using userId
  const getAvoidFood = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/ingredients`, {
        params: { userId: userId },
      });

      // Extract ingredient names from API response
      const targetList = data.map((item) => item.ingredient);

      setIngredients(targetList); // Update state
    } catch (e) {
      console.log("Cannot get ingredients info", e);
    }
  };

  // Process product ingredients when data is available
  useEffect(() => {
    if (productData.ingredients) {
      const formattedIngredients = productData.ingredients
        .split(/[,.:]/)
        .map((ingredient) => ingredient.trim());
      setIngredientsArray(formattedIngredients);
    }
  }, [productData]);

  // Check if an ingredient is an allergen
  const isDetected = (ingredient) =>
    ingredients.some(
      (allergen) => ingredient.toLowerCase().includes(allergen.toLowerCase()) // Check if part of the ingredient matches
    );

  // Check if at least one ingredient exists
  useEffect(() => {
    const hasDetectedFood = ingredientsArray.some((ingredient) =>
      isDetected(ingredient)
    );
    setDetectedFood(hasDetectedFood);
  }, [ingredientsArray, ingredients]);

  // Fetch data on component mount
  useEffect(() => {
    getPicture();
    getAvoidFood();
  }, []);

  //click event to add gtin_upc into favorite table
  const addFavorite = async () => {
    try {
      const result = await axios.post(
        `${API_URL}/api/favorite`,
        {
          userId,
          gtin_upc: productData.gtin_upc,
          description: productData.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(result);
      if (result.status === 200) {
        alert("Add to Favorite successfully!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="detail">
      <Header />
      <div className="detail__container">
        <div className="detail__header">
          <img src={img} alt="product image" className="detail__img" />
        </div>
        <h2 className="detail__title">{productData.description}</h2>
        <div className={`detail__body ${detectedFood ? "detail__red" : ""}`}>
          <div className="detail__item">
            {ingredientsArray.length > 0 ? (
              ingredientsArray.map((ingredient, index) => (
                <span
                  key={index}
                  className={isDetected(ingredient) ? "detail__active" : ""}
                >
                  {ingredient}
                  {index < ingredientsArray.length - 1 && ", "}
                </span>
              ))
            ) : (
              <p>No ingredient information available</p>
            )}
          </div>
        </div>
        <div className="detail__footer">
          <button onClick={() => addFavorite()} className="detail__button">
            Add favorite
          </button>
          <Link to="/homepage" className="detail__button detail__link">
            Go back to Page
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DetailPage;
