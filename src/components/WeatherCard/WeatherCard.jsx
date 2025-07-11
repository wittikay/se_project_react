import "./WeatherCard.css";

const WeatherCard = ({ weatherData }) => {
  // Get the background image for the weather condition
  const backgroundImage = weatherData?.condition?.backgroundImage;

  // Create CSS custom properties for dynamic background
  const cardStyle = backgroundImage
    ? {
        "--weather-bg-image": `url(${backgroundImage})`,
      }
    : {};

  return (
    <section className="weather-card" style={cardStyle}>
      <p className="weather-card__temp">{weatherData?.temp}°F</p>
    </section>
  );
};

export default WeatherCard;
