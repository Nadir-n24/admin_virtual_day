import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/ru/api_console/profile/login/';

const login = (values, actions) => {
  return axios({
    method: 'POST',
    url: API_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    data: values
  })
    .then(response => {
      actions.setSubmitting(false);
      actions.resetForm();
      handleServerResponse(true, 'Logged In tochno, no esli vidish to ploho, ibo ti dolzhen byt na /app/dashboard!');
      console.log(JSON.stringify(response.data));
      localStorage.setItem('token', JSON.stringify(response.data.data.token));
      sessionStorage.setItem('token', JSON.stringify(response.data.data.token));
      console.log(values);
      navigate('/app/dashboard', { replace: true });
    })
    .catch(error => {
      actions.setSubmitting(false);
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
