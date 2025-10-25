import { useEffect } from "react";
import "./ItemModal.css";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`modal modal_type_confirm ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content modal__content_type_confirm">
        <button className="modal__close modal__close_confirm" type="button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h3 className="modal__title_confirm">Are you sure you want to delete this item?</h3>
        <p className="modal__subtitle_confirm">This action is irreversible.</p>
        <div className="modal__actions_confirm">
          <button className="modal__btn modal__btn_confirm" onClick={onConfirm}>
            Yes, delete item
          </button>
          <button className="modal__btn modal__btn_cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;