import { useEffect } from "react";
import "./ModalWithForm.css";
import mobileOverlayCloseIcon from "../../images/mobileoverlayx.svg";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  name,
  isFormValid = true,
}) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""} modal_type_${name}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose}>
          <img
            src={mobileOverlayCloseIcon}
            alt="Close modal"
            className="modal__close-icon"
          />
        </button>
        <form className="modal__form" onSubmit={handleSubmit} name={name}>
          {children}
          <button
            className="modal__submit"
            type="submit"
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
