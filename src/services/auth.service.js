import axios from 'axios';

const API_URL = 'http://37.18.30.203/ru/api_console/profile/login/';

const login = (username, password) => {
  return axios
    .post(API_URL + 'signin', {
      username,
      password
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('token', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('token');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  login,
  logout,
  getCurrentUser,
};
