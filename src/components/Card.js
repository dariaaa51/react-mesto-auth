import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonVisability = {
    visibility: isOwn ? "visible" : "hidden",
  };

  const isLiked = card.likes.some((like) => like._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_clicked" : ""
  }`;

  return (
    <li className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__picture"
        onClick={handleClick}
      />
      <button
        type="button"
        className="element__button-delete"
        name="trash"
        style={cardDeleteButtonVisability}
        onClick={handleDeleteClick}
      />
      <h2 className="element__title">{card.name}</h2>
      <div className="element__group">
        <button
          type="button"
          className={cardLikeButtonClassName}
          name="like"
          onClick={handleLikeClick}
        />
        <p className="element__count">{card.likes.length}</p>
      </div>
    </li>
  );
}

export default Card;
