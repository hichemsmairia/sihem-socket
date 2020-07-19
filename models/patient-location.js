const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create a schema
const ReservationSchema = new Schema({
  // You may need to add other fields like owner
  latitude: {
      type: String,
      required:true
    },
  longitude: {
    type:String,
    required:true
  }
  
});
const Reservation = mongoose.model('Reservation', ReservationSchema);
module.exports = Reservation;