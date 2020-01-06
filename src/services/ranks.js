import api from '../utils/api';

class RanksService {
  static getRanks() {
    return api
      .get('/ranks')
      .then(response => response)
      .catch(error => error);
  }
}

export default RanksService;
