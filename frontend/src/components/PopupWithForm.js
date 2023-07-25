import React from "react";

function PopupWithForm({ name, title, textBatton, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__cancel"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <h2 className="popup__profil">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__submit" name="submit" type="submit">
            {textBatton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
