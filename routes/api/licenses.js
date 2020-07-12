//these are required
const router = require("express").Router();
const licensesController = require("../../controllers/licensesController");
const isAuthenticated = require('../isAuthenticated')

module.exports = function(passport){
  // Matches with "/api/doctors"
  router.route("/")
    .get(isAuthenticated, licensesController.findAll)
    .post(licensesController.create);

  // Matches with "/api/doctors/:id"
  router.route("/:id")
    .get(licensesController.findById)
    .put(licensesController.update)
    .delete(licensesController.remove);

  return router;
}

  

