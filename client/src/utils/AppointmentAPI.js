
import axios from 'axios';

export default {
  getAppointments() {
    return axios.get('/api/appointments');
  },
  saveAppointment(appointmentData) {
    return axios.post('/api/appointments', appointmentData);
  },
  getAppointment(id) {
    return axios.get(`/api/appointments/${id}`);
  },
  deleteAppointment(id) {
    return axios.delete(`/api/appointments/${id}`);
  },
  updateAppointment(id) {
    return axios.put(`/api/appointments/${id}`);
  },
};  
