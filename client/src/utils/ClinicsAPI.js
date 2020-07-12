import axios from 'axios';

export default {


  getClinics() {
    return axios.get('/api/clinics');
  },

  getClinic(id) {
    return axios.get(`/api/clinics/${id}`);
  },

  deleteClinic(id) {
    return axios.delete(`/api/clinics/${id}`);
  },

  saveClinic(clinicData) {
    return axios.post('/api/clinics/', clinicData);
  },

  updateClinic(id) {
    return axios.put(`/api/clinics/${id}`);
  },
};
