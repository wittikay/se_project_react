import "./ItemCard.css";
import { clothingImageMap } from "../../utils/constants";

const ItemCard = ({ item, onCardClick }) => {
  const handleCardClick = () => {
    onCardClick && onCardClick(item);
  };
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={clothingImageMap[item.imageUrl] || item.imageUrl}
        alt={item.name}
      />
    </li>
  );
};

export default ItemCard;
