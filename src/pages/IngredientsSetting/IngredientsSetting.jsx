import "./IngredientsSetting.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import plusIcon from "../../assets/icons/plus-square-svgrepo-com.svg";
const API_URL = "http://localhost:8080";

// Import icons
import egg from "../../assets/icons/egg.svg";
import fish from "../../assets/icons/fish.svg";
import halal from "../../assets/icons/halal.svg";
import kosher from "../../assets/icons/kosher.svg";
import nuts from "../../assets/icons/nuts.svg";
import peanuts from "../../assets/icons/peanuts.svg";
import shrimp from "../../assets/icons/shrimp.svg";
import soy from "../../assets/icons/soy.svg";
import vegan from "../../assets/icons/vegan.svg";
import vegetarian from "../../assets/icons/vegetarian.svg";
import wheat from "../../assets/icons/wheat.svg";
import milk from "../../assets/icons/milk.svg";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

function IngredientsSetting() {
  const iconAllergy = {
    Eggs: egg,
    Fish: fish,
    Vegan: vegan,
    Vegetarian: vegetarian,
    Halal: halal,
    Kosher: kosher,
    "Tree Nuts": nuts,
    Peanuts: peanuts,
    Shellfish: shrimp,
    Soy: soy,
    "Wheat & Gluten": wheat,
    "Milk & Lactose": milk,
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { username, password } = location.state || {};

  // State hooks
  const [allergy, setAllergy] = useState([]);
  const [preference, setPreference] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Fetch categories
  const allCategories = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/setting/`);
      setAllergy(data.filter((item) => item.category === 1));
      setPreference(data.filter((item) => item.category === 2));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    allCategories();
  }, []);

  // Handle selection toggle
  const toggleSelection = (event) => {
    const id = Number(event.currentTarget.dataset.value); // Convert ID to number

    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Check if item is selected
  const isSelected = (id) => selectedItems.includes(id);

  // Handle confirm button => post to database
  const handleConfirm = async () => {
    if (selectedItems < 0) {
      alert("Please select at least one item");
      return;
    }

    try {
      const result = await axios.post(
        `${API_URL}/api/users`,
        {
          username,
          password,
          preference: selectedItems.join(","),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSelectedItems([]);

      if (result.status === 200) {
        alert("Register account successfully!");
        const currentId = result.data[0].id;
        navigate("/homePage", { state: { currentId } });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Accordion allowZeroExpanded>
      {/* Allergy Section */}
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            <img className="menu__icon" src={plusIcon} alt="Expand" />
            Food Allergy
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className="menuWrap">
            {allergy.map((item) => (
              <div
                key={item.id}
                className={`menu__item ${
                  isSelected(item.id) ? "menu__selected" : ""
                }`}
                data-value={item.id}
                onClick={toggleSelection}
              >
                <img
                  src={iconAllergy[item.type]}
                  alt={item.type}
                  className={`icon__img ${
                    isSelected(item.id) ? "selected__img" : ""
                  }`}
                />
                {item.type}
              </div>
            ))}
          </div>
        </AccordionItemPanel>
      </AccordionItem>

      {/* Food Preference Section */}
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            <img className="menu__icon" src={plusIcon} alt="Expand" />
            Food Preference
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className="menuWrap">
            {preference.map((item) => (
              <div
                key={item.id}
                className={`menu__item ${
                  isSelected(item.id) ? "menu__selected" : ""
                }`}
                data-value={item.id}
                onClick={toggleSelection}
              >
                <img
                  src={iconAllergy[item.type]}
                  alt={item.type}
                  className={`icon__img ${
                    isSelected(item.id) ? "selected__img" : ""
                  }`}
                />
                {item.type}
              </div>
            ))}
          </div>
          <div className="menu__footer">
            <button className="menu__button" onClick={handleConfirm}>
              Continue
            </button>
          </div>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default IngredientsSetting;
