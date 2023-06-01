import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utilits/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { getContent, authorize, register } from "../utils/auth";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });

  const [isRegister, setIsRegister] = React.useState({
    status: '',
    message: '',
  });

  const handleRegister = (evt) => {
    evt.preventDefault();
    const { password, email } = formValue;
    register(password, email)
      .then(() => {
        setFormValue({ email: '', password: '' });
        setIsOpenInfoTooltip(true);
        setIsRegister({
          status: true,
          message: "Вы успешно зарегистрировались!",
        });
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setIsOpenInfoTooltip(true);
        setIsRegister({
          status: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        console.log(`Возникла ошибка с регистрацией на сервере - ${err}`);
      });
  };

  const handleLogin = (evt) => {
    evt.preventDefault();
    const { password, email } = formValue;
    authorize(password, email)
      .then((data) => {
        setFormValue({ email: "", password: "" });
        setIsLoggedIn(true);
        setEmail(email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(`Возникла ошибка входом на сервер - ${err}`);
      });
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setEmail("");
    navigate("/sign-in", { replace: true });
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getContent(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(`Возникла ошибка с проверкой токена на сервере - ${err}`);
        });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getCardsApi()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Возникла ошибка глобальная ошибка - ${err}`);
        });
    }
  }, [isLoggedIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsOpenInfoTooltip(false);
  };

  const handleUpdateUser = (items) => {
    api
      .sendUserInfoApi(items)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка с обновлением информации пользователя - ${err}`);
      });
  };

  const handleUpdateAvatar = (item) => {
    api
      .setUserAvatar(item)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка с обновлением аватара на сервере - ${err}`);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((item) =>
            item._id === card._id ? newCard : item
          );
          setCards(newCards);
        })
        .catch((err) => {
          console.log(`Возникла ошибка с отправкой лайка на сервер - ${err}`);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((item) =>
            item._id === card._id ? newCard : item
          );
          setCards(newCards);
        })
        .catch((err) => {
          console.log(`Возникла ошибка с удалением лайка с сервера - ${err}`);
        });
    }
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(`Возникла ошибка с удалением карточки с сервера - ${err}`);
      });
  };

  const handleAddPlaceSubmit = (items) => {
    api
      .addNewCard(items)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(
          `Возникла ошибка с добавлением новой карточки на сервер - ${err}`
        );
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={signOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                handleChange={handleChange}
                onRegister={handleRegister}
                title="Регистрация"
                buttonText="Зарегиситрироватья"
                formValue={formValue}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                title="Вход"
                buttonText="Войти"
                onLogin={handleLogin}
                handleChange={handleChange}
                formValue={formValue}
              />
            }
          />
          <Route
            path="/*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
        </Routes>
        {isLoggedIn && <Footer />}
        <InfoTooltip
          isRegister={isRegister}
          isOpen={isOpenInfoTooltip}
          onClose={closeAllPopups}
          alt={"Статус"}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );

  //       <Footer />
  //       <EditProfilePopup
  //         isOpen={isEditProfilePopupOpen}
  //         onClose={closeAllPopups}
  //         onUpdateUser={handleUpdateUser}
  //       />

  //       <AddPlacePopup
  //         isOpen={isAddPlacePopupOpen}
  //         onClose={closeAllPopups}
  //         onAddPlace={handleAddPlaceSubmit}
  //       />

  //       <EditAvatarPopup
  //         isOpen={isEditAvatarPopupOpen}
  //         onClose={closeAllPopups}
  //         onUpdateAvatar={handleUpdateAvatar}
  //       />

  //       <PopupWithForm
  //         name="delete"
  //         title="Вы уверены?"
  //         buttonText="Сохранить"
  //       />
  //       <ImagePopup card={selectedCard} onClose={closeAllPopups} />
  //     </div>
  //   </CurrentUserContext.Provider>
  // );
};

export default App;
