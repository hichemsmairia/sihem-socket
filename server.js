const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const User = require('./models/User')
const http = require("http");
const cors = require('cors');
const requestModel = require("./models/request");
const myMethods = require("./routes/ambulance");
const method = myMethods.method;
const otherMethod = myMethods.otherMethod;


// Connect to the Mongo DB
mongoose.connect("mongodb+srv://sihem:sihem1234@cluster0-kw40z.mongodb.net/test?retryWrites=true&w=majority" , {useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex : true})
.then(() => console.log('base de donnes connecté'))
.catch((err) => {
    console.log(err);
})


// Configure body parser for axios requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Require all models
const db = require('./models');

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

var server = app.listen(4000, () => {
    console.log(`le serveur socket est en marche`);
});
// app.use(routes);
app.use(cors());

// Route for retrieving all Users from the db
app.get('/user', function (req, res) {
  // Find all Users
  db.User.find({})
    .then(function (dbUser) {
      // If all Users are successfully found, send them back to the client
      res.json(dbUser);
    })
    .catch(function (err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

var io =require("socket.io")(server);

//Connecting all types of users
io.on('connection', (socket) => {
    console.log("un utilisateur utilise le socket.io");

//taxi drivers joinning seperate rooms
    socket.on('join' ,(data) => {  
      console.log("operation de join reussit")
    socket.join(data.displayName);
    console.log(`le taxist a rejoint le ${data.displayName}`)
})
    


//Listening for booking event fron patient
//@User Component

socket.on('request-for-help',(data) => {
alert("demande de reservation via socket")
console.log("demande de reservation en marche")
    const requestTime = new Date();
    const requestId = mongoose.Types.ObjectId();
    const location = {
        addressPatient : data.addressPatient,
        coordinates : [
            data.location.userLocation.longitude,
            data.location.userLocation.latitude
        ]
    }
    const patientId = data.patientId;
    const status = "waiting";

    const request = new requestModel({
        requestId,
        requestTime,
        location,
        patientId,
        status
    })

    //Saving request to the database
    request.save().then((request) => {
        console.log("request of help saved to database");
        console.log(location.coordinates[0]);
    console.log(location.coordinates[1]);
    }).catch((err) => {
        console.log(err);
    })

    //Fetching nearest ambulance
    console.log(location.coordinates[0]);
    console.log(location.coordinates[1]);
    const nearestAmbulance =  otherMethod(location.coordinates[0],location.coordinates[1],5000);
    nearestAmbulance.then((result) => {
        for(let i=0;i<result.length;i++)
        {
            //Emitting the event to the nearby ambulances
            //@App component
            console.log(result,"hello");
            io.to(result[i].displayName).emit("request",data);
            
        }
    }).catch((err) => {
        console.log(err);
    })
    });

    //Listening for the event from ambulance 
    //@App Component
    socket.on("request-accepted", (data) => {
        ambulanceDetails = data;
        //Emitting the event to the patient
        //@User Component
        io.emit("request-sent",ambulanceDetails);
    })
})


//for url encoding
app.use(express.urlencoded({
    extended : false
}));

app.use(bodyParser.json());

//Initializing Routes
app.use('/api/ambulance',method);

// Route for saving a new Health Log to the db and associating it with a User
app.post('/submit', function (req, res) {
  // Create a new Note in the db
  db.healthLog.create(req.body)
    .then(function (dbHealthLog) {
      // If a Health Log was created successfully,
      // find one User and push the new Log's _id to the User's `healthLog` array
      // { new: true } tells the query that we want it to return the updated User --
      // it returns the original by default
      // Since our mongoose query returns a promise, we can chain another
      // `.then` which receives the result of the query
      return db.User.findOneAndUpdate({}, { $push: { notes: dbHealthLog._id } }, { new: true });
    })
    .then(function (dbUser) {
      // If the User was updated successfully, send it back to the client
      res.json(dbUser);
    })
    .catch(function (err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Route to get all User's and populate them with their notes
app.get('/populateduser', function (req, res) {
  // Find all users
  db.User.find({})
    // Specify that we want to populate the retrieved users with any associated notes
    .populate('healthLog')
    .then(function (dbUser) {
      // If able to successfully find and associate all Users and Health Logs,
      // send them back to the client
      res.json(dbUser);
    })
    .catch(function (err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});



// If deployed, use the deployed database. Otherwise use the local reacthealthtracker database
var MONGODB_URI = "mongodb+srv://sihem:sihem@cluster0-sjb5s.mongodb.net/test?retryWrites=true&w=majority" ;

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;


// configurePassport
const configurePassport = require('./controllers/passport')

const passport = configurePassport(app, mongoose, User)

// Add routes, both API and view
app.use(routes(passport, User));

// Send every request to the React app
// Define any API routes before this runs
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(3001, () => {
  console.log(` health care Server now on port 3001`);
});