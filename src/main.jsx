import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App.jsx";
import { useState, useEffect } from "react";
import { getClothingItems } from "./utils/api";
import avatarImage from "./images/Ellipse 18.png";

function RootRouter() {
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "Terrence Tegegne",
    avatar: avatarImage,
  });

  useEffect(() => {
    getClothingItems()
      .then((items) => setClothingItems(items))
      .catch(() => setClothingItems([]));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App clothingItems={clothingItems} setClothingItems={setClothingItems} currentUser={currentUser} setCurrentUser={setCurrentUser} />,
    },
    {
      path: "/profile",
      element: <App clothingItems={clothingItems} setClothingItems={setClothingItems} currentUser={currentUser} setCurrentUser={setCurrentUser} />,
    },
    {
      path: "*",
      element: <App clothingItems={clothingItems} setClothingItems={setClothingItems} currentUser={currentUser} setCurrentUser={setCurrentUser} />,
    },
  ], {
    basename: "/se_project_react",
    future: {
      v7_startTransition: true,
    },
  });

  return <RouterProvider router={router} />;
}

import ReactDOM from "react-dom/client";
ReactDOM.createRoot(document.getElementById("root")).render(<RootRouter />);
