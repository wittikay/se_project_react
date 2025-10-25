import { APIkey, coordinates } from "./constants";

// Import weather images
import sunnyDay from "../images/sunny day.png";
import cloudyDay from "../images/cloudy day.png";
import rainyDay from "../images/rainy day.png";
import stormyDay from "../images/stormy day.png";
import snowyDay from "../images/snowy day.png";
import foggyDay from "../images/foggy day.png";
import clearNight from "../images/clear night.png";
import cloudyNight from "../images/cloudy night.png";
import rainyNight from "../images/rainy night.png";
import stormyNight from "../images/stormy night.png";
import snowyNight from "../images/snowy night.png";
import foggyNight from "../images/foggy night.png";

// Function to get weather background image based on condition and time of day
export const getWeatherBackground = (conditionId, isDayTime) => {
  const condition = getWeatherCondition(conditionId);

  if (isDayTime) {
    switch (condition) {
      case "sunny":
        return sunnyDay;
      case "cloudy":
        return cloudyDay;
      case "rain":
        return rainyDay;
      case "storm":
        return stormyDay;
      case "snow":
        return snowyDay;
      case "fog":
        return foggyDay;
      default:
        return sunnyDay;
    }
  } else {
    switch (condition) {
      case "sunny":
        return clearNight;
      case "cloudy":
        return cloudyNight;
      case "rain":
        return rainyNight;
      case "storm":
        return stormyNight;
      case "snow":
        return snowyNight;
      case "fog":
        return foggyNight;
      default:
        return clearNight;
    }
  }
};

// Function to determine weather type based on temperature
export const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};

// Function to determine if it's day or night
export const isDay = (sunrise, sunset) => {
  const now = Date.now() / 1000; // Convert milliseconds to seconds
  return now >= sunrise && now <= sunset;
};

// Function to get weather condition type based on OpenWeather condition codes
export const getWeatherCondition = (conditionId) => {
  if (conditionId >= 200 && conditionId < 300) {
    return "storm";
  } else if (conditionId >= 300 && conditionId < 600) {
    return "rain";
  } else if (conditionId >= 600 && conditionId < 700) {
    return "snow";
  } else if (conditionId >= 700 && conditionId < 800) {
    return "fog";
  } else if (conditionId === 800) {
    return "sunny";
  } else if (conditionId > 800) {
    return "cloudy";
  }
  return "sunny"; // default
};

// Normalize OpenWeather response into the shape the UI expects
// Includes both F and C, and a background image for the WeatherCard
export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;

  const tempF = Math.round(data.main.temp);
  result.temp = {
    F: tempF,
  C: Math.round(((tempF - 32) * 5) / 9),
  };

  result.type = getWeatherType(tempF);
  result.sunrise = data.sys.sunrise;
  result.sunset = data.sys.sunset;

  const isDayTime = isDay(result.sunrise, result.sunset);

  result.condition = {
    main: data.weather[0].main,
    description: data.weather[0].description,
    backgroundImage: getWeatherBackground(data.weather[0].id, isDayTime),
    id: data.weather[0].id,
  };

  return result;
};


// Function to fetch weather data from OpenWeather API
export const getWeather = ({ latitude, longitude }, APIkey) => {
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;

  return fetch(weatherApi)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .then((data) => {
      return filterWeatherData(data);
    });
};

// Main function to get weather data using default coordinates
export const getForecastWeather = () => {
  return getWeather(coordinates, APIkey);
};
