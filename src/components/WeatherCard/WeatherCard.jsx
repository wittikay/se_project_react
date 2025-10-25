
import "./WeatherCard.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnit";


const WeatherCard = ({ weatherData }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  // Get the background image for the weather condition
  const backgroundImage = weatherData?.condition?.backgroundImage;

  // Create CSS custom properties for dynamic background
  const cardStyle = backgroundImage
    ? {
        "--weather-bg-image": `url(${backgroundImage})`,
      }
    : {};

  // Safely derive a displayable temperature regardless of data shape
  const rawTemp = weatherData?.temp;
  const displayTemp =
    rawTemp && typeof rawTemp === "object"
      ? rawTemp[currentTemperatureUnit]
      : rawTemp;

  return (
    <section className="weather-card" style={cardStyle}>
      <p className="weather-card__temp">
        {displayTemp !== undefined && displayTemp !== null ? displayTemp : ""}°
        {currentTemperatureUnit}
      </p>
    </section>
  );
};

export default WeatherCard;
