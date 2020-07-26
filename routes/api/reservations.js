//these are required
const router = require("express").Router();
const reservationsController = require("../../controllers/reservationsController");
const isAuthenticated = require('../isAuthenticated')

module.exports = function(passport){
  // Matches with "/api/doctors"
  router.route("/")
    .get(isAuthenticated, reservationsController.findAll)
    .post(reservationsController.create);

  // Matches with "/api/doctors/:id"
  router.route("/:id")
    .get(reservationsController.findById)
    .put(reservationsController.update)
    .delete(reservationsController.remove);

  return router;
}

  

