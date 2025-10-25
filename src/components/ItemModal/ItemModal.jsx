import { useState, useEffect } from "react";
import mobileOverlayCloseIcon from "../../images/mobileoverlayx.svg";
import desktopCloseIcon from "../../images/closebtnwhite.svg";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { deleteClothingItem } from "../../utils/api";
import { clothingImageMap } from "../../utils/constants";

const ItemModal = ({ activeModal, card, onClose, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (activeModal === "preview") {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    const itemId = card._id || card.id;
    deleteClothingItem(itemId)
      .then(() => {
        if (onDelete) onDelete(itemId);
        setShowConfirm(false);
        onClose();
      })
      .catch((error) => {
        console.error("Delete failed:", error);
        alert(`Failed to delete item: ${error.message}`);
        setShowConfirm(false);
      });
  };

  return (
    <>
      {!showConfirm && (
        <div
          className={`modal modal_type_preview ${activeModal === "preview" ? "modal_opened" : ""}`}
          onClick={handleOverlayClick}
        >
          <div className="modal__content modal__content_type_image">
            <button className="modal__close" type="button" onClick={onClose}>
              <img
                src={mobileOverlayCloseIcon}
                alt="Close modal"
                className="modal__close-icon modal__close-icon_mobile"
              />
              <img
                src={desktopCloseIcon}
                alt="Close modal"
                className="modal__close-icon modal__close-icon_desktop"
              />
            </button>
            <img 
              src={clothingImageMap[card?.imageUrl] || card?.imageUrl} 
              alt={card?.name} 
              className="modal__image" 
            />
            <div className="modal__footer">
              <div className="modal__footer-left">
                <h2 className="modal__caption">{card?.name}</h2>
                <p className="modal__weather">Weather: {card?.weather}</p>
              </div>
              <button className="modal__btn modal__btn_delete" onClick={handleDelete}>
                Delete item
              </button>
            </div>
          </div>
        </div>
      )}
      
      <ConfirmDeleteModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ItemModal;