import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditFrofilePopup = ({ isOpen, onUpdateUser, onClose }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleSumbit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  }

  const handleChangeAbout = (evt) => {
    setDescription(evt.target.value);
  }

  return (
    <PopupWithForm
      name="edit-profle"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSumbit}
    >
      <input
        id="popupNameInput"
        className="popup__text popup__text_type_name"
        name="name"
        type="text"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleChangeName}
        required
      />
      <span id="popupNameInput-error" className="popup__input-error" />
      <input
        id="popupJobInput"
        className="popup__text popup__text_type_about"
        name="about"
        type="text"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleChangeAbout}
        required
      />
      <span
        id="popupJobInput-error"
        className="popup__input-error"
      />
    </PopupWithForm>
  );
}

export default EditFrofilePopup;