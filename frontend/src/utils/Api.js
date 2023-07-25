class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._url + `/users/me`, {
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${localStorage.getItem("jwt")}`
      },
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(this._url + "/cards", {
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${localStorage.getItem("jwt")}`
      },
    }).then(this._checkResponse);
  }

  changeUserInfo(data) {
    return fetch(this._url + `/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  addNewCard(data) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  removeCard(cardId) {
    return fetch(this._url + `/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${localStorage.getItem("jwt")}`
      },
    }).then(this._checkResponse);
  }

  changeProfileAvatar(data) {
    return fetch(this._url + `/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
        about: data.information,
      }),
    }).then(this._checkResponse);
  }

  addCardLike(cardId) {
    return fetch(this._url + `/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${localStorage.getItem("jwt")}`
      },
    }).then(this._checkResponse);
  }

  deleteCardLike(cardId) {
    return fetch(this._url + `/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        'Authorization' : `Bearer ${localStorage.getItem("jwt")}`
      },
    }).then(this._checkResponse);
  }
}

//Подключение API
const api = new Api({
  url: "https://api.mestostepan.nomoredomains.xyz",
  headers: {
   // authorization: "7bb725b6-9812-4e2e-8c19-020be604de1f",
    "Content-Type": "application/json",
  },
});

export default api;
