//controller for Licenses
const db = require('../models');

// Defining methods for the ReservationController
module.exports = {
  findAll: function (req, res) {
    db.Reservation
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the findall reservations is not working in Licensescontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Reservation
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the findbyid reservartion is not working in Licensescontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  create: function (req, res) {
    db.Reservation
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => 
        console.log('the create reservation is not working in Licensescontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  update: function (req, res) {   
    db.Reservation
      .findOneAndUpdate({ _id: req.params.id }, { $set: { "accepted" : true }})
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the update reservation is not working in Licensescontroller.js error: ' + err));
        //res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Reservation
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the remove License is not working in Licensescontroller.js error: ' + err));
        //res.status(422).json(err));
  }
};
