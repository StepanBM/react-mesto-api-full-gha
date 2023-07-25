import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onBasketCard,
  cards,
  onCardLike,
}) {
  const currentUserObj = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__contact">
          <img className="profile__avatar" alt="Аватар" src={currentUserObj.avatar} />
          <button className="profile__button" onClick={onEditAvatar}></button>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name">{currentUserObj.name}</h1>
              <button
                className="profile__button-edit"
                type="button"
                aria-label="Редактирование профиля"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__profession">{currentUserObj.about}</p>
          </div>
        </div>
        <button
          className="profile__button-add"
          type="button"
          aria-label="Добавление изображений"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((item) => {
          return (
            <Card
              key={item._id}
              card={item}
              onCardClick={onCardClick}
              onBasketCard={onBasketCard}
              onCardLike={onCardLike}
            ></Card>
          );
        })}
      </section>
    </main>
  );
}

export default Main;
