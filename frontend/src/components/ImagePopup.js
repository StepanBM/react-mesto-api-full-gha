import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_black ${card.name ? "popup_opened" : ""}`}>
      <figure className="popup__images">
        <button
          className="popup__cancel"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img className="popup__photos" src={card.link} alt={card.name} />
        <figcaption className="popup__signature">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
