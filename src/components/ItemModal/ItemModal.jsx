import "./ItemModal.css";
import mobileOverlayCloseIcon from "../../images/mobileoverlayx.svg";
import desktopCloseIcon from "../../images/closebtnwhite.svg";

const ItemModal = ({ activeModal, card, onClose }) => {
  return (
    <div
      className={`modal modal_type_preview ${activeModal === "preview" ? "modal_opened" : ""}`}
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
        <img src={card?.link} alt={card?.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card?.name}</h2>
          <p className="modal__weather">Weather: {card?.weather}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
