import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const ProfileModal = ({
  activeModal,
  onClose,
  onUpdateProfile,
  currentUser,
}) => {
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  });

  const [errors, setErrors] = useState({
    avatar: false,
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

    if (name === "avatar") {
      setErrors((prev) => ({
        ...prev,
        avatar: value.trim() !== "" && !isValidImageUrl(value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onUpdateProfile(formData);
      onClose();
    }
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    (!formData.avatar.trim() || isValidImageUrl(formData.avatar));

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      name="edit-profile"
      isOpen={activeModal === "edit-profile"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="profileName" className="modal__label">
        Name*
      </label>
      <input
        type="text"
        className="modal__input"
        id="profileName"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />

      <label
        htmlFor="profileAvatar"
        className={`modal__label ${errors.avatar ? "modal__label_error" : ""}`}
      >
        Avatar{" "}
        {errors.avatar && (
          <span className="modal__error-text">
            (This is not a valid image link)
          </span>
        )}
      </label>
      <input
        type="url"
        className={`modal__input ${errors.avatar ? "modal__input_error" : ""}`}
        id="profileAvatar"
        name="avatar"
        placeholder="Avatar URL"
        value={formData.avatar}
        onChange={handleInputChange}
      />
    </ModalWithForm>
  );
};

export default ProfileModal;
