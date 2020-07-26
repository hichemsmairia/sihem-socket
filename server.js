const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const User = require('./models/User')
const http = require("http");
const cors = require('cors');




// Connect to the Mongo DB
mongoose.connect("mongodb+srv://sihem:sihem@sihem-ellefi.va3cn.mongodb.net/<dbname>?retryWrites=true&w=majority" , {useNewUrlParser : true,
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

// starting server 

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




        

    

//for url encoding
app.use(express.urlencoded({
    extended : false
}));

app.use(bodyParser.json());

//Initializing Routes

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