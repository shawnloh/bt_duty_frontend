import api from '../utils/api';

class PersonnelsService {
  static getPersonnels() {
    return api
      .get('/person')
      .then(response => response)
      .catch(error => error);
  }

  static createPersonnel(name, rank, platoon) {
    return api
      .post('/person', { name, rank, platoon })
      .then(response => response)
      .catch(error => error);
  }

  static editPersonnel(id, updatedPersonnel) {
    return api
      .put(`/person/${id}`, updatedPersonnel)
      .then(response => response)
      .catch(error => error);
  }

  static deletePersonnel(id) {
    return api
      .delete(`/person/${id}`)
      .then(response => response)
      .catch(error => error);
  }
}

export default PersonnelsService;
