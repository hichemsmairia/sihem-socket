const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const DoctorSchema = new Schema({
  firstname: {
    type: String,
    trim: true,
    required: 'First name is required',
  },
  lastname: {
    type: String,
    trim: true,
    required: 'Last name is required',
  },
  md: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    required: 'Specialty is Required',
  },
  // `date` must be of type Date. The default value is the current date
  userCreated: {
    type: Date,
    default: Date.now,
  },
});

// This creates our model from the above schema, using mongoose's model method
const Doctor = mongoose.model('Doctor', DoctorSchema);

// Export the Doctor model
module.exports = Doctor;
