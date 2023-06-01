import React from "react";
// import { api } from "../utilits/Api";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-area">
          <img
            src={currentUser.avatar}
            className="profile__avatar"
            alt="Аватар профиля"
          />
          <button
            className="profile__avatar-edit"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">

          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button
            className="button profile__button profile__button_type_edit"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="button profile__button profile__button_type_add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
      {cards.map((card) => (
            <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
          ))}
      </section>
    </main>
  );
}

export default Main;
