import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onCardDelete, cardObj }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete(cardObj);
  }

  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      textBatton="Да"
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
