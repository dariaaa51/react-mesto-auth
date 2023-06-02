import { useEffect } from "react";

const PopupClose = (isOpen, closePopup) => {
  useEffect(() => {
    if (!isOpen) return; 
  }, [isOpen, closePopup]);
};

export default PopupClose;
