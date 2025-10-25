import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const AddItemModal = ({ activeModal, onClose, onAddItem }) => {
  const { values, errors, isValid, handleChange, resetForm, setErrors, setIsValid } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  // Reset form when modal closes
  useEffect(() => {
    if (activeModal !== "add-garment") {
      resetForm({ name: "", imageUrl: "", weather: "" }, {}, false);
    }
  }, [activeModal, resetForm]);

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
    handleChange(e);
    if (e.target.name === "imageUrl") {
      setErrors((prev) => ({ ...prev, imageUrl: e.target.value.trim() !== "" && !isValidImageUrl(e.target.value) }));
      // rely on native validity plus our custom image check
      setIsValid(e.target.closest("form").checkValidity() && isValidImageUrl(e.target.value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onAddItem({ name: values.name, imageUrl: values.imageUrl, weather: values.weather });
      // Don't reset or close here - let the parent handle it after API success
    }
  };

  const isFormValid =
    values.name.trim() !== "" &&
    values.imageUrl.trim() !== "" &&
    isValidImageUrl(values.imageUrl) &&
    values.weather !== "" &&
    isValid;

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
        value={values.name}
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
        value={values.imageUrl}
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
            checked={values.weather === "hot"}
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
            checked={values.weather === "warm"}
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
            checked={values.weather === "cold"}
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
