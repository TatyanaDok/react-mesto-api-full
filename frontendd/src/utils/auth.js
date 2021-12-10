class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  register({ email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: "include",
    }).then(this._checkResponse);
  }
  signout() {
    return fetch(`${this._baseUrl}/signout`, {
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}
const auth = new Auth({
  baseUrl: "https://api.yanadok.students.nomoredomains.rocks",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default auth;
