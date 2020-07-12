// Exporting an object containing all of our models

module.exports = {
  User: require('./User'),
  Md: require('./md'),
  Doctor: require('./doctor'),
  Patient: require('./patient'),
  HealthLog: require('./healthlog'),
  Appointment: require('./appointment'),
  SymptomJournal: require('./symptom'),
  Prescription: require('./prescription'),
  License: require('./license'),
};
