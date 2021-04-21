import axios from 'axios';

// axios.defaults.baseURL = 'http://178.170.221.205:8000/ru';
axios.defaults.baseURL = 'http://37.18.30.203/ru';
export default class consoleService {
  _apiConsole = '/api_console';

  _withToken = axios.create({
    'Content-Type': 'multipart/form-data',
    headers: {
      common: {
        Authorization: `JWT ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
      }
    }
  });

  login = async (data) => await axios.post(`${this._apiConsole}/manage/login/`, data);

  clearTokenAndRedirect = () => {
    let loginPage = '/login';
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.href = loginPage;
  }

  updateToken = () => {
    this._withToken = axios.create({
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `JWT ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
      }
    });
  };

  getRestaurantInfo = async () => await this._withToken.get(`${this._apiConsole}/restaurant/short_info_all/`);

  getMyRestaurant = async () => await this._withToken.get(`${this._apiConsole}/restaurant/my_restaurant/`);

  createRestaurant = async (data) => await this._withToken.post(`${this._apiConsole}/restaurant/`, data);

  updateRestaurant = async (data, id) => await this._withToken.put(`${this._apiConsole}/restaurant/${id}/`, data);
}
