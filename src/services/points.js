import api from '../utils/api';

class PointsService {
  static getPoints() {
    return api
      .get('/points')
      .then(response => response)
      .catch(error => error);
  }

  static createPoint(name) {
    return api
      .post('/points', { name })
      .then(response => response)
      .catch(error => error);
  }

  static deletePoint(id) {
    return api
      .delete(`/points/${id}`)
      .then(response => response)
      .catch(error => error);
  }

  static updatePoint(id, name) {
    return api
      .put(`/points/${id}`, { name })
      .then(response => response)
      .catch(error => error);
  }
}

export default PointsService;
