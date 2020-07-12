const mongoose = require('mongoose');


const Schema = mongoose.Schema;



const PatientSchema = new Schema({
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
  address : {
    type: String , 
    trim : true , 
    required : 'address is required' ,
  },
  phone: {
    type: String,
    trim: true,
    required: 'phone is Required',
  },
  // `date` must be of type Date. The default value is the current date
  userCreated: {
    type: Date,
    default: Date.now,
  },
});

// This creates our model from the above schema, using mongoose's model method
const Patient = mongoose.model('Patient', PatientSchema);

// Export the Doctor model
module.exports = Patient;
