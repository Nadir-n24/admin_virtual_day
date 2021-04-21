import axios from 'axios';

const API_URL = 'http://37.18.30.203/ru/api_console/profile/';

const login = (values) => {
  return axios
    .post(API_URL + 'login/', {
      values
    })
    .then(response => {
      if (response.data.data.token) {
        console.log(JSON.stringify(response.data));
        localStorage.setItem('token', JSON.stringify(response.data.data.token));
        sessionStorage.setItem('token', JSON.stringify(response.data.data.token));
        props.history.push('/app/account');
        window.location.reload();
      }

      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const logout = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  login,
  logout,
  getCurrentUser,
};
