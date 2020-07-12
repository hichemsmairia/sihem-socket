const router = require('express').Router();
const symptomRoutes = require('./symptoms');
const appointmentRoutes = require('./appointments');
const doctorRoutes = require('./doctors');
const patientRoutes = require('./patients');
const mdRoutes = require('./mds');
const logRoutes = require('./logs');
const prescriptionRoutes = require('./prescriptions');
const licenseRoutes = require ('./licenses')


module.exports = function(passport){
    // Symptoms 
    router.use('/symptoms', symptomRoutes());

        router.use('/licenses', licenseRoutes());

    // Appointments
    router.use('/appointments', appointmentRoutes());


    // Doctors
    router.use('/doctors', doctorRoutes());

    // Logs
    router.use('/logs', logRoutes());

    // patients 
    router.use('/patients', patientRoutes());
    // Clinics
    router.use('/mds', mdRoutes());

    // Prescriptions
    router.use('/prescriptions', prescriptionRoutes());

    return router;
}

