import axios from 'axios';

export default {

  getReservations() {
    return axios.get('/api/reservations');
  },

  getReservation(id) {
    return axios.get('/api/reservations/' + id);
  },

  deleteReservation(id) {
    return axios.delete('/api/reservations/' + id);
  },

  saveReservation(reservationData) {
    return axios.post('/api/reservations/', reservationData);
  },
  
  updateReservation(id) {
    return axios.put('/api/reservations/' + id);
  },



};



