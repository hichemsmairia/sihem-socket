import axios from 'axios';

export default {
  getAttachments() {
    return axios.get('/api/attachments');
  },
  saveAttachment(attachmentData) {
    return axios.post('/api/attachments', attachmentData);
  },
  getAppointment(id) {
    return axios.get('/api/attachments/' + id);
  },
  deleteAttachment(id) {
    return axios.delete('/api/attachments/' + id);
  },
  updateAttachment(id) {
    return axios.put('/api/attachments/' + id);
  },
};
