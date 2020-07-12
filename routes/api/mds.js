//these are required
const router = require("express").Router();
const mdsController = require("../../controllers/mdsController");
const isAuthenticated = require('../isAuthenticated')

module.exports = function(passport){
  // Matches with "/api/clinics"
  router.route("/")
    .get(isAuthenticated, mdsController.findAll)
    .post(mdsController.create);

  // Matches with "/api/clinics/:id"
  router.route("/:id")
    .get(isAuthenticated, mdsController.findById)
    .put(mdsController.update)
    .delete(mdsController.remove);

  return router;
}

// // Matches with "/api/clinics"
// router.route("/")
//   .get(clinicsController.findAll)
//   .post(clinicsController.create);

// // Matches with "/api/clinics/:id"
// router.route("/:id")
//   .get(clinicsController.findById)
//   .put(clinicsController.update)
//   .delete(clinicsController.remove);

// module.exports = router;

