//controller for Licenses
const db = require('../models');

// Defining methods for the LicensesController
module.exports = {
  findAll: function (req, res) {
    db.PatientLocation
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the findall PatientLocation is not working in PatientLocationscontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  findById: function (req, res) {
    db.PatientLocation
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the findbyid PatientLocation is not working in PatientLocationscontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  create: function (req, res) {
    db.PatientLocation
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => 
        console.log('the create PatientLocation is not working in PatientLocationscontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  update: function (req, res) {
    db.PatientLocation
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the update PatientLocation is not working in PatientLocationscontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  remove: function (req, res) {
    db.PatientLocation
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the remove PatientLocation is not working in PatientLocationscontroller.js error: ' + err));
        //res.status(422).json(err));
  }
};
