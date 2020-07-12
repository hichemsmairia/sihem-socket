import axios from 'axios';

export default {

  getLicenses() {
    return axios.get('/api/licenses');
  },

  getLicense(id) {
    return axios.get('/api/licenses/' + id);
  },

  deleteLicense(id) {
    return axios.delete('/api/licenses/' + id);
  },

  saveLicense(licenseData) {
    return axios.post('/api/licenses/', licenseData);
  },
  
  updateLicense(id) {
    return axios.put('/api/licenses/' + id);
  },

};



