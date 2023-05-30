function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup__image-box ${
        card.name ? "popup_opened" : ""
      }`}
    >
      <figure className="popup__figure">
      <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__image"
          src={card.link}
          alt={card.name}
        />
        <figcaption className="popup__image-caption">
          {card.name}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
