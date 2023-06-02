import React from "react";
import good from "../images/good.svg";
import bad from "../images/bad.svg";
import PopupClose from "./PopupClose";

const InfoTooltip = ({isOpen, onClose, isRegister, alt }) => {
  PopupClose(isOpen, onClose);

  return (
    <div
      className={`popup popup__auth-res ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__tool-image"
          src={isRegister.status ? good : bad}
          alt={alt}
        />
        <h3 className="popup__title popup__tool-title">
          {isRegister.message}
        </h3>
      </div>
    </div>
  );
};

export default InfoTooltip;