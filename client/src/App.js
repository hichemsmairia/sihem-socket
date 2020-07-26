// Importing React since we are using React.
import React, { Component } from 'react';
// Importing React Router to add page routes.
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Importing material-ui theme.
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
// Importing css
import './App.css';
// Importing Footer component.
import Footer from './Components/Footer';
import PaymentForm from './containers/Payment/PaymentForm'

// Importing Home page component.
import Home from './containers/Home';
import PatientHome from "./containers/Home/PatientHome"
// Importing the My symptom journal page component.
import SymptomJournal from './containers/SymptomJournal';
// Importing the DoctorList page component.
import doctorSymptoms from './containers/SymptomJournal/doctorSymptoms';
import LicenseList from './containers/Licenses/LicenseList';
import ReservationList from './containers/Reservation/ReservationList';
import TaxiReservation from './containers/Reservation/taxi-reservation';



import DoctorList from './containers/DoctorsList';

import TaxiHome from './containers/Home/TaxiHome';


import PatientList from './containers/PatientsList';
// Importing the Appointments page component.
import Appointments from './containers/Appointments';
// Importing the My health log page component.
import PatientAppointments from './containers/Appointments/PatientAppointments'
import MedLog from './containers/MedLog';
// Importing the Prescriptions page
import Prescriptions from './containers/Prescriptions';
// Importing the Charts page
import doctorLog from './containers/MedLog/doctorLog'
// charts 
import Charts from './containers/Charts';
// Importing the Login page
import Login from './containers/Login';
// Importing the Signup page
import Signup from './containers/Signup';
// Importing the 404 page
import NoMatch from './containers/NoMatch';



// App theme customization.
const theme = createMuiTheme({
  palette: {
    type: 'light', // Switching the dark mode on is a single property value change.
  },
  typography: {
    // In Japanese the characters are usually larger.
    fontSize: 18,
  },
});

class App extends Component {

  state = {
    currentlyLoggedInUser: null
  }
  setUser = userId => {
    this.setState ({ currentlyLoggedInUser: userId})
  }

  render() {
    return [
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Switch>

// route for socket io localisation
            

              <Route exact path="/" render={props => <Login {...props} setUser={this.setUser}></Login>}/>
              <Route exact path="/signup" component={Signup} 
                loggedInUser = {this.state.currentlyLoggedInUser}/>
              <Route exact path="/home" component={Home} />
              <Route exact path="/patient-payment" component={PaymentForm}/>
             <Route exact path="/patient-reservation" component={ReservationList} />
              <Route exact path="/managetaxidriver" component={LicenseList} />
              
              <Route exact path="/taxihome" component={TaxiHome} />
        <Route exact path="/taxi-reservation" component={TaxiReservation} />
              <Route exact path="/doctorLog" component={doctorLog} />
              <Route exact path="/doctorSymptoms" component={doctorSymptoms} />
              <Route exact path="/patienthome" component={PatientHome} />
              <Route exact path="/symptoms" render={props => <SymptomJournal 
              {...props}></SymptomJournal>} loggedInUser={this.state.currentlyLoggedInUser} />
              <Route exact path="/doctors" component={DoctorList} />
              <Route exact path="/patients" component={PatientList} />
              <Route exact path="/appointments" component={Appointments} />
              <Route exact path="/patientappointments" component={PatientAppointments} />
              <Route exact path="/log" component={MedLog} />
              <Route exact path="/prescriptions" component={Prescriptions} />
              <Route exact path="/charts" component={Charts} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
        <Footer />
      </MuiThemeProvider>,
    ];
  }
}

// Exporting App component so that index.js can access it and render the components to the page.
export default App;
