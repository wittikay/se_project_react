
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnit";
import ItemCard from "../ItemCard/ItemCard";

const Main = ({ weatherData, clothingItems, onCardClick }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const rawTemp = weatherData?.temp;
  const displayTemp =
    rawTemp && typeof rawTemp === "object"
      ? rawTemp[currentTemperatureUnit]
      : rawTemp;
  return (
    <main className="main">
      <div className="main__container">
        <p className="main__date-location">
          {currentDate}, {weatherData?.city || "New York"}
        </p>

        <WeatherCard weatherData={weatherData} />

        <section className="cards">
          <p className="cards__text">
            Today is {displayTemp}{displayTemp !== undefined ? `°${currentTemperatureUnit}` : ""} / You may want to wear:
          </p>
          {(() => {
            const type = weatherData?.type;
            const filtered = type ? clothingItems.filter((item) => item.weather === type) : clothingItems;
            if (filtered.length === 0) {
              return (
                <div className="cards__empty">
                  <p className="cards__empty-text">
                    No items for “{weatherData?.type ?? "current"}” weather yet. Try adding a garment for this condition.
                  </p>
                </div>
              );
            }
            return (
              <ul className="cards__list">
                {filtered.map((item) => (
                  <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
                ))}
              </ul>
            );
          })()}
        </section>
      </div>
    </main>
  );
};

export default Main;
