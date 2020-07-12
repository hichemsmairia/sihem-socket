//controller for Licenses
const db = require('../models');

// Defining methods for the LicensesController
module.exports = {
  findAll: function (req, res) {
    db.License
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the findall License is not working in Licensescontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  findById: function (req, res) {
    db.License
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the findbyid License is not working in Licensescontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  create: function (req, res) {
    db.License
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => 
        console.log('the create License is not working in Licensescontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  update: function (req, res) {
    db.License
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the update License is not working in Licensescontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  remove: function (req, res) {
    db.License
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the remove License is not working in Licensescontroller.js error: ' + err));
        //res.status(422).json(err));
  }
};
