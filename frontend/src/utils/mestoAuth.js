import { apiConfig } from "./constants";
const { baseUrl } = apiConfig;

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

export const register = (password, email) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({ password, email })
  })
    .then(checkResponse)
};

export const authorization = (password, email) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({ password, email }),
    credentials: 'include',
  })
    .then(checkResponse)
};

export const checkToken = () => {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      "Content-Type": 'application/json',
    },
    credentials: 'include',
  })
    .then(checkResponse)
};

export const signOut = () => {
  return fetch(`${baseUrl}/signout`, {
    headers: {
      "Content-Type": 'application/json',
    },
    credentials: 'include',
  })
    .then(checkResponse);
};
