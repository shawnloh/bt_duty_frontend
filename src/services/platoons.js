import api from '../utils/api';

class PlatoonService {
  static getPlatoons() {
    return api
      .get('/platoons')
      .then(response => response)
      .catch(error => error);
  }
}

export default PlatoonService;
