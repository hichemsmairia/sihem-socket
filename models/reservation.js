const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const ReservationSchema = new Schema({

  fulladdress: {
    type: String,
    trim: true,
    required: 'First name is required',
  },
  longitude: {
    type: String,
    trim: true,
    required: 'Last name is required',
  },
  latitude: {
    type: String,
    trim: true,
    unique:true,
  },
  accepted:{
    type:Boolean,
    default:false,
  },

  userCreated: {
    type: Date,
    default: Date.now,
  },
});

// This creates our model from the above schema, using mongoose's model method
const Reservation = mongoose.model('Reservation', ReservationSchema);

// Export the Reservation model
module.exports = Reservation;
