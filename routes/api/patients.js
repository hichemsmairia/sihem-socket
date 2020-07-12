//these are required
const router = require("express").Router();
const patientsController = require("../../controllers/patientsController");
const isAuthenticated = require('../isAuthenticated')

module.exports = function(passport){
  // Matches with "/api/doctors"
  router.route("/")
    .get(isAuthenticated, patientsController.findAll)
    .post(patientsController.create);

  // Matches with "/api/doctors/:id"
  router.route("/:id")
    .get(patientsController.findById)
    .put(patientsController.update)
    .delete(patientsController.remove);

  return router;
}

  


