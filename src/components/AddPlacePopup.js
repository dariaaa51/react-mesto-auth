import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

const AddPlacePopup = ({ onAddPlace, isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  const handleSumbit = (evt) => {
    evt.preventDefault();
    onAddPlace({
      name,
      link,
    });
  };

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  }

  const handleChangeLink = (evt) => {
    setLink(evt.target.value);
  };

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSumbit}
    >
      <input
        id="popupDesignationInput"
        className="popup__text popup__text_type_name"
        name="name"
        value={name}
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        onChange={handleChangeName}
        required
      />
      <span id="popupDesignationInput-error" className="popup__input-error" />
      <input
        id="popupPlaceInput"
        className="popup__text popup__text_type_about"
        type="url"
        name="link"
        value={link}
        placeholder="Ссылка на картинку"
        onChange={handleChangeLink}
        required
      />
      <span id="popupPlaceInput-error" className="popup__input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
