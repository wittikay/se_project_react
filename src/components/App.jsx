import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ItemModal from "./ItemModal/ItemModal";
import AddItemModal from "./AddItemModal/AddItemModal";
import ProfileModal from "./ProfileModal/ProfileModal";
import { getForecastWeather } from "../utils/weatherApi";
import { defaultClothingItems } from "../utils/constants";

const defaultWeatherData = {
  temp: 75,
  type: "warm",
  city: "New York",
  condition: {
    main: "Clear",
    description: "clear sky",
    backgroundImage: null,
  },
};

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState(defaultWeatherData);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentUser, setCurrentUser] = useState({
    name: "Terrence Tegegne",
    avatar: null,
  });

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeatherData(defaultWeatherData);
      });
  }, []);

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

  const handleUpdateProfile = (userData) => {
    setCurrentUser(userData);
  };

  const handleAddItem = (item) => {
    const newItem = {
      ...item,
      _id: Date.now().toString(),
    };
    setClothingItems([newItem, ...clothingItems]);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleAddClick={handleAddClick}
          handleProfileClick={handleProfileClick}
          weatherData={weatherData}
          currentUser={currentUser}
        />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>

      {/* Modals */}
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />

      <AddItemModal
        activeModal={activeModal}
        onClose={closeActiveModal}
        onAddItem={handleAddItem}
      />

      <ProfileModal
        activeModal={activeModal}
        onClose={closeActiveModal}
        onUpdateProfile={handleUpdateProfile}
        currentUser={currentUser}
      />
    </div>
  );
}

export default App;
