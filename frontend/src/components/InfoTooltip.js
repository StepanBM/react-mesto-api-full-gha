import React from "react";

function InfoTooltip({ isOpen, onCloseClick, image, title, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={onCloseClick}>
      <div className="popup__answer">
        <img className="popup__status" src={image} alt={title} />
        <h2 className="popup__inscription">{title}</h2>
        <button
          className="popup__cancel"
          type="button"
          title="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
