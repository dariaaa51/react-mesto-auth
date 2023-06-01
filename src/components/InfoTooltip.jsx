import React from "react";
import ok from "../images/ok-auth.svg";
import error from "../images/decline-auth.svg";
import usePopupClose from "../hooks/usePopupClose";

const InfoTooltip = ({isOpen, onClose, isRegister, alt }) => {
  usePopupClose(isOpen, onClose);

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
          className="popup__auth-image"
          src={isRegister.status ? ok : error}
          alt={alt}
        />
        <h3 className="popup__title popup__title_auth">
          {isRegister.message}
        </h3>
      </div>
    </div>
  );
};

export default InfoTooltip;