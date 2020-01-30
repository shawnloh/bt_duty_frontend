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
      .post('/person/new', { name, rank, platoon })
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

  static addPersonnelStatus(personnelId, statusId, startDate, endDate) {
    return api
      .post(`/person/status/${personnelId}/add`, {
        statusId,
        startDate,
        endDate
      })
      .then(response => response)
      .catch(error => error);
  }

  static deletePersonnelStatus(personnelId, pStatusId) {
    return api
      .delete(`/person/status/${personnelId}/${pStatusId}`)
      .then(response => response)
      .catch(error => error);
  }

  static addPersonnelBlockout(personnelId, date) {
    return api
      .post(`/person/${personnelId}/blockout`, date)
      .then(response => response)
      .catch(error => error);
  }

  static deletePersonnelBlockout(personnelId, date) {
    return api
      .post(`/person/${personnelId}/blockout/delete`, { date })
      .then(response => response)
      .catch(error => error);
  }
}

export default PersonnelsService;
