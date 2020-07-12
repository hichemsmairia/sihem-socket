//controller for Mds
const db = require('../models');

// Defining methods for the clinicsController
module.exports = {
  findAll: function (req, res) {
    db.Md
      .find(req.query)
      //.sort({ lastname: ? })
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the findall Md is not working in Mdscontroller.js error: ' + err));
    //res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Md
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the findbyid Md is not working in Mdscontroller.js error: ' + err));
    //res.status(422).json(err));
  },
  create: function (req, res) {
    db.Md
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err =>
        console.log('the create Md is not working in Mdscontroller.js error: ' + err));
    //res.status(422).json(err));
  },
  update: function (req, res) {
    db.Md
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the update Md is not working in Mdscontroller.js error: ' + err));
    //res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Md
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the remove Md is not working in Mdscontroller.js error: ' + err));
    //res.status(422).json(err));
  }
};
