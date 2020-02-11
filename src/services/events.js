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

  static createEvent(data) {
    return api
      .post('/events/create', data)
      .then(response => response)
      .catch(error => error);
  }

  static generateName(data) {
    return api
      .post('/events/generate', data)
      .then(response => response)
      .catch(error => error);
  }

  static updateEvent(eventId, newPersonnels) {
    return api
      .post(`/events/${eventId}/changepersonnels`, {
        personnels: newPersonnels
      })
      .then(response => response)
      .catch(error => error);
  }
}

export default EventsService;
