import axios from 'axios';

export default {


  getMds() {
    return axios.get('/api/mds');
  },

  getMd(id) {
    return axios.get(`/api/mds/${id}`);
  },

  deleteMd(id) {
    return axios.delete(`/api/mds/${id}`);
  },

  saveMd(mdData) {
    return axios.post('/api/mds/', mdData);
  },

  updateMd(id) {
    return axios.put(`/api/mds/${id}`);
  },
};
