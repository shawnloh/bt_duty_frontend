import api from '../utils/api';

class EventsService {
  static getEvents() {
    return api
      .get('/events')
      .then(response => response)
      .catch(error => error);
  }

  static deleteEvent(eventId, revert = false) {
    return api
      .post(`/events/delete/${eventId}`, { revert })
      .then(response => response)
      .catch(error => error);
  }
}

export default EventsService;
