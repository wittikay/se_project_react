import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

const Main = ({ weatherData, clothingItems, onCardClick }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <main className="main">
      <div className="main__container">
        <p className="main__date-location">
          {currentDate}, {weatherData?.city || "New York"}
        </p>

        <WeatherCard weatherData={weatherData} />

        <section className="cards">
          <p className="cards__text">
            Today is {weatherData?.temp}°F / You may want to wear:
          </p>
          <ul className="cards__list">
            {clothingItems
              .filter((item) => item.weather === weatherData?.type)
              .map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                />
              ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Main;
