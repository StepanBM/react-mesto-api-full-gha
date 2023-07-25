import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onTextBtn }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profil"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      textBatton={onTextBtn}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="text"
        name="name"
        placeholder="Имя"
        id="firstname"
        required
        onChange={handleChangeName}
        value={name || ""}
      />
      <span className="popup__input-error"></span>
      <input
        className="popup__input"
        type="text"
        name="about"
        placeholder="Профессия"
        id="information"
        required
        onChange={handleChangeDescription}
        value={description || ""}
      />
      <span className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
