import api from '../utils/api';

class EventsService {
  static getEvents() {
    return api
      .get('/events')
      .then(response => response)
      .catch(error => error);
  }
}

export default EventsService;
