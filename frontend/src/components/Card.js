import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onBasketCard, onCardLike }) {
  //функция для открытия (увеличения) карточки
  function handleClick() {
    onCardClick(card);
  }

  //Функция для открытия попапа для удаления карточки
  function handleBasketClick() {
    onBasketCard(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  //Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__button ${
    isLiked && "element__button_active"
  }`;

  return (
    <article className="element">
      {isOwn && (
        <button
          className="element__button-cancel"
          type="button"
          aria-label="Удалить"
          onClick={handleBasketClick}
        ></button>
      )}
      <img
        className="element__item"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="element__counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
