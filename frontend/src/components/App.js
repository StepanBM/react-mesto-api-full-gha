import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { CurrentCardContext } from "../contexts/CurrentCardContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import api from "../utils/Api.js";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

import * as auth from "../utils/auth";

import approved from "../images/Approved.png";
import wrong from "../images/Wrong.png";

function App() {
  const navigate = useNavigate();
  //Изначальное состояние попапа Аватар
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  //Изначальное состояние попапа Редактирования профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  //Изначальное состояние попапа Добавления новой карточки
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  //Изначальное состояние попапа открытие (увеличение) карточки
  const [selectedCard, setSelectedCard] = React.useState({});
  //Изначальное состояние попапа Удаление карточки
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  //Данные пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  //Данные карточек
  const [currentCards, setCurrentCards] = React.useState([]);
  //Данные карточки для удаления
  const [currentDeleteCard, setCurrentDeleteCard] = React.useState({});
  //Изначальное состояние надписи кнопки попапа Аватар
  const [isTextAvatarPopupBtn, setTextAvatarPopupBtn] = React.useState("Сохранить");
  //Изначальное состояние надписи кнопки попапа Редактирования профиля
  const [isTextProfilePopupBtn, setTextProfilePopupBtn] = React.useState("Сохранить");
  //Изначальное состояние надписи кнопки попапа Добавления новой карточки
  const [isTextCardPopupBtn, setTextCardPopupBtn] = React.useState("Создать");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isEmail, setEmail] = React.useState("");
  const [popupImage, setPopupImage] = React.useState("");
  const [popupAnswer, setPopupAnswer] = React.useState("");
  const [infoTooltip, setInfoTooltip] = React.useState(false);

  function onRegister(email, password) {
    auth
      .registerNewUser(email, password)
      .then(() => {
        setPopupImage(approved);
        setPopupAnswer("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch(() => {
        setPopupImage(wrong);
        setPopupAnswer("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  }

  function onLogin(email, password) {
    auth
      .loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmail(email);
        navigate("/");
      })
      .catch(() => {
        setPopupImage(wrong);
        setPopupAnswer("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkValidityToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmail(res.email);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function onSignOut() {
    setIsLoggedIn(false);
    setEmail("");
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  //Функция открытия попапа Аватар
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //Функция открытия попапа Редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //Функция открытия попапа Добавления новой карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //Функция открытия (увеличения) картинки
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  //Функция открытия попапа Удаление карточки
  function handleDeleteCardClick(card) {
    setDeleteCardPopupOpen(true);
    setCurrentDeleteCard(card);
  }

  //Закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setDeleteCardPopupOpen(false);
    setInfoTooltip(false);
  }

  React.useEffect(() => {
    if (isLoggedIn === true) {
      api
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.error(err);
        });
      api
        .getInitialCards()
        .then((card) => {
          setCurrentCards(card);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return;
  }, [isLoggedIn]);

  function handleCardDelete(cards) {
    api
      .removeCard(cards._id)
      .then(() => {
        setCurrentCards(currentCards.filter((element) => element._id !== cards._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateCard(data) {
    setTextCardPopupBtn("Создание...");
    api
      .addNewCard(data)
      .then((newCard) => {
        setCurrentCards([newCard, ...currentCards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTextCardPopupBtn("Создать");
      });
  }

  function handleUpdateUser(data) {
    setTextProfilePopupBtn("Сохранение...");
    api
      .changeUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTextProfilePopupBtn("Сохранить");
      });
  }

  function handleUpdateAvatar(data) {
    setTextAvatarPopupBtn("Сохранение...");
    api
      .changeProfileAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTextAvatarPopupBtn("Сохранить");
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (isLiked === false) {
      //Отправляем запрос в API и получаем обновлённые данные карточки
      api
        .addCardLike(card._id)
        .then((newCard) => {
          setCurrentCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //Отправляем запрос в API и получаем обновлённые данные карточки
      api
        .deleteCardLike(card._id)
        .then((newCard) => {
          setCurrentCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //Закрытие всех попапов по Escape
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentCardContext.Provider value={currentCards}>
          <Routes>
            <Route
              path="/sign-in"
              element={
                <>
                  <Header title="Регистрация" way="/sign-up" />
                  <Login onLogin={onLogin} />
                </>
              }
            />

            <Route
              path="/sign-up"
              element={
                <>
                  <Header title="Войти" way="/sign-in" />
                  <Register onRegister={onRegister} />
                </>
              }
            />

            <Route
              path="/"
              element={
                <>
                  <Header title="Выйти" mail={isEmail} onClick={onSignOut} way="" />
                  <ProtectedRouteElement
                    element={Main}
                    //Передача функций открытия попапов
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={currentCards}
                    onBasketCard={handleDeleteCardClick}
                    onCardLike={handleCardLike}
                    isLogged={isLoggedIn}
                  />
                </>
              }
            />

            <Route path="#" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />} />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onTextBtn={isTextProfilePopupBtn}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCard={handleUpdateCard}
            onTextBtn={isTextCardPopupBtn}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onTextBtn={isTextAvatarPopupBtn}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            cardObj={currentDeleteCard}
          ></DeleteCardPopup>

          <InfoTooltip
            title={popupAnswer}
            image={popupImage}
            isOpen={infoTooltip}
            onClose={closeAllPopups}
          />
        </CurrentCardContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
