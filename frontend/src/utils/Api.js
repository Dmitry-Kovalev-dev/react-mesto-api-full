import { apiConfig } from "./constants";

class Api {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders() {
    return {
      //authorization: this._token,
      'Content-Type': 'application/json',
    }
  }

  getInitialCard() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._getHeaders(),
      credentials: 'include',
    })
      .then(this._checkResponse)
  }

  createCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ name, link }),
      credentials: 'include',
    })
      .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
      credentials: 'include',
    })
      .then(this._checkResponse)
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._getHeaders(),
      credentials: 'include',
    })
      .then(this._checkResponse)
  }

  editProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({ name, about }),
      credentials: 'include',
    })
      .then(this._checkResponse)
  }

  editAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar }),
      credentials: 'include',
    })
      .then(this._checkResponse)
  }

  setLikeStatus(id, method) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: method,
      headers: this._getHeaders(),
      credentials: 'include',
    })
      .then(this._checkResponse)
  }
};

const api = new Api(apiConfig);

export default api;