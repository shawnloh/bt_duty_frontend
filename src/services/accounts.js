import api from '../utils/api';

class AccountService {
  static login(username, password) {
    return api
      .post('/accounts/login', { username, password })
      .then(response => response)
      .catch(error => error);
  }

  static checkAuthenticated() {
    return api
      .get('/accounts/isauthenticated')
      .then(response => response)
      .catch(error => error);
  }

  static logout() {
    return api
      .post('/accounts/logout')
      .then(response => response)
      .catch(error => error);
  }
}

export default AccountService;
