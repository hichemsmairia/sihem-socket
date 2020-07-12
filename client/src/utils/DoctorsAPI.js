import axios from 'axios';

export default {

  getDoctors() {
    return axios.get('/api/doctors');
  },

  getDoctor(id) {
    return axios.get('/api/doctors/' + id);
  },

  deleteDoctor(id) {
    return axios.delete('/api/doctors/' + id);
  },

  saveDoctor(doctorData) {
    return axios.post('/api/doctors/', doctorData);
  },
  
  updateDoctor(id) {
    return axios.put('/api/doctors/' + id);
  },

};