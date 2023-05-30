import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const refInput = React.useRef("");

  function handleSumbit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: refInput.current.value,
    });
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSumbit}
    >
      <input
        className="popup__text"
        name="avatar"
        id="inputAvatarPopup"
        type="url"
        ref={refInput}
        placeholder="Ссылка на картинку"
        required
      />
      <span id="inputAvatarPopup-error" className="popup__input-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
