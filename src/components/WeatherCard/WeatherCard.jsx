import "./WeatherCard.css";

const WeatherCard = ({ weatherData }) => {
  // Get the background image for the weather condition
  const backgroundImage = weatherData?.condition?.backgroundImage;

  // Create inline style for background image
  const cardStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <section className="weather-card" style={cardStyle}>
      <p className="weather-card__temp">{weatherData?.temp}°F</p>
    </section>
  );
};

export default WeatherCard;
