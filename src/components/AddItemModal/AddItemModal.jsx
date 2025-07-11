import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ activeModal, onClose, onAddItem }) => {
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    weather: "",
  });

  const [errors, setErrors] = useState({
    link: false,
  });

  const isValidImageUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url);
    } catch {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "link") {
      setErrors((prev) => ({
        ...prev,
        link: value.trim() !== "" && !isValidImageUrl(value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onAddItem({
        name: formData.name,
        link: formData.link,
        weather: formData.weather,
      });
      onClose();
    }
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.link.trim() !== "" &&
    isValidImageUrl(formData.link) &&
    formData.weather !== "";

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      name="add-garment"
      isOpen={activeModal === "add-garment"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
      </label>
      <input
        type="text"
        className="modal__input"
        id="name"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />

      <label
        htmlFor="link"
        className={`modal__label ${errors.link ? "modal__label_error" : ""}`}
      >
        Image*{" "}
        {errors.link && (
          <span className="modal__error-text">
            (This is not a valid image link)
          </span>
        )}
      </label>
      <input
        type="url"
        className={`modal__input ${errors.link ? "modal__input_error" : ""}`}
        id="link"
        name="link"
        placeholder="Image URL"
        value={formData.link}
        onChange={handleInputChange}
        required
      />

      <label className="modal__label">Select the weather type:</label>
      <div className="modal__radio-buttons">
        <label htmlFor="hot" className="modal__radio-label">
          <input
            id="hot"
            type="radio"
            name="weather"
            value="hot"
            className="modal__radio-input"
            checked={formData.weather === "hot"}
            onChange={handleInputChange}
            required
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__radio-label">
          <input
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            className="modal__radio-input"
            checked={formData.weather === "warm"}
            onChange={handleInputChange}
            required
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__radio-label">
          <input
            id="cold"
            type="radio"
            name="weather"
            value="cold"
            className="modal__radio-input"
            checked={formData.weather === "cold"}
            onChange={handleInputChange}
            required
          />
          Cold
        </label>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
