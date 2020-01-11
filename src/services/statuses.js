import api from '../utils/api';

class Statuses {
  static getStatuses() {
    return api
      .get('/status')
      .then(response => response)
      .catch(error => error);
  }

  static createStatus(name) {
    return api
      .post('/status', { name })
      .then(response => response)
      .catch(error => error);
  }

  static deleteStatus(id) {
    return api
      .delete(`/status/${id}`)
      .then(response => response)
      .catch(error => error);
  }

  static updateStatus(id, name) {
    return api
      .put(`/status/${id}`, { name })
      .then(response => response)
      .catch(error => error);
  }
}

export default Statuses;
