import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ItemModal from "./ItemModal/ItemModal";
import AddItemModal from "./AddItemModal/AddItemModal";
import Profile from "./Profile/Profile";
import { getForecastWeather } from "../utils/weatherApi";
import { defaultClothingItems } from "../utils/constants";
import { CurrentTemperatureUnitProvider } from "../contexts/CurrentTemperatureUnit";
import { getClothingItems, addClothingItem } from "../utils/api";
import avatarImage from "../images/Ellipse 18.png";

const defaultWeatherData = {
  temp: {
    F: 75,
    C: Math.round((75 - 32) * 5 / 9),
  },
  type: "warm",
  city: "New York",
  condition: {
    main: "Clear",
    description: "clear sky",
    backgroundImage: null,
  },
};

function App({ clothingItems: clothingItemsProp, currentUser: currentUserProp }) {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState(defaultWeatherData);
  const [clothingItems, setClothingItems] = useState(clothingItemsProp || []);
  const [currentUser] = useState(
    currentUserProp || { name: "Terrence Tegegne", avatar: avatarImage }
  );
  const location = useLocation();

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeatherData(defaultWeatherData);
      });

    if (!clothingItemsProp || clothingItemsProp.length === 0) {
      getClothingItems()
        .then((items) => {
          setClothingItems(items);
        })
        .catch((err) => {
          console.error("Error fetching clothing items:", err);
          setClothingItems(defaultClothingItems);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Array.isArray(clothingItemsProp)) {
      setClothingItems(clothingItemsProp);
    }
  }, [clothingItemsProp]);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleAddItem = (item) => {
    addClothingItem(item)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding clothing item:", err);
        alert(`Failed to add item: ${err.message}`);
      });
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteItem = (id) => {
    setClothingItems((prev) => prev.filter((item) => {
      const itemId = item.id || String(item._id);
      return itemId !== String(id);
    }));
  };

  return (
    <CurrentTemperatureUnitProvider>
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            handleProfileClick={handleProfileClick}
            weatherData={weatherData}
            currentUser={currentUser}
          />
          {location.pathname === "/profile" ? (
            <Profile
              clothingItems={clothingItems}
              currentUser={currentUser}
              onCardClick={handleCardClick}
              onDeleteItem={handleDeleteItem}
              onAddClick={handleAddClick}
            />
          ) : (
            <Main
              weatherData={weatherData}
              clothingItems={clothingItems}
              onCardClick={handleCardClick}
            />
          )}
        </div>

        {/* Footer sits directly under the flex column parent so it anchors at the bottom */}
        <Footer />

        {/* Modals */}
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDelete={handleDeleteItem}
        />

        <AddItemModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          onAddItem={handleAddItem}
        />
      </div>
    </CurrentTemperatureUnitProvider>
  );
}

export default App;
