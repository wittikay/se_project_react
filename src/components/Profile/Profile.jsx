import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "./Profile.css";

const Profile = ({ clothingItems, currentUser, onCardClick, onDeleteItem, onAddClick }) => (
  <div className="profile">
    <SideBar currentUser={currentUser} />
    <ClothesSection clothingItems={clothingItems} onCardClick={onCardClick} onDeleteItem={onDeleteItem} onAddClick={onAddClick} />
  </div>
);

export default Profile;
