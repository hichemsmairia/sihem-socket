//controller for Patients
const db = require('../models');

// Defining methods for the PatientsController
module.exports = {
  findAll: function (req, res) {
    db.Patient
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => alert('the findall Patient is not working in Patientscontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Patient
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the findbyid Patient is not working in Patientscontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  create: function (req, res) {
    db.Patient
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => 
        alert('the create Patient is not working in Patientscontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  update: function (req, res) {
    db.Patient
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the update Patient is not working in Patientscontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Patient
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the remove Patient is not working in Patientscontroller.js error: ' + err));
        //res.status(422).json(err));
  }
};
