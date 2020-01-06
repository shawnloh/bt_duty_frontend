import api from '../utils/api';

class PersonnelsService {
  static getPersonnels() {
    return api
      .get('/person')
      .then(response => response)
      .catch(error => error);
  }
}

export default PersonnelsService;
