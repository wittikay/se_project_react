import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ clothingItems, onCardClick, onDeleteItem, onAddClick }) => (
  <section className="clothes-section">
    <div className="clothes-section__header">
      <h2 className="clothes-section__title">Your items</h2>
      <button type="button" className="clothes-section__add-new" onClick={onAddClick}>
        + Add new
      </button>
    </div>
    <ul className="clothes-section__list clothes-section__list--grid">
      {clothingItems.map((item) => (
        <ItemCard key={item._id} item={item} onCardClick={onCardClick} onDeleteItem={onDeleteItem} />
      ))}
    </ul>
  </section>
);

export default ClothesSection;
