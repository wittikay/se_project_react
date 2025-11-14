import "./ItemCard.css";
import { useState } from "react";
import fallbackImage from "../../images/T-Shirt.png";

const ItemCard = ({ item, onCardClick }) => {
  const [src, setSrc] = useState(item.imageUrl || fallbackImage);

  const handleCardClick = () => {
    onCardClick && onCardClick(item);
  };
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={src}
        onError={() => setSrc(fallbackImage)}
        loading="lazy"
        alt={item.name}
      />
    </li>
  );
};

export default ItemCard;
