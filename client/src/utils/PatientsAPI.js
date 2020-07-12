import axios from 'axios';

export default {

  getPatients() {
    return axios.get('/api/patients');
  },

  getPatient(id) {
    return axios.get('/api/patients/' + id);
  },

  deletePatient(id) {
    return axios.delete('/api/patients/' + id);
  },

  savePatient(patientData) {
    return axios.post('/api/patients/', patientData);
  },
  
  updatePatient(id) {
    return axios.put('/api/patients/' + id);
  },

};