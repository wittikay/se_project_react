import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ activeModal, onClose, onAddItem }) => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const [errors, setErrors] = useState({
    imageUrl: false,
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

    if (name === "imageUrl") {
      setErrors((prev) => ({
        ...prev,
        imageUrl: value.trim() !== "" && !isValidImageUrl(value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onAddItem({
        name: formData.name,
        imageUrl: formData.imageUrl,
        weather: formData.weather,
      });
      onClose();
    }
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.imageUrl.trim() !== "" &&
    isValidImageUrl(formData.imageUrl) &&
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
        htmlFor="imageUrl"
        className={`modal__label ${errors.imageUrl ? "modal__label_error" : ""}`}
      >
        Image*{" "}
        {errors.imageUrl && (
          <span className="modal__error-text">
            (This is not a valid image link)
          </span>
        )}
      </label>
      <input
        type="url"
        className={`modal__input ${errors.imageUrl ? "modal__input_error" : ""}`}
        id="imageUrl"
        name="imageUrl"
        placeholder="Image URL"
        value={formData.imageUrl}
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
