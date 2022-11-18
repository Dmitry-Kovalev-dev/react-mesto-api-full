import { apiConfig } from "./constants";
const { baseUrl } = apiConfig;

const headers = {
  "Content-Type": 'application/json',
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.json());
};

export const register = (password, email) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ password, email })
  })
    .then(checkResponse)
};

export const authorization = (password, email) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ password, email }),
    credentials: 'include',
  })
    .then(checkResponse)
};

export const checkToken = () => {
  return fetch(`${baseUrl}/users/me`, {
    headers: headers,
    credentials: 'include',
  })
    .then(checkResponse)
};

export const signOut = () => {
  return fetch(`${baseUrl}/signout`, {
    headers: headers,
    credentials: 'include',
  })
    .then(checkResponse);
};
