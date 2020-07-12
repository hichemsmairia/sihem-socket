const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const LicenseSchema = new Schema({
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
  code: {
    type: String,
    trim: true,
    unique:true,
  },
  address : {
    type: String,
    trim: true,
    required: 'address is Required',
  },
  phone: {
    type: String,
    trim: true,
    required: 'Specialty is Required',
  },
  status:{
    type: String,
    default:"Non Confirme",
  },
  userCreated: {
    type: Date,
    default: Date.now,
  },
});

// This creates our model from the above schema, using mongoose's model method
const License = mongoose.model('License', LicenseSchema);

// Export the License model
module.exports = License;
