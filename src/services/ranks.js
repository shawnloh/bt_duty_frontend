import api from '../utils/api';

class RanksService {
  static getRanks() {
    return api
      .get('/ranks')
      .then(response => response)
      .catch(error => error);
  }

  static createRank(name) {
    return api
      .post('/ranks', { name })
      .then(response => response)
      .catch(error => error);
  }

  static deleteRank(id) {
    return api
      .delete(`/ranks/${id}`)
      .then(response => response)
      .catch(error => error);
  }

  static updateRank(id, name) {
    return api
      .put(`/ranks/${id}`, { name })
      .then(response => response)
      .catch(error => error);
  }
}

export default RanksService;
