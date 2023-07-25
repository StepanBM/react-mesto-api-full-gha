import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onUpdateCard, onTextBtn }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateCard({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      textBatton={onTextBtn}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="text"
        name="name"
        placeholder="Название"
        id="title"
        required
        onChange={handleChangeName}
        value={name}
      />
      <span className="popup__input-error"></span>
      <input
        className="popup__input"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        id="link"
        required
        onChange={handleChangeLink}
        value={link}
      />
      <span className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
