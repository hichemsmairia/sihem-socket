//these are required
const router = require("express").Router();
const patientlocationController = require("../../controllers/patientlocationController");
const isAuthenticated = require('../isAuthenticated')

module.exports = function(passport){
  // Matches with "/api/doctors"
  router.route("/")
    .get(isAuthenticated, patientlocationController.findAll)
    .post(patientlocationController.create);

  // Matches with "/api/doctors/:id"
  router.route("/:id")
    .get(patientlocationController.findById)
    .put(patientlocationController.update)
    .delete(patientlocationController.remove);

  return router;
}

  

