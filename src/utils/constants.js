// This file should only hold small constants. Weather helpers live in weatherApi.js
// Weather API configuration
export const apiKey = "57f6e9990c6fc7042488d3d0dd41c1c3";

// Default coordinates (New York City)
export const coordinates = {
  latitude: 40.7128,
  longitude: -74.006,
};

// Import clothing item images
import TShirtImage from "../images/T-Shirt.png";
import ShortsImage from "../images/Shorts.png";
import CapImage from "../images/Cap.png";
import SneakersImage from "../images/Sneakers.png";

// Map db.json string paths to bundled assets so UI can render local images
export const clothingImageMap = {
  "images/T-Shirt.png": TShirtImage,
  "images/Shorts.png": ShortsImage,
  "images/Cap.png": CapImage,
  "images/Sneakers.png": SneakersImage,
};

// Default clothing items data
export const defaultClothingItems = [
  {
    _id: 0,
    name: "T-Shirt",
    weather: "hot",
    imageUrl: TShirtImage,
  },
  {
    _id: 1,
    name: "Shorts",
    weather: "hot",
    imageUrl: ShortsImage,
  },
  {
    _id: 2,
    name: "Cap",
    weather: "hot",
    imageUrl: CapImage,
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "hot",
    imageUrl: SneakersImage,
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "warm",
    imageUrl: TShirtImage,
  },
  {
    _id: 5,
    name: "Shorts",
    weather: "warm",
    imageUrl: ShortsImage,
  },
  {
    _id: 6,
    name: "Cap",
    weather: "warm",
    imageUrl: CapImage,
  },
  {
    _id: 7,
    name: "Sneakers",
    weather: "warm",
    imageUrl: SneakersImage,
  },
  {
    _id: 8,
    name: "T-Shirt",
    weather: "cold",
    imageUrl: TShirtImage,
  },
  {
    _id: 9,
    name: "Shorts",
    weather: "cold",
    imageUrl: ShortsImage,
  },
  {
    _id: 10,
    name: "Cap",
    weather: "cold",
    imageUrl: CapImage,
  },
  {
    _id: 11,
    name: "Sneakers",
    weather: "cold",
    imageUrl: SneakersImage,
  },
];
